import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Container } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { ValidarLista } from "../../../components/index";
import { useListFriends } from "../../../utils/functions";

const Chat = () => {
  const [showList, setShowList] = useState(false);
  const { user } = useAuthentication();

  const listFriends = useListFriends(String(user?.uid));

  const handleListShow = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  return (
    <Container style={{ paddingTop: 25 }}>
      <View style={styles.headerChat}>
        <TouchableOpacity style={styles.iconDisplay} onPress={handleListShow}>
          <Text>Iniciar conversa</Text>
          <MaterialCommunityIcons
            name={showList ? "chat-minus" : "chat-plus"}
            size={35}
          />
        </TouchableOpacity>
        {showList
          ? listFriends && (
              <ValidarLista list={listFriends[0].friends} user={user} />
            )
          : null}
      </View>
    </Container>
  );
};
export { Chat };

const styles = StyleSheet.create({
  headerChat: {
    display: "flex",
  },
  iconDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
