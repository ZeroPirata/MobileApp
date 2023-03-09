import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import { reciveUserAttributes } from "../../../utils/querys";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../configs/firebase";
import { doc, deleteDoc } from "firebase/firestore";
const { Navigator, Screen } = createNativeStackNavigator();

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
} from "./style";
import { TabRoutes } from "../../../routes/tabs.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { FontAwesome } from "@expo/vector-icons";

const SeePost = () => {
  const { user } = useAuthentication();
  const route = useRoute<SeePost>();
  const navigation = useNavigation();
  const [editFocus, setIsEditFocused] = useState(false);
  const [deleteFocus, setIsDeleteFocused] = useState(false);
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "post", id));
    navigation.navigate("TabsRoutes");
  };

  return (
    <Container>
      <SafeAreaView>
        <HeaderProfile />
        <PostPub>
          {user?.email == route.params.body.user ? (
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
          <TitlePoster>{route.params.body.title}</TitlePoster>
          {route.params.body.description && (
            <Description>{route.params.body.description}</Description>
          )}
          <FlatList
            data={route.params.body.files}
            renderItem={({ item, index }) => {
              return (
                <ImageSettings key={index}>
                  <ImageConfig source={{ uri: item }} />
                </ImageSettings>
              );
            }}
          />
          {/* {route.params.body.files &&
              route.params.body.files.map((files) => {
                return (
                  <ImageSettings>
                    <ImageConfig source={{ uri: files }} />
                  </ImageSettings>
                );
              })} */}
          <UserDomain>By: {route.params.body.user}</UserDomain>
        </PostPub>
      </SafeAreaView>
    </Container>
  );
};
export { SeePost };
