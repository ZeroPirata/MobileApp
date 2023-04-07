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
    const queryTwo = query(getIdReference, where("id", "==", rest.id));
    const insertLoggedUser = await getDocs(queryOne);
    const InsertFriendRequest = await getDocs(queryTwo);
    if (insertLoggedUser) {
      const refCloudFireStore = doc(db, "users", insertLoggedUser.docs[0].id);
      await updateDoc(refCloudFireStore, {
        friends: arrayUnion({
          id: rest?.id,
          name: rest?.name,
          email: rest?.email,
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
          name: user?.displayName,
          email: user?.email,
        }),
      });
    }
    FriendRecused(rest.index);
  };

  const FriendRecused = async (index: number) => {
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
      <Text>{rest.id}</Text>
      <Text>{rest.avatar}</Text>
      <Text>{rest.date}</Text>
      <View>
        <TouchableOpacity onPress={() => FriendAccept()}>
          <Entypo name="check" size={24} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="cross"
            size={24}
            color={"black"}
            onPress={() => FriendRecused(rest.index)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
