import React, { useEffect, useState } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { uuidv4 } from "@firebase/util";

import { Btn } from "../../../components/button/index";
import { Input } from "../../../components/input/index";

import * as SignInContent from "./style";
import themes from "../../../styles/themes";
import { db } from "../../../configs/firebase";
import { queryByEmail } from "../../../utils/querys";
import { erroLogs } from "../../../utils/errors";

import { GOOGLE_ID } from "../../../configs/google";
import { FACEBOOK_ID } from "../../../configs/facebook";

WebBrowser.maybeCompleteAuthSession();
const authFirebase = getAuth();
const SignIn: React.FC = () => {
  const navigation = useNavigation();
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
          if (!(await queryByEmail(user.email))) {
            await setDoc(doc(db, `users/${String(prevUser?.uid)}`), {
              id: prevUser?.uid,
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
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
          if (!(await queryByEmail(user.email))) {
            await setDoc(doc(db, `users/${String(prevUser?.uid)}`), {
              id: prevUser?.uid,
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
            });
          }
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
    <SignInContent.Container>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SignInContent.ContainerHeader>
            <SignInContent.TitleHeader>Wellcome to</SignInContent.TitleHeader>
            <SignInContent.NameApp>G-Witter</SignInContent.NameApp>
            <SignInContent.DescriptionTextHeader>
              If you want, you can login with one of the social networks below
            </SignInContent.DescriptionTextHeader>
            <SignInContent.ButtonsLoginSocial>
              <Btn
                IconName="google"
                IconSize={RFValue(25)}
                IconColor={themes.COLORS.WHITE_100}
                title="Google"
                fontColor={themes.COLORS.WHITE_100}
                fontSize={RFValue(25)}
                disabled={!requestGoogle}
                style={{
                  backgroundColor: themes.COLORS.GOOGLE.GREEN,
                  borderColor: themes.COLORS.WHITE_100,
                  justifyContent: "space-around",
                  borderWidth: RFValue(3),
                  width: RFValue(150),
                  height: RFValue(75),
                }}
                onPress={() => {
                  GoogleLogin();
                }}
              />
              <Btn
                IconName="facebook"
                IconSize={RFValue(25)}
                IconColor={themes.COLORS.WHITE}
                title="Facebook"
                fontSize={RFValue(25)}
                fontColor={themes.COLORS.WHITE}
                disabled={!requestFacebook}
                style={{
                  borderColor: themes.COLORS.WHITE,
                  backgroundColor: themes.COLORS.BLUE4,
                  width: RFValue(150),
                  height: RFValue(75),
                  borderWidth: RFValue(3),
                }}
                onPress={() => {
                  FacebookLogin();
                }}
              />
            </SignInContent.ButtonsLoginSocial>
          </SignInContent.ContainerHeader>
          <SignInContent.ContainerBody>
            {errorMessage ? (
              <SignInContent.TextError>{errorMessage}</SignInContent.TextError>
            ) : null}
            <Input
              LeftIcon
              iconSize={20}
              iconName="mail"
              width={325}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
              placeholder={"E-mail"}
              secureTextEntry={false}
            />
            <Input
              LeftIcon
              RightIcon
              iconSize={20}
              placeholder={"Password"}
              iconName="lock-closed-outline"
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              width={325}
              marginTop={10}
            />
            <Btn
              title="Sign In"
              variant="SmallButtonGoldBorded"
              fontColor={themes.COLORS.HEXTECH_METAL_GOLD.GOLD3}
              style={{
                margin: 10,
                borderWidth: 3,
                borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD4,
                backgroundColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY4,
              }}
              onPress={signIn}
            />
          </SignInContent.ContainerBody>
          <SignInContent.ContainerFooter>
            <SignInContent.FooterDescription1>
              Don't have a account?
            </SignInContent.FooterDescription1>
            <SignInContent.ButtonSignUp onPress={handleSignUp}>
              <SignInContent.FooterDescription2>
                Sign Up!
              </SignInContent.FooterDescription2>
            </SignInContent.ButtonSignUp>
          </SignInContent.ContainerFooter>
        </ScrollView>
      </SafeAreaView>
    </SignInContent.Container>
  );
};

export { SignIn };
