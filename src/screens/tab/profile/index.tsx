import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  query,
  setDoc,
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
import { uuidv4 } from "@firebase/util";

import {
  ContainerHead,
  BackGroundImage,
  FeatherIcons,
  MainContaienr,
  SectionLeyoutUser,
  EditBackGroundButton,
  BackGroundIconView,
  EditAvatarButton,
  AvatarImage,
  AvatarIconView,
  SectionUserInfo,
  UserInfo,
  SectionEditNameUser,
  UserTextInputName,
  ButtonSettings,
  TextButtons,
  NameUser,
  EmailUser,
  EditUser,
  SectionEditDescricaoUser,
  UserTextInputDescription,
  UserDescricao,
} from "./style";
import { getAuth, updateProfile } from "firebase/auth";
import {
  TouchableOpacity,
  Alert,
  TextInput,
  View,
  Button,
  Text,
} from "react-native";

const Profile = () => {
  const auth = getAuth();
  const { user } = useAuthentication();

  const [userInfo, setUserInfo] = useState<DocumentData[]>([]);
  const [imageSelect, setImageSelect] = useState<IFiles>();

  const [BackGround, setBackGround] = useState(false);
  const [onFocusBackGround, setOnfocusBackGround] = useState(false);

  const [ProfilePick, setProfilePick] = useState(false);
  const [onFocusProfile, setOnfocusProfile] = useState(false);

  const [loading, setLoading] = useState(false);

  const [newUserInfo, setNewUserInfo] = useState({
    nome: "",
    descricao: "",
  });

  const [editUserInfo, setEditUserInfo] = useState({
    nome: false,
    descricao: false,
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

  const pickImage = async () => {
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      videoQuality: 1,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (result.canceled) {
      return;
    } else {
      setImageSelect(result.assets[0]);
      setLoading(true);
    }
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
    setBackGround(false);
    if (imageSelect) {
      const uploadedImage = await uploadImage(imageSelect);
      deleteObject(
        ref(storage, `images/${user?.email}/${userInfo[0].background.id}`)
      )
        .then()
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

  const ProfileUpdate = async () => {
    setLoading(false);
    setProfilePick(false);
    if (imageSelect && auth.currentUser != null) {
      const uploadedImage = await uploadImage(imageSelect);
      deleteObject(
        ref(storage, `images/${user?.email}/${userInfo[0].background.id}`)
      )
        .then()
        .catch((err) => console.log(err));
      updateProfile(auth.currentUser, {
        photoURL: uploadedImage.url,
      })
        .then(() => console.log("Concluido"))
        .catch((err) => console.log(err));
    }
  };

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
    if (loading && BackGround) {
      BackGroundUpdate();
    }
    if (loading && ProfilePick) {
      ProfileUpdate();
    }
  }, [loading]);

  useEffect(() => {
    if (user?.uid != null) {
      getUserInfo(user.uid);
    }
  }, [getUserInfo]);

  return (
    <MainContaienr>
      <ContainerHead>
        <SectionLeyoutUser>
          <EditBackGroundButton
            onPress={() => {
              pickImage();
              setBackGround(true);
            }}
            onPressIn={() => setOnfocusBackGround(true)}
            onPressOut={() => setOnfocusBackGround(false)}
          >
            {onFocusBackGround ? (
              <BackGroundIconView>
                <FeatherIcons size={65} name={"edit"} />
              </BackGroundIconView>
            ) : null}
            <BackGroundImage
              source={{
                uri: String(
                  userInfo[0]?.background
                    ? userInfo[0]?.background.url
                    : "https://pbs.twimg.com/media/FlmgV-4XwAMDm6j.jpg"
                ),
              }}
              style={{ resizeMode: "stretch" }}
            />
          </EditBackGroundButton>
          <EditAvatarButton
            onPress={() => {
              pickImage();
              setProfilePick(true);
            }}
            onPressIn={() => setOnfocusProfile(true)}
            onPressOut={() => setOnfocusProfile(false)}
          >
            {onFocusProfile ? (
              <AvatarIconView>
                <FeatherIcons size={35} name={"edit"} />
              </AvatarIconView>
            ) : null}
            <AvatarImage
              source={{
                uri: String(
                  user?.photoURL
                    ? user?.photoURL
                    : "https://static-cdn.jtvnw.net/jtv_user_pictures/50a9a0bd-7f1a-4879-bd18-7f1d76db46aa-profile_image-300x300.png"
                ),
              }}
            />
          </EditAvatarButton>
        </SectionLeyoutUser>
        <SectionUserInfo>
          <UserInfo>
            {editUserInfo.nome ? (
              <SectionEditNameUser>
                <UserTextInputName
                  maxLength={150}
                  onChangeText={(text) =>
                    setNewUserInfo({ ...newUserInfo, nome: text })
                  }
                  placeholder="Digite o novo nome"
                />
                <ButtonSettings
                  style={{
                    backgroundColor: "white",
                  }}
                  onPress={editarUsuario}
                >
                  <TextButtons>Atualizar</TextButtons>
                </ButtonSettings>
                <ButtonSettings
                  style={{
                    backgroundColor: "red",
                  }}
                  onPress={() =>
                    setEditUserInfo({ nome: false, descricao: false })
                  }
                >
                  <TextButtons style={{ color: "white" }}>Cancelar</TextButtons>
                </ButtonSettings>
              </SectionEditNameUser>
            ) : user?.displayName ? (
              <NameUser>{user?.displayName} </NameUser>
            ) : (
              <EmailUser>{user?.email} </EmailUser>
            )}
            <EditUser onPress={updateUser}>
              <FeatherIcons size={25} name={"edit"} />
            </EditUser>
          </UserInfo>

          {editUserInfo.descricao ? (
            <SectionEditDescricaoUser>
              <UserTextInputDescription
                numberOfLines={5}
                multiline={true}
                textAlign={"left"}
                style={{ textAlignVertical: "top" }}
                maxLength={250}
                onChangeText={(text) =>
                  setNewUserInfo({ ...newUserInfo, descricao: text })
                }
                placeholder="Digite o novo nome"
              />
              <ButtonSettings
                style={{
                  backgroundColor: "white",
                }}
                onPress={editarUsuario}
              >
                <TextButtons>Atualizar</TextButtons>
              </ButtonSettings>
              <ButtonSettings
                style={{
                  backgroundColor: "red",
                }}
                onPress={() =>
                  setEditUserInfo({ nome: false, descricao: false })
                }
              >
                <TextButtons style={{ color: "white" }}>Cancelar</TextButtons>
              </ButtonSettings>
            </SectionEditDescricaoUser>
          ) : userInfo[0] ? (
            <UserDescricao>{userInfo[0]?.descricao}</UserDescricao>
          ) : (
            <UserDescricao>
              ¯\_(ツ)_/¯ Personalize seu perfil adicionando uma descrição
            </UserDescricao>
          )}
        </SectionUserInfo>
      </ContainerHead>
    </MainContaienr>
  );
};

export { Profile };
