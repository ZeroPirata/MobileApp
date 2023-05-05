import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
import { HeaderProfile } from "../../../components/HeaderProfile";
import { PostView } from "../../../components/Posts";
import { database, db, storage } from "../../../configs/firebase";
import { IPost } from "../../../interfaces/PostInterface";

import { Container, ButtoSeeMore, TextSeeMore } from "./style";
import { useAuthentication } from "../../../hooks/useAuthentication";

const HomeTab = () => {
  const navigation = useNavigation();

  const { user } = useAuthentication();
  const [userInfo, setUserInfo] = useState<DocumentData>();
  const [postInDataBase, setPostInDataBase] = useState<IPost[]>([]);
  const [numberOfPost, setNumberOfPost] = useState(5);
  useEffect(() => {
    if (user?.uid != undefined) {
      const collect = collection(db, "users");
      const queryUser = query(collect, where("id", "==", user?.uid));
      const unsubscribe = onSnapshot(queryUser, (querySnapshot) => {
        const dados: any = [];
        querySnapshot.docs.map((doc) => {
          dados.push(doc.data());
        });
        setUserInfo(dados);
      });
      return unsubscribe;
    }
  }, [user?.uid]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setNumberOfPost(5);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  function endScrollView() {
    setNumberOfPost(numberOfPost + 1);
  }

  useEffect(() => {
    const listOfFriends =
      userInfo && userInfo[0]?.friends?.map((friend: any) => friend.id);
    const refDatabase = DataBase.ref(database, "posts/");
    const PostInDataBase = DataBase.query(
      refDatabase,
      DataBase.orderByChild("data"),
      DataBase.limitToLast(numberOfPost)
    );
    DataBase.onValue(PostInDataBase, (snapshot) => {
      const data = snapshot.val();
      const PostList = Object.keys(data)
        .map((key) => {
          const post = data[key];
          const isFriend =
            listOfFriends && listOfFriends.includes(post.user_id);
          const postDono = post.user_id == user?.uid;
          if (isFriend || (postDono && post !== undefined)) {
            return {
              id: key,
              ...post,
            };
          }
        })
        .sort((a, b) => b.data - a.data);
      setPostInDataBase(PostList);
    });
  }, [setPostInDataBase, user?.uid, userInfo]);

  return (
    <Container>
      <HeaderProfile />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {postInDataBase &&
          postInDataBase.map((items) => {
            if (items != undefined) {
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
            }
          })}
        <ButtoSeeMore onPress={endScrollView}>
          <TextSeeMore>Ver mais</TextSeeMore>
        </ButtoSeeMore>
      </ScrollView>
    </Container>
  );
};

export { HomeTab };
