import { ButtonCancel, ButtonConfirm, ButtonStld, ButtonText, Container, Modal, Text, TextInputStld, TextsInputs } from './style'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthentication } from '../../hooks/useAuthentication'
import { ScrollView } from 'react-native-gesture-handler'
import themes from '../../styles/themes'
import React, { useState } from 'react'

interface ILogin {
    necessary: (verify: boolean) => void,
    acceptLogin: (verify: boolean) => void
}

export const VerifyLogin = ({ necessary, acceptLogin }: ILogin) => {
    const { user } = useAuthentication()
    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secury, setSecury] = useState(true)

    const handleVerifyLogin = () => {
        if (user?.email !== email) return
        signInWithEmailAndPassword(auth, email, password).then(() => {
            acceptLogin(true)
            necessary(false)
        }).catch((err) => console.log(err))
    }
    return (
        <Container>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                <Modal>
                    <Text>Verify Account</Text>
                    <TextsInputs>
                        <TextInputStld
                            value={email}
                            placeholder="E-mail"
                            placeholderTextColor={themes.COLORS.GRAY4}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                        />
                        <TextInputStld
                            value={password}
                            style={{ color: "white" }}
                            placeholder="password"
                            placeholderTextColor={themes.COLORS.GRAY4}
                            underlineColorAndroid="transparent"
                            secureTextEntry={secury}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                        />
                        <ButtonStld>
                            <ButtonConfirm onPress={handleVerifyLogin}>
                                <ButtonText>Confirmar</ButtonText>
                            </ButtonConfirm>
                            <ButtonCancel onPress={() => necessary(false)}>
                                <ButtonText>Cancelar</ButtonText>
                            </ButtonCancel>
                        </ButtonStld>
                    </TextsInputs>
                </Modal>
            </ScrollView >
        </Container >
    )
}