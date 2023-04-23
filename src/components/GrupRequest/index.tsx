import { View, Text, TouchableOpacity } from "react-native";
import { IGrupo } from "../../interfaces/Notification";
import { Entypo } from "@expo/vector-icons";
import { push, ref, remove } from "firebase/database";
import { database } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";

const GrupRequest = ({ ...rest }: IGrupo) => {
  const { user } = useAuthentication();
  const AceitarGrupo = () => {
    const refRealTime = ref(database, `grupos/${rest.idGroup}/membros`);
    push(refRealTime, {
      id: user?.uid,
    });
    RecusarGrupo();
    /* Fazer Lógica de aceitar no Database */
    console.log("Aceito");
  };
  const RecusarGrupo = () => {
    const refRealTime = ref(
      database,
      `user/${user?.uid}/alerts/grupInvite/${rest.idRequest}`
    );
    remove(refRealTime);
    console.log("Excluido");
  };
  return (
    <View>
      <Text>{rest.name}</Text>
      <Text>{rest.data}</Text>
      <Text>{rest.idGroup}</Text>
      <View>
        <TouchableOpacity onPress={() => AceitarGrupo()}>
          <Entypo name="check" size={24} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="cross"
            size={24}
            color={"black"}
            onPress={() => RecusarGrupo()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export { GrupRequest };
