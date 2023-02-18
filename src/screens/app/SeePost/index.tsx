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
  ButtoSeeMore,
} from "./style";
import { TabRoutes } from "../../../routes/tabs.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { useAuthentication } from "../../../hooks/useAuthentication";

const SeePost = () => {
  const { user } = useAuthentication();
  const route = useRoute<SeePost>();
  const navigation = useNavigation();
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "post", id));
    navigation.navigate("TabsRoutes");
  };

  return (
    <Container>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderProfile />
          <PostPub>
            {user?.email == route.params.body.user ? (
              <Button
                title="Deletar"
                onPress={() => deletePost(route.params.id)}
              />
            ) : null}
            <TitlePoster>{route.params.body.title}</TitlePoster>
            {route.params.body.description && (
              <Description>{route.params.body.description}</Description>
            )}
            <FlatList
              data={route.params.body.files}
              ListFooterComponent={({ index }) => {
                return (
                  <UserDomain key={index}>
                    By: {route.params.body.user}
                  </UserDomain>
                );
              }}
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
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};
export { SeePost };
