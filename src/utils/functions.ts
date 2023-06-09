import {DatabaseReference, onValue, push, set} from "firebase/database";
import {IFiles, ISendFiles} from "../interfaces/PostInterface";
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {ref as refRT, query as queryRT} from "firebase/database";
import {database, db, storage} from "../configs/firebase";
import {uuidv4} from "@firebase/util";
import {useEffect, useState} from "react";
import {Usuario} from "../interfaces/UsuarioInterface";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {User} from "firebase/auth";

export function getFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + " B";
  } else if (fileSizeInBytes < 1024 * 1024) {
    const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
    return fileSizeInKB + " KB";
  } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
    return fileSizeInMB + " MB";
  } else {
    const fileSizeInGB = (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
    return fileSizeInGB + " GB";
  }
}

export const sendPostGrupos = async (
  grupo_id: string,
  user: {nome: string; email: string},
  descricao: string | null,
  images: ISendFiles[],
  arquivos: ISendFiles | undefined,
  user_id: string
): Promise<void> => {
  const uploadedImages = await ImageArrayUpload(user.email, images);
  const refDataBase = refRT(database, `grupos/${grupo_id}/posts`);
  try {
    if (arquivos == undefined) {
      const postData = {
        user_id: user_id,
        data: Math.floor(Date.now() / 1000),
        user: {
          nome: user.nome,
          email: user.email,
        },
        body: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
      };
      await push(refDataBase, postData);
    } else {
      const uploadFiles = await FliesUpload(user.email, arquivos);
      const postData = {
        data: Math.floor(Date.now() / 1000),
        user_id: user_id,
        user: {
          nome: user.nome,
          email: user.email,
        },
        body: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
        arquivos: {
          id: uploadFiles.id,
          url: uploadFiles.url,
          type: uploadFiles.type,
          size: uploadFiles.size,
        },
      };
      await push(refDataBase, postData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendPost = async (
  ref: DatabaseReference,
  user: {nome: string; email: string},
  descricao: string | null,
  images: ISendFiles[],
  arquivos: ISendFiles | undefined,
  user_id: string
): Promise<void> => {
  try {
    const uploadedImages = await ImageArrayUpload(user.email, images);
    if (arquivos == undefined) {
      const postData = {
        user_id: user_id,
        data: Math.floor(Date.now() / 1000),
        user: {
          nome: user.nome,
          email: user.email,
        },
        body: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
      };
      await set(ref, postData);
    } else {
      const uploadFiles = await FliesUpload(user.email, arquivos);
      const postData = {
        data: Math.floor(Date.now() / 1000),
        user_id: user_id,
        user: {
          nome: user.nome,
          email: user.email,
        },
        body: descricao,
        images: uploadedImages?.map((img) => ({
          id: img.id,
          url: img.url,
        })),
        arquivos: {
          id: uploadFiles.id,
          url: uploadFiles.url,
          type: uploadFiles.type,
          size: uploadFiles.size,
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
    size: file.size,
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

export const FindUserChats = (idChat: string[], idUserLogged: string) => {
  const valores: any[] = [];
  for (let index in idChat) {
    let refRealTime = refRT(database, `chat/${idChat[index]}`);
    onValue(refRealTime, (onSnapshot) => {
      if (onSnapshot.exists()) {
        if (onSnapshot.child("users").val()) {
          valores.push({
            id: idChat[index],
            user:
              idUserLogged == onSnapshot.child("users").val().persoOne
                ? onSnapshot.child("users").val().persoTwo
                : onSnapshot.child("users").val().persoOne,
          });
        }
      }
    });
  }
  return valores;
};

export async function InsertChatUser(
  userOne: string,
  userTwo: string,
  idChat: string
) {
  const getIdReference = collection(db, "users");
  const queryOne = query(getIdReference, where("id", "==", userOne));
  const queryTwo = query(getIdReference, where("id", "==", userTwo));
  const insertLoggedUser = await getDocs(queryOne);
  const insertFriendRequest = await getDocs(queryTwo);
  if (insertLoggedUser) {
    const refCloudFireStore = doc(db, "users", insertLoggedUser.docs[0].id);
    await updateDoc(refCloudFireStore, {
      chats: arrayUnion(idChat),
    });
  }
  if (insertLoggedUser) {
    const refCloudFireStore = doc(db, "users", insertFriendRequest.docs[0].id);
    await updateDoc(refCloudFireStore, {
      chats: arrayUnion(idChat),
    });
  }
}
