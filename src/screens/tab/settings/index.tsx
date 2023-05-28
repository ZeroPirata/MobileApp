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
const Settings = () => {

  const [deleteAccount, setDeleteAccount] = useState(false)

  const auth = getAuth();
  const userFireBase = auth.currentUser

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
    updateEmail(userFireBase, newEmail).then(() => console.log("Email atualizado")).catch((err) => console.log(err))
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


  const handleSecuryChangeState = () => {
    setSecure(!secury)
  }

  const handleDeleteAccount = () => {
    if (!userFireBase) return
    Alert.alert("Delete Account", `${auth.currentUser?.displayName}, you wanna delete your account?`, [
      {
        text: "Delete", onPress: () => {
          deleteUser(userFireBase).then(() => console.log("Deleteado com sucesso")).catch((err) => console.log(err))
        }, style: "destructive"
      },
      {
        text: "Cancel", style: "cancel"
      }
    ])
  }

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
                  placeholderTextColor={themes.COLORS.GRAY4}
                  underlineColorAndroid="transparent"
                  secureTextEntry={secury}
                  onChangeText={(text) => {
                    setPassword(text)
                  }}
                />
                <TextInputStld
                  value={confirmPassword}
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
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    setOldEmail(text)
                  }}
                />
                <TextInputStld
                  value={newEmail}
                  placeholder="Your new email"
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
