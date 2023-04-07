import { View, Text } from "react-native";
import { ListChatFriends } from "../ListChatFriends";
import React from "react";
import { ValidateList } from "../../interfaces/ValidateList";

export const ValidarLista = ({ list, user }: ValidateList) => {
  if (user != null) {
    return (
      <View>
        {list?.map((friend, index) => (
          <ListChatFriends
            key={index}
            userLogged={user.uid}
            id={String(friend.id)}
            name={String(friend.name)}
          />
        ))}
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
