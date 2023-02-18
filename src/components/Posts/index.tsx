import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Button, RefreshControl, ScrollView } from "react-native";
import { db } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
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
  DeletePostButton,
  EditPostButton,
} from "./style";

const PostView = ({ id, body }: IPost) => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
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
    /*         {user?.email == body.user ? (
          <Button title="Deletar" onPress={() => deletePost(id)} />
        ) : null} */
    <Container>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        {user?.email == body.user ? (
          <Button title="Editar" onPress={() => EditPost(id, body)} />
        ) : null}
        <TitlePoster>{body.title}</TitlePoster>
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
        {body.files && body.files[2] ? (
          <ButtonSeeMore onPress={() => SeePost(id, body)}>
            <TextButtonSeeMore>See more</TextButtonSeeMore>
          </ButtonSeeMore>
        ) : null}
        <UserDomain>By: {body.user}</UserDomain>
      </ScrollView>
    </Container>
  );
};
export { PostView };
