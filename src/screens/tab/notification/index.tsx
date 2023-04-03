import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../configs/firebase";
import { IAlertas } from "../../../interfaces/Notification";
import { FriendRequest } from "../../../components/FrindRequest";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
const Notification = (): JSX.Element => {
  const { user } = useAuthentication();
  const [notification, setNotification] = useState<IAlertas>();

  useEffect(() => {
    const refRealTime = ref(database, `user/${user?.uid}/alerts/`);
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const data = snapshot.val();
      setNotification(data);
    });

    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [user?.uid, setNotification]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {notification &&
        notification?.requestfriends?.map((i, index) => {
          return (
            <FriendRequest
              key={index}
              index={index}
              name={i?.name}
              email={i?.email}
              id={i.id}
              date={i?.date}
              avatar={i.avatar}
            />
          );
        })}
    </View>
  );
};

export { Notification };
