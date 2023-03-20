import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, child, onValue, runTransaction, remove } from "firebase/database";
import { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  RefreshControl,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { db, database } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { IPost } from "../../interfaces/PostInterface";
import {
  Container,
  Description,
  ImageConfig,
  ImageSettings,
  TitlePoster,
  UserDomain,
  ButtonSeeMore,
  TextButtonSeeMore,
  LikeAndDeslikeButton,
  TextButtonsView,
  DeletePostButton,
  CointaienrButton,
  EditPostButton,
  TextButtons,
  ButtonLike,
  LikeCounts,
  DataView,
  DateTime,
  TextButtonsViewDireita,
  TextButtonsViewEsquerda,
} from "./style";
import themes from "../../styles/themes";
import { TextSeeMore } from "../../screens/tab/Home/style";

import { Modals } from "../Modals";
import { ModalsProps, Option } from "../../interfaces/ModalInterface";

const PostView = ({ id, ...rest }: IPost) => {
  const { user } = useAuthentication();

  const [deleteFocus, setIsDeleteFocused] = useState(false);
  const [editFocus, setIsEditFocused] = useState(false);

  const [liked, setLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(0);

  const navigation = useNavigation();

  function EditPost(
    id: string,
    user: string,
    title: string,
    description?: string | undefined,
    files?: string[] | undefined
  ) {
    navigation.navigate("EditPost", { id: id, ...rest });
  }

  function SeePost(
    id: string,
    user: string,
    title: string,
    description?: string | undefined,
    files?: string[] | undefined
  ) {
    navigation.navigate("SeePost", { id: id, ...rest });
  }

  const handleLike = () => {
    if (!user) {
      return;
    }
    const postLikesRef = ref(database, `posts/${id}/likes`);
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
    const postLikesRef = ref(database, `posts/${id}/likes`);
    const handleSnapshot = (snapshot: any) => {
      const likes = snapshot.val();
      const likesCount = likes ? Object.keys(likes).length : 0;
      setLikesCount(likesCount);
      setLiked(likes && likes[String(user?.uid)]);
    };
    onValue(postLikesRef, handleSnapshot);
  }, [id, user]);

  const date = new Date(rest.data * 1000);
  const localeDate = date.toLocaleDateString();
  const localeHours = date.toLocaleTimeString();

  const options: Option[] = [
    {
      name: "Editar Postagem",
      function: () => EditPost(id, rest.user, rest.title),
    },
    { name: "Excluir Postagem", function: () => handleDeletePost(id) },
  ];

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const deletePost = async (id: string) => {
    await remove(ref(database, `posts/${id}`));
  };

  return (
    <Container>
      <ScrollView>
        <TitlePoster>{rest.title}</TitlePoster>
        <DataView>
          <DateTime>
            {localeDate} - {localeHours}{" "}
          </DateTime>
          {user?.email == rest.user ? (
            <Modals options={options} icon_size={15} />
          ) : null}
        </DataView>
        {rest.description && <Description>{rest.description}</Description>}
        {rest.files && (
          <ImageSettings>
            {rest.files[0] ? (
              <ImageConfig source={{ uri: rest.files[0] }} />
            ) : null}
            {rest.files[1] ? (
              <ImageConfig source={{ uri: rest.files[1] }} />
            ) : null}
          </ImageSettings>
        )}
        <ButtonSeeMore onPress={() => SeePost(id, rest.title, rest.user)}>
          <TextButtonSeeMore>See more</TextButtonSeeMore>
        </ButtonSeeMore>
        <UserDomain>By: {rest.user}</UserDomain>
        <LikeAndDeslikeButton>
          <ButtonLike onPress={handleLike}>
            {liked ? (
              <EvilIcons color="gold" name="like" size={25} />
            ) : (
              <EvilIcons
                color={themes.COLORS.COLORS_CONSTRAT.ROSA_CLARO}
                name="like"
                size={25}
              />
            )}
          </ButtonLike>
          <LikeCounts>{likesCount}</LikeCounts>
        </LikeAndDeslikeButton>
      </ScrollView>
    </Container>
  );
};
export { PostView };
/* 
<CointaienrButton>
            <EditPostButton
              onPressIn={() => setIsEditFocused(true)}
              onPressOut={() => setIsEditFocused(false)}
              onPress={() => EditPost(id, rest.user, rest.title)}
            >
              <FontAwesome name="edit" size={25} color="white" />
              {editFocus && (
                <>
                  <TextButtonsViewDireita />
                  <TextButtons>Editar</TextButtons>
                </>
              )}
            </EditPostButton>
            <DeletePostButton
              onPress={() => deletePost(id)}
              onPressIn={() => setIsDeleteFocused(true)}
              onPressOut={() => setIsDeleteFocused(false)}
            >
              {deleteFocus && (
                <>
                  <TextButtons>Deletar</TextButtons>
                  <TextButtonsViewEsquerda />
                </>
              )}
              <FontAwesome name="trash-o" size={25} color="red" />
            </DeletePostButton>
          </CointaienrButton>
           */
