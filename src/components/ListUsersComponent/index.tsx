import { View, Text } from "react-native";
import { IListSearchedUsers } from "../../interfaces/ListagemDeUsuario";

const ListUsersComponent = ({ ...rest }: IListSearchedUsers) => {
  return (
    <View>
      <Text>{rest.name}</Text>
      <Text>{rest.email}</Text>
    </View>
  );
};
export { ListUsersComponent };
