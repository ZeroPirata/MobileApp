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
import { Feather, MaterialIcons } from '@expo/vector-icons';

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
import { ButtonEditText, ButtonEditView, ButtonsView, CancelButton, Container, ContainerHeaderProfile, EditUserDescricao, EditUserDescricaoView, EditUserName, EditUserNameView, HeaderBackGround, HeaderBackGroundView, HeaderImagesView, HeaderProfile, HeaderProfileView, HeaderUserArroba, HeaderUserDescription, HeaderUserInfoView, HeaderUserName, SaveButton } from "./style";
import { getAuth, updateProfile } from "firebase/auth";
import {
  TouchableOpacity,
  Alert,
  TextInput,
  View,
  Button,
  Text,
  ScrollView
} from "react-native";
import { PostView } from "../../../components/Posts";
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
    arroba: ""
  });

  const [editUserInfo, setEditUserInfo] = useState({
    nome: false,
    descricao: false,
    arroba: false
  });

  const getUserPost = async () => {
    if (user?.email != null) {
      const refPostUser = RealTimeReference(database, "posts/");
      const queryRealTime = RealTimeQuery(
        refPostUser,
        orderByChild("user_id"),
        equalTo(user.uid),
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
        await setDoc(refDatabase, updatedData, { merge: true });
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
      })
        .then(async () => {
          const refDatabase = doc(collection(db, "users"), user?.uid);
          await setDoc(
            refDatabase,
            { avatar: uploadedImage.url },
            { merge: true }
          );
        })
        .catch((err) => console.log(err));
    }
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const updateUser = () => {

  };
  const editarUsuario = async () => {
    const getIdReference = collection(db, "users");
    const queryOne = query(getIdReference, where("id", "==", user?.uid));
    const insertLoggedUser = await getDocs(queryOne);
    if (insertLoggedUser) {
      const refCloudFireStore = doc(db, "users", insertLoggedUser.docs[0].id);
      if (editUserInfo.nome && auth.currentUser != null) {
        updateProfile(auth.currentUser, {
          displayName: newUserInfo.nome,
        }).then(() => {
          updateDoc(refCloudFireStore, {
            name: newUserInfo.nome,
          });
          Alert.alert(
            "Concluido",
            `Parabens, agora você se chama ${user?.displayName}`,
            [{ text: "Ok", style: "destructive" }]
          );
        });
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
      }
      if (editUserInfo.descricao && auth.currentUser != null) {
        const refDatabase = doc(collection(db, "users"));
        const documentSnapshot = await getDoc(refDatabase);
        const updatedData = {
          ...documentSnapshot.data(),
          id: user?.uid,
          descricao: newUserInfo.descricao,
        };
        try {
          await setDoc(refCloudFireStore, updatedData, { merge: true })
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
      if (editUserInfo.arroba && auth.currentUser != null) {
        const refDatabase = doc(collection(db, "users"));
        const documentSnapshot = await getDoc(refDatabase);
        const updatedData = {
          ...documentSnapshot.data(),
          id: user?.uid,
          arroba: newUserInfo.arroba,
        };
        try {
          await setDoc(refCloudFireStore, updatedData, { merge: true })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
          Alert.alert(
            "Concluido", '',
            [{ text: "Ok", style: "destructive" }]
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    setEditUserInfo({ nome: false, descricao: false, arroba: false });
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
    <Container>
      <ScrollView style={{ height: "100%" }}>

        <ContainerHeaderProfile>
          <HeaderImagesView>
            <HeaderBackGroundView onPress={() => {
              pickImage();
              setBackGround(true);
            }}>
              <HeaderBackGround source={{
                uri: String(
                  userInfo[0]?.background
                    ? userInfo[0]?.background.url
                    : "https://pbs.twimg.com/media/FlmgV-4XwAMDm6j.jpg"
                )
              }} />
            </HeaderBackGroundView>
            <HeaderProfileView onPress={() => {
              pickImage();
              setProfilePick(true);
            }}>
              <HeaderProfile source={{ uri: String(user?.photoURL) }} />
            </HeaderProfileView>
          </HeaderImagesView>
          <HeaderUserInfoView>
            {editUserInfo.nome ?
              (<EditUserNameView>
                <EditUserName
                  onChangeText={(text) => setNewUserInfo({ ...newUserInfo, nome: text })}
                  value={newUserInfo?.nome}
                  placeholder="Change your name"
                  placeholderTextColor={themes.COLORS.GRAY4}
                  textAlign={"left"}
                />
                <ButtonsView>
                  <CancelButton onPress={() => { setEditUserInfo({ ...editUserInfo, nome: false }), setNewUserInfo({ ...newUserInfo, nome: "" }) }}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </CancelButton>
                  <SaveButton onPress={editarUsuario}>
                    <MaterialIcons name="verified" size={24} color="green" />
                  </SaveButton>
                </ButtonsView>
              </EditUserNameView>) :
              (<HeaderUserName>{user?.displayName}
                <ButtonEditView>
                  <ButtonEditText onPress={() => setEditUserInfo({ ...editUserInfo, nome: true })}>
                    <Feather name="edit" size={15} color="white" />
                  </ButtonEditText>
                </ButtonEditView>
              </HeaderUserName>)}
            {editUserInfo.arroba ?
              (<EditUserNameView>
                <EditUserName
                  onChangeText={(text) => setNewUserInfo({ ...newUserInfo, arroba: text })}
                  value={newUserInfo?.arroba}
                  placeholder="Create your new @"
                  placeholderTextColor={themes.COLORS.GRAY4}
                  textAlign={"left"} />
                <ButtonsView>
                  <CancelButton onPress={() => { setEditUserInfo({ ...editUserInfo, arroba: false }), setNewUserInfo({ ...newUserInfo, arroba: "" }) }}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </CancelButton>
                  <SaveButton onPress={editarUsuario}>
                    <MaterialIcons name="verified" size={24} color="green" />
                  </SaveButton>
                </ButtonsView>
              </EditUserNameView>) :
              (<HeaderUserArroba>@{userInfo[0]?.arroba != undefined ? userInfo[0]?.arroba : "Não possui ainda"}
                <ButtonEditView>
                  <ButtonEditText onPress={() => { setEditUserInfo({ ...editUserInfo, arroba: true }) }}>
                    <Feather name="edit" size={15} color="white" />
                  </ButtonEditText>
                </ButtonEditView>
              </HeaderUserArroba>)}

            {editUserInfo.descricao ?
              (<EditUserDescricaoView>
                <EditUserDescricao
                  multiline={true}
                  onChangeText={(text) => setNewUserInfo({ ...newUserInfo, descricao: text })}
                  value={newUserInfo?.descricao}
                  placeholder="Create your new description"
                  textAlign={"left"}
                  placeholderTextColor={themes.COLORS.GRAY4}
                  numberOfLines={10}
                  textAlignVertical="top"></EditUserDescricao>
                <ButtonsView>
                  <CancelButton onPress={() => { setEditUserInfo({ ...editUserInfo, descricao: false }), setNewUserInfo({ ...newUserInfo, descricao: "" }) }}>
                    <MaterialIcons name="cancel" size={24} color="red" />
                  </CancelButton>
                  <SaveButton onPress={editarUsuario}>
                    <MaterialIcons name="verified" size={24} color="green" />
                  </SaveButton>
                </ButtonsView>
              </EditUserDescricaoView>) :
              (<HeaderUserDescription>
                {userInfo[0]?.descricao != undefined ? userInfo[0].descricao : "Ainda não possui nenhuma descrição, coloque uma: "}
                <ButtonEditView>
                  <ButtonEditText onPress={() => setEditUserInfo({ ...editUserInfo, descricao: true })}>
                    <Feather name="edit" size={15} color="white" />
                  </ButtonEditText>
                </ButtonEditView>
              </HeaderUserDescription>)}
          </HeaderUserInfoView>
          {postUser &&
            postUser.map((items) => {
              if (items != undefined) {
                return (
                  <PostView
                    id={items.id}
                    key={items.id}
                    user={items.user}
                    body={items.body}
                    images={items?.images}
                    arquivos={items.arquivos}
                    data={items.data}
                  />
                );
              }
            })}
        </ContainerHeaderProfile>
      </ScrollView>
    </Container>
  );
};

export { Profile };
