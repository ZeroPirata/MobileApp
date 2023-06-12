import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import { Container, ContainerListRender, IconsRender, ImageRender, ItensRender, Texts, TextsDate, TypeView } from './style'
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { database, db } from '../../configs/firebase';
import { useAuthentication } from '../../hooks/useAuthentication';
import { off, onValue, push, ref, remove } from 'firebase/database';
import { useState } from 'react';
import { ModalView } from '../ModalProfile';

interface ListRender {
    avatar?: string,
    data?: string,
    idRequest?: string,
    name?: string,
    solicitador?: string,
    type: string,
    email?: string,
}

interface RenderNotificationProps {
    list: ListRender[]
    open: () => void
}

export const RenderNotifications = ({ list, open }: RenderNotificationProps) => {
    const { user } = useAuthentication()

    const AcceptGrupRequest = async (idGrup: string, request: string) => {
        const refRealTime = ref(database, `grupos/${idGrup}/membros`);
        push(refRealTime, {
            id: user?.uid,
            role: "membro"
        });
        const collect = collection(db, "users");
        const queryOne = query(collect, where("id", "==", user?.uid));
        const InsertGrupRequest = await getDocs(queryOne);
        if (InsertGrupRequest) {
            const refCloudFireStore = doc(db, "users", InsertGrupRequest.docs[0].id);
            await updateDoc(refCloudFireStore, {
                grupos: arrayUnion({
                    id: idGrup,
                }),
            });
        }
        RecuseRequest(request);
    };
    const AcceptFrindRequest = async (idUser: string, request: string) => {
        const getIdReference = collection(db, "users");
        const queryOne = query(getIdReference, where("id", "==", user?.uid));
        const queryTwo = query(getIdReference, where("id", "==", idUser));
        const insertLoggedUser = await getDocs(queryOne);
        const InsertFriendRequest = await getDocs(queryTwo);
        if (insertLoggedUser) {
            const refCloudFireStore = doc(db, "users", insertLoggedUser.docs[0].id);
            await updateDoc(refCloudFireStore, {
                friends: arrayUnion({
                    id: idUser,
                }),
            });
        }
        if (InsertFriendRequest) {
            const refCloudFireStore = doc(db, "users", InsertFriendRequest.docs[0].id);
            await updateDoc(refCloudFireStore, {
                friends: arrayUnion({
                    id: user?.uid,
                }),
            });
            RecuseRequest(request);
        }
    };

    const RecuseRequest = async (request: string) => {
        await remove(ref(database, `user/${user?.uid}/alerts/${request}`));
    };

    const [modalOpenMap, setModalOpenMap] = useState<boolean>();
    const [selectedItemId, setSelectedItemId] = useState<{ id: string, type: string, request: string, } | null>();

    const handleOpenMenuView = (index: number) => {
        if (modalOpenMap) {
            setSelectedItemId(null)
            setModalOpenMap(false);
        }
        const item = list[index];
        const userId = item.solicitador;
        const request = item.idRequest;
        const typeSelect = item.type
        setSelectedItemId({
            id: String(userId),
            type: typeSelect,
            request: String(request)
        });
        setModalOpenMap(true);
    };

    const handleCloseModal = () => {
        setSelectedItemId(null)
        setModalOpenMap(false);
    };

    return (
        <Container>
            {modalOpenMap && selectedItemId && (
                <ModalView
                    item={{ id: String(selectedItemId?.id), type: String(selectedItemId?.type), request: String(selectedItemId.request) }}
                    open={() => selectedItemId?.id && handleCloseModal()}
                    accept={() => selectedItemId?.type === "grupo" ? AcceptGrupRequest(selectedItemId.id, selectedItemId.request) : AcceptFrindRequest(selectedItemId.id, selectedItemId.request)}
                    recuse={() => RecuseRequest(selectedItemId.request)}
                />
            )}
            <ScrollView>
                {list.map((item, index) => {
                    const date = new Date(Number(item.data) * 1000);
                    const localeDate = date.toLocaleDateString();
                    const localeHours = date.toLocaleTimeString();
                    return (
                        <ContainerListRender key={item.idRequest}>
                            <ImageRender source={{ uri: item.avatar }} />
                            <ItensRender>
                                {item.type === "grupo" ? (
                                    <TypeView>
                                        <FontAwesome name="group" size={24} color="white" />
                                        <Text style={{ color: "white" }}>{" "}Grupo</Text>
                                    </TypeView>
                                ) : (
                                    <TypeView>
                                        <Ionicons name="person-add" size={24} color="white" />
                                        <Text style={{ color: "white" }}>{" "}Amigo</Text>
                                    </TypeView>
                                )}
                                <Texts>{item.name}</Texts>
                                <TextsDate>{localeDate + " " + localeHours}</TextsDate>
                            </ItensRender>
                            <IconsRender>
                                <TouchableOpacity onPress={() => handleOpenMenuView(index)}>
                                    <Ionicons name="eye-outline" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        item.type === "grupo"
                                            ? AcceptGrupRequest(String(item.solicitador), String(item.idRequest))
                                            : AcceptFrindRequest(String(item.solicitador), String(item.idRequest));
                                    }}
                                >
                                    <AntDesign name="checksquareo" size={24} color="green" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { RecuseRequest(String(item.idRequest)) }}>
                                    <AntDesign name="closesquareo" size={24} color="red" />
                                </TouchableOpacity>
                            </IconsRender>
                        </ContainerListRender>
                    );
                })}
            </ScrollView>
        </Container>
    );
}
