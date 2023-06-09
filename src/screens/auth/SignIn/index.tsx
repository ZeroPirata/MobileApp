import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import {
  ButtonAccount,
  ButtonLoginText,
  ButtonLoginView,
  ButtonText,
  Container,
  EmailInputText,
  EmailInputView,
  ErroLog,
  ForguetPassWordText,
  ForguetPassWordView,
  ImageBackGround,
  LeyoutLogin,
  LoginComponent,
  LoginText,
  ModalsAnotherLogin,
  PasswordInputText,
  PasswordInputView,
  SeePassword,
  TextCreateAccount,
} from "./style";
import { logo } from "../../../styles/image.json";
import { db } from "../../../configs/firebase";
import { queryByEmail } from "../../../utils/querys";
import { erroLogs } from "../../../utils/errors";

import { GOOGLE_ID } from "../../../configs/google";
import { FACEBOOK_ID } from "../../../configs/facebook";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import themes from "../../../styles/themes";

WebBrowser.maybeCompleteAuthSession();
const authFirebase = getAuth();
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const [secury, setSecury] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [requestGoogle, resonseGoogle, GoogleLogin] =
    Google.useIdTokenAuthRequest({
      clientId: GOOGLE_ID,
    });

  const [requestFacebook, responseFacebook, FacebookLogin] =
    Facebook.useAuthRequest({
      responseType: ResponseType.Token,
      clientId: FACEBOOK_ID,
    });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(
        authFirebase,
        value.email,
        value.password
      );
    } catch (error: any) {
      console.log(error);
      error = erroLogs(error.code);
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    if (resonseGoogle?.type === "success") {
      const { id_token } = resonseGoogle?.params;
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      provider.addScope("https://www.googleapis.com/auth/firebase");
      const credencial = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credencial)
        .then(async (result) => {
          const prevUser = auth.currentUser;
          const user = result.user as UserResponse;
          if (prevUser) {
            updateProfile(prevUser, {
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
            sendEmailVerification(prevUser);
          }
          if (!(await queryByEmail(user.email))) {
            await setDoc(doc(db, `users/${String(prevUser?.uid)}`), {
              id: prevUser?.uid,
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              grupos: [],
            });
          }
        })
        .catch((error: any) => {
          error = erroLogs(error.code);
          setErrorMessage(error);
        });
    }
  }, [resonseGoogle]);

  useEffect(() => {
    if (responseFacebook?.type === "success") {
      const { access_token } = responseFacebook.params;
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      provider.addScope("email");
      provider.addScope("public_profile");
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .then(async (result) => {
          const prevUser = auth.currentUser;
          const user = result.user as UserResponse;
          if (prevUser) {
            updateProfile(prevUser, {
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
            sendEmailVerification(prevUser);
          }
          if (!(await queryByEmail(user.email))) {
            await setDoc(doc(db, `users/${String(prevUser?.uid)}`), {
              id: prevUser?.uid,
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              grupos: [],
            });
          }
          return setErrorMessage("Verifique seu email");
        })
        .catch((error: any) => {
          error = erroLogs(error.code);
          setErrorMessage(error);
        });
    }
  }, [responseFacebook]);

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <Container>
      <ImageBackGround
        source={{
          uri: logo,
        }}
      />
      <LoginComponent>
        <LoginText>Login</LoginText>
        {errorMessage ? <ErroLog>{errorMessage}</ErroLog> : null}
        <LeyoutLogin>
          <EmailInputView>
            <EmailInputText
              onChangeText={(text) => setValue({ ...value, email: text })}
              placeholderTextColor={themes.COLORS.GRAY4}
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Email"
              value={value.email}
              autoCorrect={false}
            />
          </EmailInputView>
          <PasswordInputView>
            <PasswordInputText
              onChangeText={(text) => setValue({ ...value, password: text })}
              placeholderTextColor={themes.COLORS.GRAY4}
              underlineColorAndroid="transparent"
              secureTextEntry={secury}
              value={value.password}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <SeePassword onPress={() => setSecury(!secury)}>
              <Ionicons
                size={25}
                color="white"
                name={secury ? "eye" : "eye-off"}
              />
            </SeePassword>
          </PasswordInputView>
          <ForguetPassWordView>
            <ForguetPassWordText>Forget the password?</ForguetPassWordText>
          </ForguetPassWordView>
          <ButtonLoginView onPress={signIn}>
            <ButtonLoginText>Sign In</ButtonLoginText>
          </ButtonLoginView>
          <ModalsAnotherLogin>
            <TextCreateAccount>
              Choose one of the ways below to sign in if you don't have an
              account
            </TextCreateAccount>
            <ButtonAccount onPress={handleSignUp}>
              <Entypo name="new" size={30} color="white" />
              <ButtonText>Sign Up</ButtonText>
            </ButtonAccount>
            <ButtonAccount
              onPress={() => {
                GoogleLogin();
              }}
            >
              <AntDesign name="google" size={30} color="white" />
              <ButtonText>Google</ButtonText>
            </ButtonAccount>
            <ButtonAccount
              onPress={() => {
                FacebookLogin();
              }}
            >
              <AntDesign name="facebook-square" size={30} color="white" />
              <ButtonText>FaceBook</ButtonText>
            </ButtonAccount>
          </ModalsAnotherLogin>
        </LeyoutLogin>
      </LoginComponent>
    </Container>
  );
};
export { SignIn };
