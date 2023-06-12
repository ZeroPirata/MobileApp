import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { HeaderProfile } from "../../../components/HeaderProfile";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, } from "react-native";
import { IPost } from "../../../interfaces/PostInterface";
import { database, db } from "../../../configs/firebase";
import { PostView } from "../../../components/Posts";
import * as DataBase from "firebase/database";
import { Container } from "./style";

const HomeTab = () => {
  const { user } = useAuthentication();
  const [postInDataBase, setPostInDataBase] = useState<IPost[]>([]);
  const [userInfo, setUserInfo] = useState<DocumentData>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const listOfFriends =
      userInfo && userInfo[0]?.friends?.map((friend: any) => friend.id);
    const refDatabase = DataBase.ref(database, "posts/");
    const PostInDataBase = DataBase.query(
      refDatabase,
      DataBase.orderByChild("data"),
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

  return (
    <Container>
      <HeaderProfile />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {postInDataBase &&
          postInDataBase.map((items) => {
            if (items != undefined) {
              return (<PostView id={items.id} key={items.id} user={items.user} body={items.body} images={items?.images} arquivos={items.arquivos} data={items.data} grupo={{ id: "", validacao: false }} />);
            }
          })}
      </ScrollView>
    </Container >
  );
};

export { HomeTab };
