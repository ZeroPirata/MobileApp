import React, { useCallback, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import {
  AlertText,
  ButtonLogout,
  ButtonLogoutText,
  ButtonSendEmail,
  ButtonSendEmailText,
  ButtonsView,
  Container,
  DefaultText,
  TextDescription,
  TextDescriptionView,
  TextUserName,
} from "./style";
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
const EmailVerifed: React.FC = () => {
  const { user } = useAuthentication();
  const [refresh, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const auth = getAuth();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const sendEmail = () => {
    try {
      if (user) {
        sendEmailVerification(user);
        setMessage("Email successfully sent");
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {message ? <AlertText>{message}</AlertText> : null}
      <DefaultText>
        Hello,{" "}
        <TextUserName>
          {user?.displayName ? user?.displayName : user?.email}{" "}
        </TextUserName>
      </DefaultText>
      <TextDescriptionView>
        <TextDescription>
          Please, verify your email for continuous in the application. If you
          don't have receive the email, please click in the button and another
          email is send for you
        </TextDescription>
      </TextDescriptionView>
      <ButtonsView>
        <ButtonSendEmail onPress={() => sendEmail()}>
          <ButtonSendEmailText>verify email</ButtonSendEmailText>
        </ButtonSendEmail>
        <ButtonLogout onPress={() => signOut(auth)}>
          <ButtonLogoutText>Logout</ButtonLogoutText>
        </ButtonLogout>
      </ButtonsView>
    </Container>
  );
};

export { EmailVerifed };
/*  */
