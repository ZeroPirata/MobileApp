import { Feather } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { db, storage } from "../../../configs/firebase";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { IFiles } from "../../../interfaces/PostInterface";
import { reciveUserAttributes } from "../../../utils/querys";
import { uuidv4 } from "@firebase/util";

import {
  Container,
  ContainerHead,
  BackGroundImageView,
  ProfilePicture,
  ProfilePictureView,
  BackGroundImage,
  PrimaryInfo,
  SecondaryInfo,
  AboutInfo,
  EditButton,
  FeatherIcons,
  IconView,
  FeatherIconsEditName,
  NameTag,
} from "./style";
import { getAuth, updateProfile } from "firebase/auth";
import { TouchableOpacity, Alert, TextInput, View, Button } from "react-native";

const Profile = () => {
  const auth = getAuth();
  const { user } = useAuthentication();
  const [userInfo, setUserInfo] = useState<DocumentData[]>([]);

  const [newUserInfo, setNewUserInfo] = useState({
    nome: "",
    descricao: "",
  });

  const getUserInfo = useCallback(
    (uid: string) => {
      const collect = collection(db, "users");
      const queryUser = query(collect, where("id", "==", uid));
      const unsubscribe = onSnapshot(queryUser, (querySnapshot) => {
        const dados: any = [];
        querySnapshot.docs.map((doc) => {
          dados.push(doc.data());
        });
        setUserInfo(dados);
      });
      return unsubscribe;
    },
    [user?.uid]
  );

  useEffect(() => {
    if (user?.uid != null) {
      getUserInfo(user.uid);
    }
  }, [user?.uid]);

  const [imageSelect, setImageSelect] = useState<IFiles>();
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      videoQuality: 1,
      allowsMultipleSelection: false,
      quality: 1,
    });
    setImageSelect(result.assets[0]);
    setLoading(true);
  };

  const uploadImage = async (image: IFiles) => {
    const id = uuidv4();
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `images/${user?.email}/${id}`);
    const uploadStatus = uploadBytesResumable(imageRef, blob);
    const snapshot = await uploadStatus;
    return {
      id,
      url: await getDownloadURL(snapshot.ref),
    };
  };

  const BackGroundUpdate = async () => {
    setLoading(false);
    if (imageSelect) {
      const uploadedImage = await uploadImage(imageSelect);
      deleteObject(
        ref(storage, `images/${user?.email}/${userInfo[0].background.id}`)
      )
        .then(() => console.log("Never diference in this microfone"))
        .catch((err) => console.log(err));
      const refDatabase = doc(collection(db, "users"), user?.uid);
      const documentSnapshot = await getDoc(refDatabase);
      const updatedData = {
        ...documentSnapshot.data(),
        id: user?.uid,
        background: {
          url: uploadedImage.url,
          id: uploadedImage.id,
        },
      };
      try {
        await setDoc(refDatabase, updatedData);
        setImageSelect(undefined);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [editUserInfo, setEditUserInfo] = useState({
    nome: false,
    descricao: false,
  });
  const updateUser = () => {
    if (auth.currentUser != null) {
      Alert.alert(
        "Editar Informações",
        "Selecione abaixo o que você deseja editar do perfil",
        [
          { text: "Cencel", style: "cancel" },
          {
            text: "Nome",
            onPress: () => setEditUserInfo({ nome: true, descricao: false }),
          },
          {
            text: "Descrição",
            onPress: () => setEditUserInfo({ nome: false, descricao: true }),
          },
        ]
      );
    }
  };
  const editarUsuario = async () => {
    if (editUserInfo.nome && auth.currentUser != null) {
      updateProfile(auth.currentUser, {
        displayName: newUserInfo.nome,
      }).then(() => {
        Alert.alert(
          "Concluido",
          `Parabens, agora você se chama ${user?.displayName}`,
          [{ text: "Ok", style: "destructive" }]
        );
      });
    }
    if (editUserInfo.descricao && auth.currentUser != null) {
      const refDatabase = doc(collection(db, "users"), user?.uid);
      const documentSnapshot = await getDoc(refDatabase);
      const updatedData = {
        ...documentSnapshot.data(),
        id: user?.uid,
        descricao: newUserInfo.descricao,
      };
      try {
        await setDoc(refDatabase, updatedData);
        Alert.alert(
          "Concluido",
          `Parabens, agora você tem uma descrição INSANA (👉ﾟヮﾟ)👉`,
          [{ text: "Ok", style: "destructive" }]
        );
      } catch (error) {
        console.log(error);
      }
    }
    setEditUserInfo({ nome: false, descricao: false });
  };

  useEffect(() => {
    if (loading) {
      BackGroundUpdate();
    }
  }, [loading]);

  const [onFocus, setOnfocus] = useState(false);
  return (
    <Container>
      <ContainerHead>
        <ProfilePictureView>
          <EditButton
            onPress={pickImage}
            onPressIn={() => setOnfocus(true)}
            onPressOut={() => setOnfocus(false)}
          >
            {onFocus ? (
              <IconView>
                <FeatherIcons name={"edit"} />
              </IconView>
            ) : null}
            <BackGroundImage
              source={{
                uri: String(
                  userInfo[0]?.background
                    ? userInfo[0]?.background.url
                    : "https://pbs.twimg.com/media/FlmgV-4XwAMDm6j.jpg  "
                ),
              }}
              style={{ resizeMode: "cover" }}
            />
          </EditButton>
          <ProfilePicture
            source={{
              uri: String(
                user?.photoURL
                  ? user?.photoURL
                  : "https://static-cdn.jtvnw.net/jtv_user_pictures/50a9a0bd-7f1a-4879-bd18-7f1d76db46aa-profile_image-300x300.png"
              ),
            }}
          />
        </ProfilePictureView>
        <AboutInfo>
          <NameTag>
            {editUserInfo.nome ? (
              <View>
                <TextInput
                  onChangeText={(text) =>
                    setNewUserInfo({ ...newUserInfo, nome: text })
                  }
                  placeholder="Digite o novo nome"
                />
                <Button title="Atualizar" onPress={editarUsuario} />
                <Button
                  title="Cancelar"
                  onPress={() =>
                    setEditUserInfo({ nome: false, descricao: false })
                  }
                />
              </View>
            ) : user?.displayName ? (
              <PrimaryInfo>{user?.displayName} </PrimaryInfo>
            ) : (
              <PrimaryInfo>{user?.email} </PrimaryInfo>
            )}
            <TouchableOpacity onPress={updateUser}>
              <FeatherIconsEditName name={"edit"} />
            </TouchableOpacity>
          </NameTag>

          {editUserInfo.descricao ? (
            <View>
              <TextInput
                maxLength={250}
                onChangeText={(text) =>
                  setNewUserInfo({ ...newUserInfo, descricao: text })
                }
                placeholder="Digite o novo nome"
              />
              <Button title="Atualizar" onPress={editarUsuario} />
              <Button
                title="Cancelar"
                onPress={() =>
                  setEditUserInfo({ nome: false, descricao: false })
                }
              />
            </View>
          ) : userInfo[0] ? (
            <SecondaryInfo>{userInfo[0]?.descricao}</SecondaryInfo>
          ) : (
            <SecondaryInfo>
              ¯\_(ツ)_/¯ Personalize seu perfil adicionando uma descrição
            </SecondaryInfo>
          )}
        </AboutInfo>
      </ContainerHead>
    </Container>
  );
};

export { Profile };
