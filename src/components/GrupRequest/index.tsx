import { View, Text, TouchableOpacity } from "react-native";
import { IGrupo } from "../../interfaces/Notification";
import { Entypo } from "@expo/vector-icons";
import { push, ref, remove } from "firebase/database";
import { database, db } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const GrupRequest = ({ ...rest }: IGrupo) => {
  const { user } = useAuthentication();
  const AceitarGrupo = async () => {
    const refRealTime = ref(database, `grupos/${rest.idGroup}/membros`);
    push(refRealTime, {
      id: user?.uid,
    });
    const collect = collection(db, "users");
    const queryOne = query(collect, where("id", "==", user?.uid));
    const InsertGrupRequest = await getDocs(queryOne);
    if (InsertGrupRequest) {
      const refCloudFireStore = doc(db, "users", InsertGrupRequest.docs[0].id);
      await updateDoc(refCloudFireStore, {
        grupos: arrayUnion({
          id: rest?.idGroup,
        }),
      });
    }
    RecusarGrupo();
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
