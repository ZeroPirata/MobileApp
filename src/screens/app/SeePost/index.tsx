import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { database, db } from "../../../configs/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import {
  Container,
  Description,
  ImageConfig,
  ImageSettings,
  TitlePoster,
  UserDomain,
  PostPub,
  EditPostButton,
  TextButtons,
  DeletePostButton,
  ViewButtons,
  CommentSection,
  CreateComentario,
  ImageUserComment,
  ButtonSendComment,
  TextButtonSend,
  SessaoDeComentario,
  Comentarios,
  Textos,
  TextSection,
  ImageUsersComment,
  UsuarioComentarioEmail,
  TempoDoComentario,
  ImageFlatListConfig,
  ListagemDeComentarioNaPostagem,
  FooterPostagem,
  LikeButtonPost,
  LikeButtonPostView,
  LikeCounts,
  QuantidadeDeComentario,
  ViewTitleEdit,
  TouchDeleteComment,
} from "./style";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
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

  return (
    <Container>
      <HeaderProfile />
      <PostPub>
        <ViewTitleEdit>
          <TitlePoster>{route.params.title}</TitlePoster>
          {user?.email == route.params.user ? (
            <Modals options={options} icon_size={20} />
          ) : null}
        </ViewTitleEdit>
        {route.params.description && (
          <Description>{route.params.description}</Description>
        )}
        {route.params.files && (
          <ImageFlatListConfig>
            <FlatList
              data={route.params.files}
              renderItem={({ item, index }) => {
                return (
                  <ImageSettings key={index}>
                    <ImageConfig source={{ uri: item }} />
                  </ImageSettings>
                );
              }}
            />
          </ImageFlatListConfig>
        )}
        <LikeButtonPostView>
          <LikeButtonPost onPress={handleLike}>
            {liked ? (
              <EvilIcons color={"gold"} name="like" size={30} />
            ) : (
              <EvilIcons color={"white"} name="like" size={30} />
            )}
            <LikeCounts>{likesCount}</LikeCounts>
          </LikeButtonPost>
          <QuantidadeDeComentario>
            <LikeCounts>{comentsCount}</LikeCounts>
            <EvilIcons color={"white"} name="comment" size={30} />
          </QuantidadeDeComentario>
        </LikeButtonPostView>
        <FooterPostagem>
          <UserDomain>By: {route.params.user}</UserDomain>
          <TempoDoComentario>
            {localeDate} - {localeHours}
          </TempoDoComentario>
        </FooterPostagem>
      </PostPub>
      <ListagemDeComentarioNaPostagem>
        <SessaoDeComentario>
          <FlatList
            data={comment}
            renderItem={({ item }) => {
              const date = new Date(item.data * 1000);
              const localeDate = date.toLocaleDateString();
              const localeHours = date.toLocaleTimeString();
              return (
                <Comentarios>
                  <ImageUsersComment
                    source={{ uri: String(item.userProfile) }}
                  />
                  <TextSection>
                    <UsuarioComentarioEmail>
                      {item.email}
                    </UsuarioComentarioEmail>
                    <TempoDoComentario>
                      {localeDate} - {localeHours}
                    </TempoDoComentario>
                    <Textos>{item.comentario}</Textos>
                    {item.email == user?.email ? (
                      <TouchDeleteComment
                        onPress={() => deleteComment(item.id)}
                      >
                        <EvilIcons name="trash" size={24} color="white" />
                      </TouchDeleteComment>
                    ) : null || route.params.user == user?.email ? (
                      <TouchDeleteComment
                        onPress={() => deleteComment(item.id)}
                      >
                        <EvilIcons name="trash" size={24} color="white" />
                      </TouchDeleteComment>
                    ) : (
                      null
                    )}
                  </TextSection>
                </Comentarios>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </SessaoDeComentario>
      </ListagemDeComentarioNaPostagem>
      <CommentSection>
        <ImageUserComment source={{ uri: String(user?.photoURL) }} />
        <CreateComentario
          placeholderTextColor={themes.COLORS.COLORS_CONSTRAT.CINZA_CLARO}
          value={values.comentario}
          placeholder="Text here"
          onChangeText={(text) => setValues({ ...values, comentario: text })}
        />
        <ButtonSendComment onPress={NewComentario}>
          <TextButtonSend>Enviar</TextButtonSend>
        </ButtonSendComment>
      </CommentSection>
    </Container>
  );
};
export { SeePost };
/* 
{user?.email == route.params.user ? (
          <ViewButtons>
            <EditPostButton
              onPressIn={() => setIsEditFocused(true)}
              onPressOut={() => setIsEditFocused(false)}
              onPress={() => EditPost(id, body)}
              >
              {editFocus && (
                <>
                  <TextButtons>Editar</TextButtons>
                </>
              )}
              <FontAwesome name="edit" size={25} color="white" />
            </EditPostButton>
            <DeletePostButton
              onPressIn={() => setIsDeleteFocused(true)}
              onPressOut={() => setIsDeleteFocused(false)}
              onPress={() => deletePost(id)}
            >
              {deleteFocus && (
                <>
                  <TextButtons>Deletar</TextButtons>
                </>
              )}
              <FontAwesome name="trash-o" size={25} color="red" />
            </DeletePostButton>
          </ViewButtons>
        ) : null}

*/
