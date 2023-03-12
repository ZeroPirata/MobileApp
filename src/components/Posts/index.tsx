import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import {
  set,
  ref,
  get,
  child,
  update,
  increment,
  onValue,
  off,
  remove,
  push,
  query,
  orderByChild,
  equalTo,
  runTransaction,
} from "firebase/database";
import { useEffect, useState } from "react";
import { Button, RefreshControl, ScrollView, View } from "react-native";
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
} from "./style";

const PostView = ({ id, body }: IPost) => {
  const { user } = useAuthentication();
  const refDatabase = ref(database);
  const navigation = useNavigation();
  const [editFocus, setIsEditFocused] = useState(false);
  const [deleteFocus, setIsDeleteFocused] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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


  function SeePost(
    id: string,
    body: {
      user: string;
      title: string;
      description?: string | undefined;
      files?: string[] | undefined;
    }
  ) {
    navigation.navigate("SeePost", { id: id, body: body });
  }

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "post", id));
  };

  function EditPost(
    id: string,
    body: {
      user: string;
      title: string;
      description?: string | undefined;
      files?: string[] | undefined;
    }
  ) {
    navigation.navigate("EditPost", { id: id, body: body });
  }
  return (
    <Container>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        <TitlePoster>{body.title}</TitlePoster>
        <TitlePoster>{id}</TitlePoster>
        {user?.email == body.user ? (
          <CointaienrButton>
            <EditPostButton
              onPressIn={() => setIsEditFocused(true)}
              onPressOut={() => setIsEditFocused(false)}
              onPress={() => EditPost(id, body)}
            >
              <FontAwesome name="edit" size={25} color="white" />
              {editFocus && (
                <>
                  <TextButtonsView />
                  <TextButtons>Editar</TextButtons>
                </>
              )}
            </EditPostButton>
            <DeletePostButton
              onPress={() => deletePost(id)}
              onPressIn={() => setIsDeleteFocused(true)}
              onPressOut={() => setIsDeleteFocused(false)}
            >
              <FontAwesome name="trash-o" size={25} color="red" />
              {deleteFocus && (
                <>
                  <TextButtonsView />
                  <TextButtons>Deletar</TextButtons>
                </>
              )}
            </DeletePostButton>
          </CointaienrButton>
        ) : null}
        {body.description && <Description>{body.description}</Description>}
        {body.files && (
          <ImageSettings>
            {body.files[0] ? (
              <ImageConfig source={{ uri: body.files[0] }} />
            ) : null}
            {body.files[1] ? (
              <ImageConfig source={{ uri: body.files[1] }} />
            ) : null}
          </ImageSettings>
        )}
        <ButtonSeeMore onPress={() => SeePost(id, body)}>
          <TextButtonSeeMore>See more</TextButtonSeeMore>
        </ButtonSeeMore>
        <UserDomain>By: {body.user}</UserDomain>
        <LikeAndDeslikeButton>
          <Button title="Button" onPress={handleLike} />
          { liked ?  <EvilIcons name="like" size={25} /> : <EvilIcons name="sc-linkedin" size={25} /> }
          <TextButtonSeeMore>{likesCount}</TextButtonSeeMore>
          <EvilIcons name="retweet" size={25} />
        </LikeAndDeslikeButton>
      </ScrollView>
    </Container>
  );
};
export { PostView };
