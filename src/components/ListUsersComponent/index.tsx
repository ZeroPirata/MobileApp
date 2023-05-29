import { IListSearchedUsers } from "../../interfaces/ListagemDeUsuario";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { push, ref, set } from "firebase/database";
import { database } from "../../configs/firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import themes from "../../styles/themes";

export const ListUsersComponent = ({ ...rest }: IListSearchedUsers) => {
  const { user } = useAuthentication();

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

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: themes.COLORS.COLORS_CONSTRAT.VERDE_AZULADO,
        alignItems: "center",
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Image
        source={{ uri: rest.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
      />
      <View style={{ width: "70%" }}>
        <Text
          style={{
            fontSize: 25,
            color: themes.COLORS.COLORS_CONSTRAT.ROSA_CLARO,
          }}
        >
          {rest.name}
        </Text>
        <Text style={{ fontSize: 15 }}>{rest.email}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => handlerAdicionarUsuario(rest.id)}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="open-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
