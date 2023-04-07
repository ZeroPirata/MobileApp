import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { Usuario } from "../../../interfaces/UsuarioInterface";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  arrayUnion,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database, db } from "../../../configs/firebase";
import themes from "../../../styles/themes";
import {
  off,
  onChildAdded,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { useAuthentication } from "../../../hooks/useAuthentication";

interface HistoryChat {
  msg: string;
  user: string;
  data: number;
}

const ChatBeetwen = () => {
  const route = useRoute<Chat>();
  const { user } = useAuthentication();
  const [userRoute, setStateRoute] = useState<Usuario[]>([]);
  const [value, setValue] = useState({
    msg: "",
  });

  useEffect(() => {
    const refCollection = collection(db, "users");
    const queryCollection = query(
      refCollection,
      where("id", "==", route.params.id)
    );
    const unsubscribe = onSnapshot(queryCollection, (querySnapshot) => {
      const dados: any = [];
      querySnapshot.docs.map((doc) => {
        dados.push(doc.data());
      });
      setStateRoute(dados);
    });
    return unsubscribe;
  }, [route]);

  const [chatHistory, setChatHistory] = useState<HistoryChat[]>([]);
  useEffect(() => {
    const refRealTime = ref(database, `chat/${route.params.idChat}/history/`);
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const chatHistory = snapshot.val();
      const chatArray = [];
      for (const key in chatHistory) {
        const comentario = {
          id: key,
          user: chatHistory[key].id,
          msg: chatHistory[key].msg,
          data: chatHistory[key].date,
        };
        chatArray.push(comentario);
      }
      chatArray.sort((a, b) => a.data - b.data);

      setChatHistory(chatArray);
    });

    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [route.params, setChatHistory]);

  const sendMsg = () => {
    const refRealTime = ref(database, `chat/${route.params.idChat}/history`);
    push(refRealTime, {
      id: user?.uid,
      date: Math.floor(Date.now() / 1000),
      msg: value.msg,
    });
  };

  return (
    <View>
      <View style={{ paddingTop: 25 }}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            zIndex: 1,
            height: 75,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            top: 25,
            left: 0,
          }}
        >
          <Image
            source={{ uri: String(userRoute[0]?.avatar) }}
            style={{
              height: 65,
              width: 65,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
          <Text style={{ fontSize: 35, color: "red", paddingLeft: 20 }}>
            {userRoute[0]?.name}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            paddingTop: 75,
            paddingBottom: 55,
            backgroundColor: themes.COLORS.BACKGROUND,
          }}
        >
          <ScrollView>
            <View style={{}}>
              {chatHistory.map((history) => {
                const date = new Date(history.data * 1000);
                const localeDate = date.toLocaleDateString();
                const localeHours = date.toLocaleTimeString();
                return (
                  <View
                    key={history.data}
                    style={
                      user?.uid == history.user
                        ? {
                            backgroundColor: themes.COLORS.GREEN3,
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                            borderColor: "black",
                            borderWidth: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            marginRight: 10,
                          }
                        : {
                            backgroundColor: themes.COLORS.BLUE3,
                            alignItems: "flex-start",
                            borderColor: "black",
                            borderWidth: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 10,
                            alignSelf: "flex-start",
                          }
                    }
                  >
                    <View
                      style={
                        user?.uid == history.user
                          ? {
                              alignItems: "flex-end",
                              padding: 10,
                            }
                          : {
                              padding: 10,
                              alignItems: "flex-start",
                            }
                      }
                    >
                      <Text
                        style={{
                          width: "100%",
                        }}
                      >
                        {history.msg}
                      </Text>
                      <Text>
                        {localeDate} - {localeHours}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            zIndex: 1,
            height: 55,
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            justifyContent: "space-evenly",
            backgroundColor: "white",
          }}
        >
          <TextInput
            onChangeText={(text) => setValue({ ...value, msg: text })}
            onSubmitEditing={() => {
              sendMsg(), setValue({ ...value, msg: "" });
            }}
            value={value.msg}
            placeholder="msg"
            style={{
              width: "80%",
              height: "100%",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 35,
              paddingLeft: 15,
            }}
          />
          <Feather
            style={{
              textAlign: "center",
              width: "20%",
            }}
            name="send"
            size={35}
          />
        </View>
      </View>
    </View>
  );
};
export { ChatBeetwen };
