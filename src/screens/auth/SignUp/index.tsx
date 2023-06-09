import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { logo } from "../../../styles/image.json";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  BackGroundLogo,
  Container,
  InputValues,
  PasswordTextError,
  RegisterLeyout,
  ShowPassword,
  ShowPasswordInput,
  ShowPasswordText,
  SignUpButtonText,
  SignUpButtonView,
  TextRegister,
} from "./style";
import { db } from "../../../configs/firebase";
import { avatar } from "../../../styles/image.json";
import { erroLogs } from "../../../utils/errors";
import themes from "../../../styles/themes";
import { Ionicons } from "@expo/vector-icons";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [secury, setSecure] = useState(true);
  const [passwordErroStyle, setPasswordErroStyle] = useState(false);
  const auth = getAuth();
  const [passwordMessageErro, setPasswordMessageErro] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: password,
  });
  async function handleRegister() {
    setPasswordErroStyle(false);
    setErrorMessage("");
    if (password !== confirmPassword) {
      setPasswordMessageErro("Passwords do not match");
      setPasswordErroStyle(true);
      return;
    }
    if (value.name === "" || value.email === "" || value.password === "") {
      setErrorMessage("All fields are mandatory.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(async () => {
          const prevUser = auth.currentUser;
          const usersRef = doc(db, "users", String(prevUser?.uid));
          if (prevUser) {
            updateProfile(prevUser, {
              displayName: value.name,
              photoURL: avatar,
            });
            sendEmailVerification(prevUser);
          }
          await setDoc(usersRef, {
            id: String(prevUser?.uid),
            name: value.name,
            email: value.email,
            avatar: avatar,
            grupos: [],
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } catch (error: any) {
      error = erroLogs(error.code);
      setErrorMessage(error);
    }
  }
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <BackGroundLogo source={{ uri: logo }} />
      <RegisterLeyout>
        <TextRegister>Sing Up</TextRegister>
        <InputValues
          placeholder="Email"
          placeholderTextColor={themes.COLORS.GRAY4}
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <InputValues
          value={value.name}
          placeholder="Name"
          placeholderTextColor={themes.COLORS.GRAY4}
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          onChangeText={(text) => setValue({ ...value, name: text })}
        />

        <ShowPassword>
          <ShowPasswordInput onPress={() => setSecure(!secury)}>
            <ShowPasswordText>
              {secury ? "Show Password" : "Hidden password"}
            </ShowPasswordText>
          </ShowPasswordInput>
          <Ionicons size={25} color="white" name={secury ? "eye" : "eye-off"} />
        </ShowPassword>
        <InputValues
          value={password}
          placeholder="Password"
          placeholderTextColor={themes.COLORS.GRAY4}
          underlineColorAndroid="transparent"
          secureTextEntry={secury}
          onChangeText={(text) => {
            setPassword(text), setValue({ ...value, password: text });
          }}
        />
        <InputValues
          value={confirmPassword}
          placeholder="Repeat password"
          underlineColorAndroid="transparent"
          secureTextEntry={secury}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={themes.COLORS.GRAY4}
        />
        {passwordErroStyle ? (
          <PasswordTextError>{passwordMessageErro}</PasswordTextError>
        ) : null}
        {errorMessage ? (
          <PasswordTextError>{errorMessage}</PasswordTextError>
        ) : null}

        <SignUpButtonView>
          <SignUpButtonText onPress={handleRegister}>Sing Up</SignUpButtonText>
        </SignUpButtonView>
      </RegisterLeyout>
      {/* <HaveAccountView>
        <HaveAccountInput>
          <HaveAccountText>Sing In</HaveAccountText>
        </HaveAccountInput>
      </HaveAccountView> */}
    </Container>
  );
};
export { SignUp };
