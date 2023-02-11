import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { db, storage } from "../../../configs/firebase";

import { Container } from "./style";

const HomeTab = () => {
  const [post, setPost] = useState([]);
  const [image, setImage] = useState("");

  /* const [postUrls, setPostUrls] = useState<{ [key: string]: string[] }>({});

  const receiveMetadataImage = useCallback(
    async (postId: string, uuidv4: string) => {
      const forestRef = ref(storage, `images/${uuidv4}`);
      const url = await getDownloadURL(forestRef);
      setPostUrls((prevPostUrls) => {
        const newPostUrls = { ...prevPostUrls };
        if (!newPostUrls[postId]) {
          newPostUrls[postId] = [];
        }
        newPostUrls[postId].push(url);
        return newPostUrls;
      });
    },
    []
  ); */
  /*   const receiveMetadataImage = useCallback(
    async (postId: string, uuidv4: string) => {
      const forestRef = ref(`images/${uuidv4}`);
      const url = await getDownloadURL(forestRef);
      setPostUrls((prevPostUrls) => {
        const newPostUrls = { ...prevPostUrls };
        if (!newPostUrls[postId]) {
          newPostUrls[postId] = [];
        }
        newPostUrls[postId].push(url);
        return newPostUrls;
      });
    },
    []
  ); */
  const reciveMetadataImage = async (uuidv4: string) => {
    const forestRef = ref(storage, `images/${uuidv4}`);
    getDownloadURL(forestRef).then((url) => {
      return String(url);
    });
  };
  /*   console.log(reciveMetadataImage("a4c31483-d688-4769-84db-c971d0036233"));
  const reciveUserAttributes = useCallback(async () => {
    let dados: any = [];
    const collect = collection(db, "post");
    const querySnapshot = await getDocs(collect);
    querySnapshot.forEach((doc) => {
      dados.push({
        id: doc.id,
        body: doc.data(),
      });
    });
    setPost(dados);
  }, [setPost]);

  useEffect(() => {
    reciveUserAttributes();
  }, []); */

  return (
    <Container>
      <HeaderProfile />
      {/* {post.map((primeiroparteAcessarOBody, index) => {
        return (
          <View>
            <Text style={{ fontSize: 10, color: "white" }}>
              {primeiroparteAcessarOBody.body.title}
            </Text>
            <Text style={{ fontSize: 10, color: "white" }}>
              {primeiroparteAcessarOBody.body.description}
            </Text>
            <Text style={{ fontSize: 10, color: "white" }}>
              {primeiroparteAcessarOBody.body.files &&
                primeiroparteAcessarOBody.body.files.map((z) => {
                  return <Text>{z.id}</Text>;
                })}
            </Text>
          </View>
        );
      })} */}
    </Container>
  );
};

/*   console.log(post[0].body.files[0].id); */
{
  /*       {post.map((i) => {
  return (
    <View>
      <Text style={{ fontSize: 25, color: "red" }}>{i.body.title}</Text>
      <Text style={{ fontSize: 10, color: "white" }}>Oi</Text>
    </View>
  );
})} */
}
{
  {
    /* <FlatList
    data={post}
    renderItem={({ item, index }) => (
      <View key={index}>
        <Text style={{ fontSize: 25, color: "red" }}>
          {item.body.title}
        </Text>
        <Text>{item.body.description}</Text>
        {item.body.files && (
          <FlatList
            data={item.body.files}
            renderItem={(files) => (
              <Text style={{ color: "white" }}>{files}</Text>
            )}
          />
        )}
      </View>
    )}
  /> */
  }
  /* <Image
  source={{
    uri: "String(receiveMetadataImage(item.id, image.id))",
  }}
  style={{ width: 100, height: 100 }}
/> */
}
export { HomeTab };
/* {item.body.files && (
              <FlatList
                data={item.body.files}
                renderItem={({ item, index }) => (
                  <Image source={{ uri: item.id }} style={{ width: 100 }} />
                )}
              />
            )} */
