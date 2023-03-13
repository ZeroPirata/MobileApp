import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import { reciveUserAttributes } from "../../../utils/querys";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
} from "./style";
import { TabRoutes } from "../../../routes/tabs.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { FontAwesome } from "@expo/vector-icons";
import {
  child,
  increment,
  onChildAdded,
  push,
  ref,
  runTransaction,
  update,
} from "firebase/database";

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
    /* const userComentRef = child(, user.uid); */
    const updates = {
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

  return (
    <Container>
      <SafeAreaView>
        <HeaderProfile />
        <PostPub>
          {user?.email == route.params.user ? (
            <ViewButtons>
              <EditPostButton
                onPressIn={() => setIsEditFocused(true)}
                onPressOut={() => setIsEditFocused(false)}
                /* onPress={() => EditPost(id, body)} */
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
                /* onPress={() => deletePost(id)} */
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
          <TitlePoster>{route.params.title}</TitlePoster>
          {route.params.description && (
            <Description>{route.params.description}</Description>
          )}
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
          <UserDomain>By: {route.params.user}</UserDomain>
        </PostPub>
        <CommentSection>
          <ImageUserComment source={{ uri: String(user?.photoURL) }} />
          <CreateComentario
            value={values.comentario}
            onChangeText={(text) => setValues({ ...values, comentario: text })}
          />
          <ButtonSendComment onPress={NewComentario}>
            <TextButtonSend>Enviar</TextButtonSend>
          </ButtonSendComment>
        </CommentSection>
      </SafeAreaView>
    </Container>
  );
};
export { SeePost };
