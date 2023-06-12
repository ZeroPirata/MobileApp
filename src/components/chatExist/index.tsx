import { collection, getDocs, query, where, } from "firebase/firestore";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ValidateList } from "../../interfaces/ValidateList";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { IChatExist } from "../../interfaces/ChatExist";
import { FindUserChats } from "../../utils/functions";
import { useEffect, useState } from "react";
import { db } from "../../configs/firebase";
import { Entypo } from "@expo/vector-icons";
import themes from "../../styles/themes";

export const ChatExist = ({ list, user, chats }: ValidateList) => {
  const [personas, setPersonas] = useState<any[]>([]);
  const navigate = useNavigation();

  const handleNavigation = (idChat: string, idUser: string, name: string) => {
    return navigate.navigate("ChatBeetwen", {
      id: idUser,
      idChat: idChat,
      user: name,
    });
  };
  useEffect(() => {
    if (chats != undefined && user != undefined) {
      const listChats = FindUserChats(chats, user.uid);
      setPersonas(listChats);
    }
  }, [chats]);

  const [userFriend, setState] = useState<IChatExist[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const refCollection = collection(db, "users");
      const users: any[] = [];
      for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        const queryCollection = query(
          refCollection,
          where("id", "==", persona.user)
        );
        const querySnapshot = await getDocs(queryCollection);
        querySnapshot.forEach((doc) => {
          return users.push({ user: doc.data(), id: personas[i].id });
        });
      }
      setState(users);
    };

    if (personas.length > 0) {
      fetchUsers();
    }
  }, [personas]);

  return (
    <View>
      {userFriend.map((data, index) => (
        <TouchableOpacity onPress={() => handleNavigation(data.id, data.user.id, data.user.name)}>
          <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 10, height: 65, borderBottomRightRadius: 35, borderTopRightRadius: 35, backgroundColor: themes.COLORS.BACKGROUND }}>
            <Image source={{ uri: String(data.user.avatar) }} style={{ height: 50, width: 50, borderBottomLeftRadius: 15, borderTopRightRadius: 15, }} />
            <View style={{ width: "70%" }}>
              <Text style={{ fontSize: RFValue(20) }}>{data.user.name}</Text>
            </View>
            <View>
              <Entypo name="chat" size={25} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View >
  );
};
