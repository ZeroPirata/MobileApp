import { View, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../configs/firebase";
import {
  IAlertas,
  IFriendRequest,
  IGrupo,
} from "../../../interfaces/Notification";
import { FriendRequest, GrupRequest } from "../../../components/";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Comentarios } from "../../app/SeePost/style";
const Notification = (): JSX.Element => {
  const { user } = useAuthentication();
  const [notification, setNotification] = useState<any>();

  const [gruposInvite, setGruposInvites] = useState<IGrupo[]>([]);
  const [friendRequest, setFriendRequest] = useState<IFriendRequest[]>([]);

  useEffect(() => {
    const refRealTime = ref(
      database,
      `user/${user?.uid}/alerts/requestfriends`
    );
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const data = snapshot.val();
      const requestData = [];
      for (const key in data) {
        const request: IFriendRequest = {
          avatar: data[key]?.avatar,
          email: data[key]?.email,
          data: data[key]?.date,
          idUser: data[key].id,
          idRequest: key,
        };
        requestData.push(request);
      }
      setFriendRequest(requestData);
    });
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [user?.uid, setFriendRequest]);

  useEffect(() => {
    const refRealTime = ref(database, `user/${user?.uid}/alerts/grupInvite`);
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const data = snapshot.val();
      const requestData = [];
      for (const key in data) {
        const request: IGrupo = {
          avatar: data[key]?.avatar,
          name: data[key]?.name,
          data: data[key]?.date,
          idGroup: data[key].id,
          idRequest: key,
        };
        requestData.push(request);
      }
      setGruposInvites(requestData);
    });
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [user?.uid, setFriendRequest]);
  useEffect(() => {
    const refRealTime = ref(
      database,
      `user/${user?.uid}/alerts/requestfriends`
    );
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const data = snapshot.val();
      const requestData = [];
      for (const key in data) {
        const request: IFriendRequest = {
          avatar: data[key]?.avatar,
          email: data[key]?.email,
          data: data[key]?.date,
          idUser: data[key].id,
          idRequest: key,
        };
        requestData.push(request);
      }
      setFriendRequest(requestData);
    });
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [user?.uid, setFriendRequest]);

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
      <Text>Amigos</Text>
      {friendRequest.length > 0 ? (
        friendRequest.map((request) => {
          return (
            <FriendRequest
              avatar={request.avatar}
              data={request.data}
              email={request.email}
              idRequest={request.idRequest}
              idUser={request.idUser}
              key={request.idRequest}
            />
          );
        })
      ) : (
        <Text>A lista esta vazia</Text>
      )}
      <Text>Grupos</Text>
      {gruposInvite.length > 0 ? (
        gruposInvite.map((grupos, index) => {
          return (
            <GrupRequest
              idGroup={grupos.idGroup}
              idRequest={grupos.idRequest}
              avatar={grupos.avatar}
              data={grupos.data}
              name={grupos.name}
            />
          );
        })
      ) : (
        <Text>A lista esta vazia</Text>
      )}
    </View>
  );
};

export { Notification };
