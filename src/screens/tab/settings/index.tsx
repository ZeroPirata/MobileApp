import { getAuth, signOut, updatePassword, updateEmail, deleteUser, signInAnonymously, signInWithCustomToken } from "firebase/auth";
import { Alert, Button } from "react-native";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { ButtonCancel, ButtonChangeEmail, ButtonConfirm, ButtonLogoutText, ButtonLogoutView, ButtonText, Container, DeleteAccountStld, DeleteAccountTextStld, TextInputStld, TextsInputs } from "./style";
import { useState, useEffect } from "react";
import themes from "../../../styles/themes";
import { authFirebase } from "../../../configs/firebase";
import { VerifyLogin } from '../../../components/index'
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
const Settings = () => {

  const auth = getAuth();
  const userFireBase = auth.currentUser

  const navigation = useNavigation()

  const [login, setLogin] = useState(false)
  const handleLoginNecessary = () => {
    setLogin(!login)
  }

  const [changePassword, setChangePassword] = useState({
    render: false,
    onPress: false
  })
  const [secury, setSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const handleChangePassword = () => {
    if (password === confirmPassword && userFireBase) {
      updatePassword(userFireBase, password).then(() => {
        setPassword("")
        setConfirmPassword("")
        setChangePassword({
          onPress: false,
          render: false
        })
        setverifyLoggin(false)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const [changeEmail, setChangeEmail] = useState({
    render: false,
    onPress: false
  })
  const [newEmail, setNewEmail] = useState("")
  const [oldEmail, setOldEmail] = useState("")
  const handleChangeEmail = () => {
    if (oldEmail !== userFireBase?.email) {
      console.log("Email não esta correto")
      return
    }
    updateEmail(userFireBase, newEmail).then(() => {
      setChangeEmail({
        onPress: false,
        render: false
      })
      setverifyLoggin(false)
    }).catch((err) => console.log(err))
  }

  const [verifyLoggin, setverifyLoggin] = useState(false)

  const handleSettingsModify = () => {
    handleLoginNecessary()
  }

  useEffect(() => {
    if (verifyLoggin === true && changeEmail.onPress === true) {
      setChangeEmail({ onPress: false, render: true })
    }
  }, [changeEmail, verifyLoggin])

  useEffect(() => {
    if (verifyLoggin === true && changePassword.onPress === true) {
      setChangePassword({ onPress: false, render: true })
    }
  }, [changePassword, verifyLoggin])


  const [deleteAccount, setDeleteAcccount] = useState(false)
  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", `${auth.currentUser?.displayName}, you wanna delete your account?`, [
      {
        text: "Delete", onPress: () => {
          setLogin(true)
          setDeleteAcccount(true)
        }, style: "destructive"
      },
      {
        text: "Cancel", style: "cancel"
      }
    ])
  }

  useEffect(() => {
    if (!userFireBase) return
    if (deleteAccount && verifyLoggin) {
      deleteUser(userFireBase).then(() => navigation.navigate("SignIn")).catch((err) => console.log(err))
    }
  }, [deleteAccount, verifyLoggin])


  return (
    <Container>
      {login ? <VerifyLogin necessary={handleLoginNecessary} acceptLogin={setverifyLoggin} /> : (
        <>
          {changePassword.render ?
            (
              <TextsInputs>
                <TextInputStld
                  value={password}
                  placeholder="New password"
                  style={{ color: "white" }}
                  placeholderTextColor={themes.COLORS.GRAY4}
                  underlineColorAndroid="transparent"
                  secureTextEntry={secury}
                  onChangeText={(text) => {
                    setPassword(text)
                  }}
                />
                <TextInputStld
                  value={confirmPassword}
                  style={{ color: "white" }}
                  placeholder="Repeat new password"
                  underlineColorAndroid="transparent"
                  secureTextEntry={secury}
                  onChangeText={(text) => setConfirmPassword(text)}
                  placeholderTextColor={themes.COLORS.GRAY4}
                />
                <ButtonConfirm onPress={handleChangePassword}>
                  <ButtonText>Confirmar</ButtonText>
                </ButtonConfirm>
                <ButtonCancel onPress={() => setChangePassword({ render: false, onPress: false })}>
                  <ButtonText>Cancelar</ButtonText>
                </ButtonCancel>
              </TextsInputs>
            ) :
            (
              <ButtonChangeEmail onPress={() => { setChangePassword({ render: false, onPress: true }), handleSettingsModify() }}>
                <ButtonText>Change password</ButtonText>
              </ButtonChangeEmail>
            )
          }
          {changeEmail.render ?
            (
              <TextsInputs>
                <TextInputStld
                  value={oldEmail}
                  placeholder="Your actualy email"
                  placeholderTextColor={themes.COLORS.GRAY4}
                  style={{ color: "white" }}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    setOldEmail(text)
                  }}
                />
                <TextInputStld
                  value={newEmail}
                  placeholder="Your new email"
                  style={{ color: "white" }}
                  placeholderTextColor={themes.COLORS.GRAY4}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    setNewEmail(text)
                  }}
                />
                <ButtonConfirm onPress={handleChangeEmail}>
                  <ButtonText>Confirmar</ButtonText>
                </ButtonConfirm>
                <ButtonCancel onPress={() => setChangeEmail({ render: false, onPress: false })}>
                  <ButtonText>Cancelar</ButtonText>
                </ButtonCancel>
              </TextsInputs>
            ) :
            (
              <ButtonChangeEmail onPress={() => { setChangeEmail({ render: false, onPress: true }), handleSettingsModify() }}>
                <ButtonText>Change Email</ButtonText>
              </ButtonChangeEmail >
            )
          }
          <DeleteAccountStld onPress={handleDeleteAccount}>
            <AntDesign name="delete" size={24} color="white" />
            <DeleteAccountTextStld>
              Delete Account
            </DeleteAccountTextStld>
          </DeleteAccountStld>
          <ButtonLogoutView onPress={() => signOut(auth)}>
            <ButtonLogoutText>Logout</ButtonLogoutText>
            <AntDesign name="logout" size={RFValue(30)} color="black" />
          </ButtonLogoutView>
        </>
      )}

    </Container >
  );
};
export { Settings };
