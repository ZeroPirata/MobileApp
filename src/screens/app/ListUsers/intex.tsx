import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ListUsersComponent } from "../../../components/ListUsersComponent";
const ListSearchedUser = () => {
  const route = useRoute<ListSearchedUsers>();

  return (
    <View>
      {route.params.map((values) => (
        <ListUsersComponent
          key={values.id}
          id={values.id}
          email={values.email}
          avatar={values.avatar}
          name={values.name}
        />
      ))}
    </View>
  );
};

export { ListSearchedUser };
