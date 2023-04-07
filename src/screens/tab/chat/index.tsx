import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Container } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthentication } from "../../../hooks/useAuthentication";
import {
  ValidarLista,
  ChatExist,
  ValidarChat,
} from "../../../components/index";
import { FindUserChats, useListFriends } from "../../../utils/functions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import themes from "../../../styles/themes";

const Chat = () => {
  const [showList, setShowList] = useState(false);
  const [showListChat, setShowListChat] = useState(false);
  const { user } = useAuthentication();
  const [chats, setChats] = useState<any>([]);
  const listFriends = useListFriends(String(user?.uid));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setChats(listFriends[0]?.chats);
      setRefreshing(false);
    }, 1000);
  }, [listFriends]);

  useEffect(() => {
    onRefresh();
    setChats(listFriends[0]?.chats);
  }, [listFriends[0]?.chats, onRefresh]);

  const [updateCounter, setUpdateCounter] = useState(0);
  useEffect(() => {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }, [listFriends]);

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
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            zIndex: 10,
            top: "4.5%",
            right: 0,
          }}
        >
          {showList
            ? listFriends.length > 0 && (
                <ScrollView>
                  <ValidarLista
                    key={`validar-lista-${updateCounter}`}
                    list={listFriends[0].friends}
                    user={user}
                  />
                </ScrollView>
              )
            : null}
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            backgroundColor: themes.COLORS.COLORS_CONSTRAT.ROSA_CLARO,
            height: "100%",
          }}
          horizontal={false}
        >
          {listFriends[0]?.chats && (
            <ValidarChat
              key={`validar-lista-${updateCounter}`}
              chats={chats}
              user={user}
            />
          )}
        </ScrollView>
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
