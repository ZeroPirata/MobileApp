import { View, Text, TouchableOpacity } from "react-native";
import { IFriendRequest } from "../../interfaces/Notification";
import { Entypo } from "@expo/vector-icons";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database, db } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import { ref, remove } from "firebase/database";

export const FriendRequest = ({ ...rest }: IFriendRequest) => {
  const { user } = useAuthentication();
  const FriendAccept = async () => {
    const getIdReference = collection(db, "users");
    const queryOne = query(getIdReference, where("id", "==", user?.uid));
    const queryTwo = query(getIdReference, where("id", "==", rest.idUser));
    const insertLoggedUser = await getDocs(queryOne);
    const InsertFriendRequest = await getDocs(queryTwo);
    if (insertLoggedUser) {
      const refCloudFireStore = doc(db, "users", insertLoggedUser.docs[0].id);
      await updateDoc(refCloudFireStore, {
        friends: arrayUnion({
          id: rest?.idUser,
        }),
      });
    }
    if (InsertFriendRequest) {
      const refCloudFireStore = doc(
        db,
        "users",
        InsertFriendRequest.docs[0].id
      );
      await updateDoc(refCloudFireStore, {
        friends: arrayUnion({
          id: user?.uid,
        }),
      });
      FriendRecused(rest.idRequest);
    }
  };

  const FriendRecused = async (index: string) => {
    await remove(
      ref(database, `user/${user?.uid}/alerts/requestfriends/${index}`)
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        width: 250,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{rest.email}</Text>
      <Text>{rest.idUser}</Text>
      <Text>{rest.data}</Text>
      <View>
        <TouchableOpacity onPress={() => FriendAccept()}>
          <Entypo name="check" size={24} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="cross"
            size={24}
            color={"black"}
            onPress={() => FriendRecused(rest.idRequest)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
