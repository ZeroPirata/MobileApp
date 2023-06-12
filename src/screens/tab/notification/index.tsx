import { useAuthentication } from "../../../hooks/useAuthentication";
import { RenderNotifications } from "../../../components/";
import { off, onValue, ref } from "firebase/database";
import { Container, NotificationsStled } from './style';
import { database } from "../../../configs/firebase";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const Notification = (): JSX.Element => {

  const { user } = useAuthentication();
  const [notification, setNotification] = useState([] as any);

  useEffect(() => {
    const refRealTime = ref(database, `user/${user?.uid}/alerts`);
    let listener: ((a: any) => any) | null = null;
    listener = onValue(refRealTime, (snapshot) => {
      const data = snapshot.val();
      const requestData = [];
      for (const key in data) {
        const request: any = {
          avatar: data[key]?.avatar,
          email: data[key]?.email,
          name: data[key]?.name,
          data: data[key]?.date,
          type: data[key].type,
          solicitador: data[key]?.id,
          idRequest: key,
        };
        requestData.push(request);
      }
      setNotification(requestData);
    });
    return () => {
      if (listener) {
        off(refRealTime, "value", listener);
      }
    };
  }, [user?.uid]);
  return (
    <Container>
      <NotificationsStled>
        <Text style={{ fontSize: 35, color: "white", width: "100%", textAlign: "center" }}>Notification</Text>
        <RenderNotifications list={notification} />
      </NotificationsStled>
    </Container>
  );
};

export { Notification };
