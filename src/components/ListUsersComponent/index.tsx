import { IListSearchedUsers } from "../../interfaces/ListagemDeUsuario";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { equalTo, limitToLast, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import { database, db } from "../../configs/firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { IPost } from "../../interfaces/PostInterface";
import { PostView } from "../Posts";

export const ListUsersComponent = ({ ...rest }: IListSearchedUsers) => {
  const { user } = useAuthentication();

  const [visibleProfile, setVisibleProfile] = useState(false)

  const handlerAdicionarUsuario = (uid: string) => {
    const refRealTime = ref(database, `user/${uid}/alerts`);
    push(refRealTime, {
      type: "amigos",
      date: Math.floor(Date.now() / 1000),
      id: user?.uid,
      name: user?.displayName,
      email: user?.email,
      avatar: user?.photoURL,
    });
  };

  const handleVisibleProfile = () => {
    setVisibleProfile(!visibleProfile)
  }

  return (
    visibleProfile ? <SeeProfileUser {...rest} open={setVisibleProfile} /> :
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: rest.avatar }}
          style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
        />
        <View style={{ width: "60%" }}>
          <Text
            style={{
              fontSize: 25,
              color: themes.COLORS.MAINFill,
            }}
          >
            {rest.name}
          </Text>
          <Text style={{ fontSize: 15, color: themes.COLORS.MAINChat2 }}>{rest.email}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "20%"
          }}
        >
          {rest.id === user?.uid ? null :
            <TouchableOpacity onPress={() => handlerAdicionarUsuario(rest.id)}>
              <Ionicons name="person-add-sharp" size={24} color="green" />
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={handleVisibleProfile}>
            <Ionicons name="open-outline" size={24} color="yellow" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const SeeProfileUser = ({ ...rest }: IListSearchedUsers) => {
  const { user } = useAuthentication();
  const [postUser, setPostUser] = useState<IPost[]>([]);
  const [view, setView] = useState<any>();

  const handlerAdicionarUsuario = (uid: string) => {
    const refRealTime = ref(database, `user/${uid}/alerts`);
    push(refRealTime, {
      type: "amigos",
      date: Math.floor(Date.now() / 1000),
      id: user?.uid,
      name: user?.displayName,
      email: user?.email,
      avatar: user?.photoURL,
    });
  };

  const getUserPost = async () => {
    if (rest?.email != null) {
      const refPostUser = ref(database, "posts/");
      const queryRealTime = query(
        refPostUser,
        orderByChild("user_id"),
        equalTo(rest.id),
        limitToLast(100)
      );
      onValue(queryRealTime, (snapShot) => {
        if (snapShot.exists()) {
          const data = snapShot.val();
          const PostList = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => b.data - a.data);
          setPostUser(PostList);
        }
      });
    }
  };

  useEffect(() => {
    getUserPost();
  }, [view]);


  const id = rest.id
  useEffect(() => {
    const refDatabase = doc(db, 'users', id);
    getDoc(refDatabase).then((res) => setView(res.data()));
  }, [setView])
  const handleCloseProfile = () => {
    if (rest.open) {
      rest.open(false)
    }
  };
  return (
    view ?
      <View style={{ paddingTop: 20, backgroundColor: themes.COLORS.MAIN, width: "100%", height: "100%", position: "absolute", zIndex: 2000 }}>
        <ScrollView>
          <View>
            <Image style={{ width: "100%", height: 150, minHeight: 200 }}
              source={{
                uri: String(
                  view?.background
                    ? view?.background.url
                    : "https://pbs.twimg.com/media/FlmgV-4XwAMDm6j.jpg"
                )
              }} />
            <View>
              <Image source={{ uri: view.avatar ? view.avatar : "https://pbs.twimg.com/media/FlmgV-4XwAMDm6j.jpg" }}
                style={{
                  position: "absolute", borderRadius: 50, borderWidth: 3, borderColor: themes.COLORS.MAINLineCross,
                  bottom: -50, alignItems: "center", justifyContent: "center", height: 125, width: 125, left: "50%",
                  marginLeft: -60, zIndex: 20000
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", height: 50, marginTop: 50, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <TouchableOpacity style={{ width: "35%", alignItems: "center" }} onPress={handleCloseProfile}>
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
            {view.id === user?.uid ? null :
              (
                <TouchableOpacity style={{ width: "35%", alignItems: "center" }} onPress={() => handlerAdicionarUsuario(view.id)}>
                  <Ionicons name="person-add-sharp" size={24} color="green" />
                </TouchableOpacity>
              )}
          </View>
          <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>{view.name}</Text>
          <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>{view.arroba}</Text>
          {postUser &&
            postUser.map((items) => {
              if (items != undefined) {
                return (
                  <PostView
                    id={items.id}
                    key={items.id}
                    user={items.user}
                    body={items.body}
                    images={items?.images}
                    arquivos={items.arquivos}
                    data={items.data}
                  />
                );
              }
            })}
        </ScrollView >
      </View>
      : null
  )
}