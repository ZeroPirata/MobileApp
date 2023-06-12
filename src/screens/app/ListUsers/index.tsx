import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { MainContainer } from './style'
import { ListUsersComponent } from "../../../components/ListUsersComponent";
import { ModalView } from "../../../components/ModalProfile";
import { useState } from "react";
const ListSearchedUser = () => {
  const route = useRoute<ListSearchedUsers>();


  return (
    <MainContainer>
      {route.params.length > 0 ? (
        route.params.map((values) => (
          <ListUsersComponent
            key={values.id}
            id={values.id}
            email={values.email}
            avatar={values.avatar}
            name={values.name}
          />
        ))
      ) : (
        <Text style={{ flexDirection: "row", color: "white", height: "50%", fontSize: 50, textAlign: "center", alignContent: "center", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>Usuario não encontrado</Text>
      )}
    </MainContainer>
  );
};

export { ListSearchedUser };
