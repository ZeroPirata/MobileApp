import { useNavigation } from "@react-navigation/native";
import { ref, child, onValue, runTransaction, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { database } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import { EvilIcons } from "@expo/vector-icons";
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
  ButtonLike,
  LikeCounts,
  DataView,
  DateTime,
} from "./style";
import themes from "../../styles/themes";

import { Modals } from "../Modals";
import { Option } from "../../interfaces/ModalInterface";

export const PostView = ({ id, ...rest }: IPost) => {
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
            <Modals
              options={options}
              iconSize={15}
              iconNameFeater={"settings"}
            />
          ) : null}
        </DataView>
        {rest.description && <Description>{rest.description}</Description>}
        {rest.images && (
          <ImageSettings>
            {rest.images[0] ? (
              <ImageConfig source={{ uri: rest.images[0].url }} />
            ) : null}
            {rest.images[1] ? (
              <ImageConfig source={{ uri: rest.images[1].url }} />
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
