import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
import * as DataBase from "firebase/database";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Button,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { PostView } from "../../../components/Posts";
import { database, db, storage } from "../../../configs/firebase";
import { IPost } from "../../../interfaces/PostInterface";

import { Container, ButtoSeeMore, TextSeeMore } from "./style";

const HomeTab = () => {
  const navigation = useNavigation();
  const [postInDataBase, setPostInDataBase] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [numberOfPost, setNumberOfPost] = useState(5);
  const onRefresh = useCallback(() => {
    setNumberOfPost(5);
    setRefreshing(true);
    setTimeout(() => {
      reciveUserAttributes(5);
      setRefreshing(false);
    }, 1000);
  }, []);

  function endScrollView() {
    setNumberOfPost(numberOfPost + 1);
    reciveUserAttributes(numberOfPost);
  }

  const reciveUserAttributes = useCallback(
    async (QntOfPost: number) => {
      const refDatabase = DataBase.ref(database, "posts/");
      const PostInDataBase = DataBase.query(
        refDatabase,
        DataBase.orderByChild("data"),
        DataBase.limitToLast(QntOfPost)
      );
      DataBase.onValue(PostInDataBase, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const PostList = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => b.data - a.data);
          setPostInDataBase(PostList);
        }
      });
    },
    [setPostInDataBase]
  );

  useEffect(() => {
    reciveUserAttributes(numberOfPost);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Container>
        <HeaderProfile />
        {postInDataBase &&
          postInDataBase.map((items) => {
            return (
              <PostView
                id={items.id}
                key={items.id}
                user={items.user}
                title={items.title}
                description={items.description}
                images={items?.images}
                data={items.data}
              />
            );
          })}
        <ButtoSeeMore onPress={endScrollView}>
          <TextSeeMore>Ver mais</TextSeeMore>
        </ButtoSeeMore>
      </Container>
    </ScrollView>
  );
};

export { HomeTab };
