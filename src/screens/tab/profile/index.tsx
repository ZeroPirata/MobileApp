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
import React, { useCallback, useEffect, useState } from "react";
import { database, db, storage } from "../../../configs/firebase";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { IFiles, IPost, ISendFiles } from "../../../interfaces/PostInterface";
import { uuidv4 } from "@firebase/util";
import {
  ref as RealTimeReference,
  query as RealTimeQuery,
  orderByChild,
  equalTo,
  onValue,
  limitToLast,
} from "firebase/database";
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
  PostUserView,
  SettingsButtonDescription,
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
import { PostView } from "../../../components/Posts";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import themes from "../../../styles/themes";
import { UploadSingleImage } from "../../../utils/functions";

const Profile = () => {
  const auth = getAuth();
  const { user } = useAuthentication();

  const [userInfo, setUserInfo] = useState<DocumentData[]>([]);
  const [imageSelect, setImageSelect] = useState<ISendFiles>();
  const [postUser, setPostUser] = useState<IPost[]>([]);

  const [BackGround, setBackGround] = useState(false);
  const [onFocusBackGround, setOnfocusBackGround] = useState(false);

  const [ProfilePick, setProfilePick] = useState(false);
  const [onFocusProfile, setOnfocusProfile] = useState(false);
  const [loadingPostUser, setLoadingPostUser] = useState(true);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [newUserInfo, setNewUserInfo] = useState({
    nome: "",
    descricao: "",
  });

  const [editUserInfo, setEditUserInfo] = useState({
    nome: false,
    descricao: false,
  });

  const getUserPost = async () => {
    if (user?.email != null) {
      const refPostUser = RealTimeReference(database, "posts/");
      const queryRealTime = RealTimeQuery(
        refPostUser,
        orderByChild("user"),
        equalTo(user.email),
        limitToLast(100)
      );
      onValue(queryRealTime, (snapShot) => {
        if (snapShot.exists()) {
          const data = snapShot.val();
          const PostList = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => b.data - a.data);
          setPostUser(PostList);
        }
      });
    }
    setLoadingPostUser(false);
  };

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

  const BackGroundUpdate = async () => {
    setLoading(false);
    setBackGround(false);
    if (imageSelect) {
      const uploadedImage = await UploadSingleImage(
        String(user?.email),
        imageSelect
      );
      if (!userInfo[0].background) {
        deleteObject(
          ref(storage, `images/${user?.email}/${userInfo[0].background.id}`)
        )
          .then()
          .catch((err) => console.log(err));
      }
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
      const uploadedImage = await UploadSingleImage(
        String(user?.email),
        imageSelect
      );
      updateProfile(auth.currentUser, {
        photoURL: uploadedImage.url,
      }).catch((err) => console.log(err));
    }
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
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
        await setDoc(refDatabase, updatedData)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
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

  useEffect(() => {
    getUserPost();
  }, [user?.uid]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <MainContaienr>
      <ContainerHead>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                    <TextButtons style={{ color: "white" }}>
                      Cancelar
                    </TextButtons>
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
                <SettingsButtonDescription>
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
                    <TextButtons style={{ color: "white" }}>
                      Cancelar
                    </TextButtons>
                  </ButtonSettings>
                </SettingsButtonDescription>
              </SectionEditDescricaoUser>
            ) : userInfo[0] ? (
              <UserDescricao>{userInfo[0]?.descricao}</UserDescricao>
            ) : (
              <UserDescricao>
                ¯\_(ツ)_/¯ Personalize seu perfil adicionando uma descrição
              </UserDescricao>
            )}
          </SectionUserInfo>
        </ScrollView>
      </ContainerHead>
      <ScrollView
        style={{
          backgroundColor: themes.COLORS.COLORS_CONSTRAT.ROSA_CLARO,
          height: "100%",
        }}
        horizontal={false}
      >
        <PostUserView
          style={{
            height: "100%",
            flexGrow: 1,
          }}
        >
          {loadingPostUser ? (
            <View style={{ margin: 10 }}>
              <Text>Carregando........................</Text>
            </View>
          ) : (
            postUser.map((data, index) => (
              <PostView
                key={index}
                data={data.data}
                id={data.id}
                title={data.title}
                images={data.images}
                user={data.user}
                description={data.description}
              />
            ))
          )}
        </PostUserView>
      </ScrollView>
    </MainContaienr>
  );
};

export { Profile };
