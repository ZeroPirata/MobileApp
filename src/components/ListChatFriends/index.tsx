import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { IFriendRequest } from "../../interfaces/Notification";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  endAt,
  endBefore,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { database, db } from "../../configs/firebase";
import { TouchableOpacity } from "react-native";
import themes from "../../styles/themes";
import {
  ref,
  set,
  query as queryRT,
  orderByChild,
  onValue,
  equalTo,
  orderByPriority,
  startAt,
  orderByKey,
  orderByValue,
} from "firebase/database";
import { uuidv4 } from "@firebase/util";
import { Usuario } from "../../interfaces/UsuarioInterface";
import { User } from "firebase/auth";
import { ListUser } from "../../interfaces/ListUser";
import { InsertChatUser } from "../../utils/functions";

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
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        height: 65,
        borderBottomRightRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: themes.COLORS.BACKGROUND,
      }}
    >
      <Image
        source={{ uri: String(user[0]?.avatar) }}
        style={{
          height: 50,
          width: 50,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View style={{ width: "70%" }}>
        <Text>{user[0]?.name}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleStartChatUsers}>
          <Entypo name="chat" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
