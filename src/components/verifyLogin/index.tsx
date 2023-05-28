import React, { useState } from 'react'
import { ButtonCancel, ButtonConfirm, ButtonStld, ButtonText, Container, Modal, Text, TextInputStld, TextsInputs } from './style'
import themes from '../../styles/themes'
import { useAuthentication } from '../../hooks/useAuthentication'
import { getAuth, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth'
import { ScrollView } from 'react-native-gesture-handler'

interface ILogin {
    necessary: (verify: boolean) => void,
    acceptLogin: (verify: boolean) => void
}

export const VerifyLogin = ({ necessary, acceptLogin }: ILogin) => {
    const { user } = useAuthentication()
    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secury, setSecury] = useState(false)

    const handleVerifyLogin = () => {
        if (user?.email !== email) return
        signInWithEmailAndPassword(auth, email, password)
        acceptLogin(true)
        necessary(false)
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