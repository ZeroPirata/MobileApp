import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Container, ContainerSld, DescStld, DescStldPerso, ImageBackground, ImageBackgroundG, ImageProfile, ImageSld, OptionsStld, Rules, RulesStld, TextDesc, TextGrup, TextGrupDesc, TextName, TextUser, } from './style'
import { off, onValue, ref } from 'firebase/database'
import { database, db } from '../../configs/firebase'
import { doc, getDoc } from 'firebase/firestore'
import themes from '../../styles/themes'
import { RFValue } from 'react-native-responsive-fontsize'

interface ModalViewProps {
    accept: () => void,
    recuse: () => void,
    open: (value: boolean) => void,
    item: {
        id: string,
        type: string,
        request: string
    }
}
export const ModalView = ({ open, item, accept, recuse }: ModalViewProps) => {
    const handleCloseProfile = () => {
        open(false);
    };

    const [view, setView] = useState<any>(null);
    const [dono, setDono] = useState<any>(null)

    useEffect(() => {
        if (item.type === 'grupo') {
            const refRealTime = ref(database, `grupos/${item.id}`);
            const returnValue = onValue(refRealTime, (snapShot) => {
                setView(snapShot.val());
                if (snapShot.child('membros').exists()) {
                    const dono = snapShot.child('membros').child('0').val()
                    const refDatabase = doc(db, 'users', String(dono.id));
                    getDoc(refDatabase).then((res) => setDono(res.data()));
                }
            });
            return () => {
                off(refRealTime, 'value', returnValue);
            };
        }
        if (item.type === 'amigos') {
            const refDatabase = doc(db, 'users', String(item.id));
            getDoc(refDatabase).then((res) => setView(res.data()));
        }
    }, [item]);

    const handleAccept = () => {
        accept()
        handleCloseProfile()
    }
    const handleReject = () => {
        accept()
        handleCloseProfile()
    }

    if (!item) {
        return null;
    }
    return (
        <Container>
            <OptionsStld>
                <TouchableOpacity onPress={handleAccept}>
                    <AntDesign name="checksquareo" size={35} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReject}>
                    <AntDesign name="closesquareo" size={35} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCloseProfile}>
                    <Ionicons name="eye-off-outline" size={35} color="white" />
                </TouchableOpacity>
            </OptionsStld>
            {item.type === 'grupo' ? view && (
                <ContainerSld>
                    <ImageSld>
                        <DescStld>
                            <ImageBackgroundG source={{ uri: view.image.url }} />
                            <TextGrup>{view.nome} </TextGrup>
                            <TextGrupDesc>{view.descricao}</TextGrupDesc>
                        </DescStld>
                        {view.regras && (
                            <>
                                <Text style={{ color: themes.COLORS.WHITE, fontSize: RFValue(25) }}>Regras</Text>
                                <RulesStld>
                                    {view && view.regras && view.regras.map((rule: string, index: number) => (
                                        <Rules key={index}>{index + 1} - {rule}</Rules>
                                    ))}
                                </RulesStld>
                            </>
                        )}
                    </ImageSld>
                </ContainerSld>
            ) : null}
            {item.type === 'amigos' ? view && (
                <ContainerSld>
                    <ImageSld>
                        <ImageBackground source={{ uri: view.background.url }} style={{ height: 150, width: "100%", resizeMode: "stretch" }} />
                        <ImageProfile source={{ uri: view.avatar }} style={{ height: 100, width: 100 }} />
                    </ImageSld>
                    <DescStldPerso>
                        <TextName>{view.name}</TextName>
                        <TextUser>@{view.arroba}</TextUser>
                        <TextDesc>{view.descricao}</TextDesc>
                    </DescStldPerso>
                </ContainerSld>
            ) : null}
        </Container>
    );
};