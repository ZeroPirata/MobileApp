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
  const startCountRef = ref(database, "/post/" + id + "/starCount");
  const [likesCount, setLikesCount] = useState("");
  const [listUserLikes, setListUserLikes] = useState([])
  const refDatabase = ref(database);

  useEffect(() => {
    const postRef = ref(database, "/post/" + id);
    const handleStar = (snapshot: any) => {
      const numberOfStar = snapshot.val();
      const star = numberOfStar ? numberOfStar.starCount : 0;
      setLikesCount(star);

    };
    onValue(postRef, handleStar);
  });

  function addStarInPost(starCount: number) {
    get(child(refDatabase, "/post/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const updates: any = {};
          updates[`/post/${id}/starCount`] = increment(1);
          return update(ref(database), updates);
        } else {
          set(ref(database, "/post/" + id), {
            starCount: 1
          });
        }
      })
      .catch(({ err }) => {
        console.log(err);
      });
  }
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [editFocus, setIsEditFocused] = useState(false);
  const [deleteFocus, setIsDeleteFocused] = useState(false);
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
  const [refreshing, setRefreshing] = useState(false);

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
        {body.files && body.files[0] ? (
          <ButtonSeeMore onPress={() => SeePost(id, body)}>
            <TextButtonSeeMore>See more</TextButtonSeeMore>
          </ButtonSeeMore>
        ) : null}
        <UserDomain>By: {body.user}</UserDomain>
        <LikeAndDeslikeButton>
          <Button onPress={() => addStarInPost(1)} title="Button" />

          <EvilIcons name="like" size={25} />
          <TextButtonSeeMore>{likesCount}</TextButtonSeeMore>
          <EvilIcons name="retweet" size={25} />
        </LikeAndDeslikeButton>
      </ScrollView>
    </Container>
  );
};
export { PostView };
