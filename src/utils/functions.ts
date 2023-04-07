import { DatabaseReference, set } from "firebase/database";
import { IFiles, ISendFiles } from "../interfaces/PostInterface";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../configs/firebase";
import { uuidv4 } from "@firebase/util";
import { useEffect, useState } from "react";
import { Usuario } from "../interfaces/UsuarioInterface";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const sendPost = async (
  ref: DatabaseReference,
  user: string,
  title: string,
  descricao: string | null,
  images: ISendFiles[],
  arquivos: ISendFiles | undefined
): Promise<void> => {
  try {
    const uploadedImages = await ImageArrayUpload(user, images);
    if (arquivos == undefined) {
      const postData = {
        data: Math.floor(Date.now() / 1000),
        user: user,
        title: title,
        description: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
      };
      await set(ref, postData);
    } else {
      const uploadFiles = await FliesUpload(user, arquivos);
      const postData = {
        data: Math.floor(Date.now() / 1000),
        user: user,
        title: title,
        description: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
        arquivos: {
          id: uploadFiles.id,
          url: uploadFiles.url,
          type: uploadFiles.type,
        },
      };
      await set(ref, postData);
    }
  } catch (error) {
    console.error("Erro ao enviar o post:", error);
    throw error;
  }
};

export const FliesUpload = async (email: string, file: ISendFiles) => {
  const id = uuidv4();
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const fileUpload = ref(storage, `arquivos/${email}/${id}`);
  const uploadStatus = uploadBytesResumable(fileUpload, blob);
  const snapshot = await uploadStatus;
  return {
    id,
    url: await getDownloadURL(snapshot.ref),
    type: file.mimeType,
  };
};

export const ImageArrayUpload = async (email: string, images: ISendFiles[]) => {
  const uploadPromise = images.map(async (image: any) => {
    const id = uuidv4();
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `images/${email}/${id}`);
    const uploadStatus = uploadBytesResumable(imageRef, blob);
    const snapshot = await uploadStatus;
    return {
      id,
      url: await getDownloadURL(snapshot.ref),
    };
  });
  return Promise.all(uploadPromise);
};

export const UploadSingleImage = async (email: string, image: ISendFiles) => {
  const id = uuidv4();
  const response = await fetch(image.uri);
  const blob = await response.blob();
  const imageRef = ref(storage, `images/${email}/${id}`);
  const uploadStatus = uploadBytesResumable(imageRef, blob);
  const snapshot = await uploadStatus;
  return {
    id,
    url: await getDownloadURL(snapshot.ref),
  };
};
export const useListFriends = (uid: string) => {
  const [listFriends, setListFriends] = useState<Usuario[]>([]);

  useEffect(() => {
    const collect = collection(db, "users");
    const queryUser = query(collect, where("id", "==", uid));
    const unsubscribe = onSnapshot(queryUser, (querySnapshot) => {
      const dados: any = querySnapshot.docs.map((doc) => doc.data());
      setListFriends(dados);
    });

    return unsubscribe;
  }, [uid]);

  return listFriends;
};
