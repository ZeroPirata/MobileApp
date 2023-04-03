import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ListUsersComponent } from "../../../components/ListUsersComponent";
const ListSearchedUser = () => {
  const route = useRoute<ListSearchedUsers>();

  return (
    <View
      style={{
        marginTop: 55,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
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
        <Text>Usuario não encontrado</Text>
      )}
    </View>
  );
};

export { ListSearchedUser };
