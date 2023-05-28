import { View, Text } from "react-native";
import { ListChatFriends } from "../ListChatFriends";
import React from "react";
import { ValidateList } from "../../interfaces/ValidateList";
import { ChatExist } from "../chatExist";

export const ValidarLista = ({ list, user }: ValidateList) => {
  if (user != null && list != undefined) {
    return (
      <View>
        {list?.map((friend, index) => {
          return (
            <ListChatFriends
              key={index}
              userLogged={user.uid}
              id={String(friend.id)}
              name={String(friend.id)}
            />
          )
        })}
      </View>
    );
  } else {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }
};
export const ValidarChat = ({ chats, user }: ValidateList) => {
  console.log(chats)
  if (user != null && chats != undefined) {
    return (
      <View>
        <ChatExist chats={chats} user={user} />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }
};
