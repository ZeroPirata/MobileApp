import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { database, db } from "../../../configs/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import {
  Body,
  BodyContent,
  ButtonLike,
  ButtonSendComment,
  Comment,
  CommentSection,
  CommentText,
  CommentariosShow,
  Container,
  CreateComentario,
  CreateCommentSection,
  DataPost,
  ImageUserComment,
  ImageUsersComment,
  LikeCount,
  ListComment,
  SafeAreaViewContent,
  TextButtonSend,
  TextCommentsSection,
  TimeComment,
  UserAndTime,
  UserDeleteComment,
  UserName,
  UserNameName,
  ViewRenderImages,
} from "./style";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { useAuthentication } from "../../../hooks/useAuthentication";
import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  child,
  onValue,
  push,
  ref,
  remove,
  runTransaction,
} from "firebase/database";
import Comentario from "../../../interfaces/ComentarioInterface";
import { Modals } from "../../../components/Modals";
import { Option } from "../../../interfaces/ModalInterface";
import themes from "../../../styles/themes";
import { RenderImagesComponent } from "../../../components/RenderImage";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const SeePost = () => {
  const { user } = useAuthentication();
  const [values, setValues] = useState({
    comentario: "",
  });
  const route = useRoute<SeePost>();
  const navigation = useNavigation();
  const [editFocus, setIsEditFocused] = useState(false);
  const [deleteFocus, setIsDeleteFocused] = useState(false);
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "post", id));
    navigation.navigate("TabsRoutes");
  };

  const NewComentario = () => {
    if (!user) {
      return;
    }
    const createComentarioRef = ref(
      database,
      `posts/${route.params.id}/coments`
    );
    const updates = {
      name: user.displayName,
      userProfile: user.photoURL,
      email: user.email,
      comentario: values.comentario,
      data: Math.floor(Date.now() / 1000),
    };
    push(createComentarioRef, updates)
      .then(() => {
        setValues({
          comentario: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [likesCount, setLikesCount] = useState(0);
  const [comentsCount, setComentsCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComments] = useState<Comentario[]>([]);

  const handleLike = () => {
    if (!user) {
      return;
    }
    const postLikesRef = ref(database, `posts/${route.params.id}/likes`);
    const userLikeRef = child(postLikesRef, user.uid);
    const handleTransaction = (currentData: any) => {
      if (currentData === null) {
        return { userId: user.uid };
      } else {
        return null;
      }
    };
    runTransaction(userLikeRef, handleTransaction)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const postLikesRef = ref(database, `posts/${route.params.id}/likes`);
    const handleSnapshot = (snapshot: any) => {
      const likes = snapshot.val();
      const likesCount = likes ? Object.keys(likes).length : 0;
      setLikesCount(likesCount);
      setLiked(likes && likes[String(user?.uid)]);
    };
    onValue(postLikesRef, handleSnapshot);

    const comentariosRef = ref(database, `posts/${route.params.id}/coments/`);
    onValue(comentariosRef, (snapshot) => {
      const comentariosFirebase = snapshot.val();
      const comentariosArray = [];

      for (const key in comentariosFirebase) {
        const comentario: Comentario = {
          id: key,
          name: comentariosFirebase[key].name,
          userProfile: comentariosFirebase[key].userProfile,
          comentario: comentariosFirebase[key].comentario,
          data: comentariosFirebase[key].data,
          email: comentariosFirebase[key].email,
        };
        comentariosArray.push(comentario);
      }
      comentariosArray.sort((a, b) => b.data - a.data);
      setComentsCount(comentariosArray.length);
      setComments(comentariosArray);
    });
  }, [route.params.id, user]);

  const date = new Date(route.params.data * 1000);
  const localeDate = date.toLocaleDateString();
  const localeHours = date.toLocaleTimeString();

  const options: Option[] = [
    {
      name: "Editar Postagem",
      function: () => console.log("Pão"),
    },
    { name: "Excluir Postagem", function: () => console.log("Pão") },
  ];

  const deleteComment = async (idComment: string) => {
    await remove(
      ref(database, `posts/${route.params.id}/coments/${idComment}`)
    );
  };

  const [openComments, setOpenComments] = useState(false);

  return (
    <SafeAreaView>
      <Container>
        <HeaderProfile />
        <ScrollView>
          <Body>
            <SafeAreaViewContent>
              <UserNameName>{route.params.user.nome}</UserNameName>
              <Modals
                options={options}
                iconNameFeater="settings"
                iconSize={25}
              />
            </SafeAreaViewContent>
            <DataPost>
              {localeDate} - {localeHours}
            </DataPost>
            <BodyContent>{route.params.body}</BodyContent>
            <ViewRenderImages>
              {route.params.images ? (
                <RenderImagesComponent arrayImages={route.params.images} />
              ) : null}
            </ViewRenderImages>
          </Body>
          <CommentSection>
            <CommentariosShow onPress={() => setOpenComments(!openComments)}>
              <FontAwesome
                name="comment"
                size={30}
                color={themes.COLORS.MAINFill}
              />
              <Text
                style={{ color: themes.COLORS.MAINFill, fontSize: RFValue(20) }}
              >
                Open Comments
              </Text>
            </CommentariosShow>
            <ButtonLike onPress={handleLike}>
              <AntDesign
                style={{ fontWeight: "bold" }}
                color={liked ? themes.COLORS.RED : themes.COLORS.WHITE}
                name="heart"
                size={25}
              />
              <LikeCount
                style={
                  liked
                    ? { color: themes.COLORS.RED }
                    : { color: themes.COLORS.WHITE }
                }
              >
                {likesCount}
              </LikeCount>
            </ButtonLike>
          </CommentSection>
        </ScrollView>
        <ListComment
          style={openComments ? { display: "flex" } : { display: "none" }}
        >
          <FlatList
            scrollEnabled={true}
            style={{ height: "100%", width: "100%" }}
            data={comment}
            renderItem={({ item }) => {
              const date = new Date(item.data * 1000);
              const localeDate = date.toLocaleDateString();
              const localeHours = date.toLocaleTimeString();
              return (
                <Comment>
                  <ImageUsersComment
                    source={{ uri: String(item.userProfile) }}
                  />
                  <TextCommentsSection>
                    <UserAndTime>
                      <UserName>{item.name} </UserName>
                      <TimeComment>
                        {localeDate} - {localeHours}
                      </TimeComment>
                      <UserDeleteComment
                        onPress={() => deleteComment(item.id)}
                        style={
                          user?.email == item.email ||
                          user?.email == route.params.user.email
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={20}
                          color="red"
                        />
                      </UserDeleteComment>
                    </UserAndTime>
                    <CommentText>{item.comentario}</CommentText>
                  </TextCommentsSection>
                </Comment>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <CommentariosShow
                  onPress={() => setOpenComments(!openComments)}
                >
                  <FontAwesome5
                    name="comment-slash"
                    size={30}
                    color={themes.COLORS.MAINFill}
                  />
                  <Text
                    style={{
                      color: themes.COLORS.MAINFill,
                      fontSize: RFValue(20),
                    }}
                  >
                    Close Comments
                  </Text>
                </CommentariosShow>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ListComment>
      </Container>
      <CreateCommentSection>
        <ImageUserComment source={{ uri: String(user?.photoURL) }} />
        <CreateComentario
          placeholderTextColor={themes.COLORS.COLORS_CONSTRAT.CINZA_CLARO}
          value={values.comentario}
          placeholder="Text here"
          onChangeText={(text) => setValues({ ...values, comentario: text })}
        />
        <ButtonSendComment onPress={NewComentario}>
          <Ionicons name="send" size={24} color={themes.COLORS.MAINFill} />
        </ButtonSendComment>
      </CreateCommentSection>
    </SafeAreaView>
  );
};
export { SeePost };
