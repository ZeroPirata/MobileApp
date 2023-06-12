import { ref, set, query as queryRT, orderByChild, onValue, } from "firebase/database";
import { collection, onSnapshot, query, where, } from "firebase/firestore";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Usuario } from "../../interfaces/UsuarioInterface";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { InsertChatUser } from "../../utils/functions";
import { database, db } from "../../configs/firebase";
import { ListUser } from "../../interfaces/ListUser";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { uuidv4 } from "@firebase/util";

export const ListChatFriends = ({ id, name, userLogged }: ListUser) => {
  const navigate = useNavigation();

  const [user, setState] = useState<Usuario[]>([]);
  useEffect(() => {
    const refCollection = collection(db, "users");
    const queryCollection = query(refCollection, where("id", "==", id));
    const unsubscribe = onSnapshot(queryCollection, (querySnapshot) => {
      const dados: any = [];
      querySnapshot.docs.map((doc) => {
        dados.push(doc.data());
      });
      setState(dados);
    });
    return unsubscribe;
  }, []);

  const handleStartChatUsers = async () => {
    let loading = true;
    const keys: any[] = [];
    const refRealTime = ref(database, `chat/`);
    const queryRealTime = queryRT(refRealTime);
    onValue(queryRealTime, (snapShot) => {
      if (snapShot.exists()) {
        snapShot.forEach((values) => {
          keys.push({ id: values.key });
        });
      } else {
        loading = false;
      }
    });
    let boolean: { bool: boolean; id: string } = {
      bool: false,
      id: "",
    };
    keys.map((key) => {
      const findChat = ref(database, `chat/${key["id"]}/`);
      const queryChat = queryRT(findChat, orderByChild("users"));
      onValue(queryChat, (onSnapshot) => {
        if (
          (onSnapshot.val().users.persoOne == String(userLogged) &&
            onSnapshot.val().users.persoTwo == String(id)) ||
          (onSnapshot.val().users.persoOne == String(id) &&
            onSnapshot.val().users.persoTwo == String(userLogged))
        ) {
          boolean = { bool: true, id: key["id"] };
          return boolean;
        }
      });
      loading = false;
    });
    if (!boolean["bool"] && !loading) {
      const newId = uuidv4();
      const realtimeRef = ref(database, `chat/${newId}`);
      set(realtimeRef, {
        users: { persoOne: userLogged, persoTwo: id },
      });
      boolean = { bool: true, id: newId };
      await InsertChatUser(userLogged, id, newId);
    }
    if (boolean["id"]) {
      return navigate.navigate("ChatBeetwen", {
        id: id,
        idChat: boolean["id"],
        user: name,
      });
    }
  };
  return (
    <TouchableOpacity onPress={handleStartChatUsers}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 10, height: 65, borderBottomRightRadius: 35, borderTopRightRadius: 35, backgroundColor: themes.COLORS.BACKGROUND, }}>
        <Image source={{ uri: String(user[0]?.avatar) }} style={{ height: 50, width: 50, borderBottomLeftRadius: 15, borderTopRightRadius: 15 }} />
        <View style={{ width: "70%" }}><Text style={{ fontSize: RFValue(20) }}>{user[0]?.name}</Text></View>
        <View><Entypo name="chat" size={25} /></View>
      </View>
    </TouchableOpacity >
  );
};
