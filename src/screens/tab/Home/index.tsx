import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
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
import { db, storage } from "../../../configs/firebase";
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
      let dados: any = [];
      const collect = collection(db, "post");
      const quertFilterDate = query(
        collect,
        orderBy("date", "desc"),
        limit(QntOfPost)
      );
      const querySnapshot = await getDocs(quertFilterDate);
      querySnapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          body: doc.data(),
        });
      });
      setPostInDataBase(dados);
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
                body={items.body}
                key={items.id}
              ></PostView>
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
