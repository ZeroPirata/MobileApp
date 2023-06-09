import { View, Text, RefreshControl, Alert, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native"
import { limitToLast, off, onValue, orderByChild, push, query, ref, remove, update } from "firebase/database";
import { collection, doc, getDoc, getDocs, query as Query, updateDoc, where } from "firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { IPost } from "../../../interfaces/PostInterface";
import { database, db } from "../../../configs/firebase";
import { Picker } from "@react-native-picker/picker";
import { PostView } from "../../../components";
import { AntDesign } from "@expo/vector-icons";
import themes from "../../../styles/themes";
import { Container } from "./style"

const { Item } = Picker;

const Tab = createBottomTabNavigator();

interface IMembros {
    key: string, id: string; role: string;
}

interface TabBarIconProps {
    focused: boolean;
}

const GrupoHomeScreen = ({ params }: SeeGrupos) => {
    const { id } = params.Home
    const [postInDataBase, setPostInDataBase] = useState<IPost[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        const refDataBase = ref(database, `grupos/${id}/posts`)
        const queryDate = query(refDataBase, orderByChild("data"),)
        const returnValues = onValue(queryDate, resData => {
            if (resData.exists()) {
                const data = resData.val();
                const PostList = Object.keys(data)
                    .map((key) => {
                        const post = data[key];
                        return { id: key, ...post, };
                    })
                    .sort((a, b) => b.data - a.data);
                setPostInDataBase(PostList);
            }
        })
        return () => { off(refDataBase, "child_changed", returnValues) }
    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    return (
        <Container >
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {postInDataBase && postInDataBase.map((items, index) => {
                    return (
                        <PostView grupo={{ id: id, validacao: true }} id={items.id} key={items.id + index} user={items.user} body={items.body} images={items?.images} arquivos={items.arquivos} data={items.data} />
                    );
                })}
            </ScrollView>
        </Container>
    );
};
const GrupoMembrosScreen = ({ params }: SeeGrupos) => {
    const navigate = useNavigation()
    const { user } = useAuthentication()
    const { id, image, nome } = params.Home
    const [select, _] = useState({ adm: "Administrador", mem: "Membro" })
    const [value, setValue] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [verify, setVerify] = useState(false)
    const [addUser, setAddUser] = useState(false)
    const [emailUser, setEmailUser] = useState("")
    const [listMembrosAtt, setListMembrosAtt] = useState([] as any[]);
    const [listMembros, setListMembros] = useState([] as IMembros[]);
    const [openedMenu, setOpenedMenu] = useState(Array(listMembrosAtt?.length).fill(false));


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setListMembros([])
        setListMembrosAtt([])
        const refDataBase = ref(database, `grupos/${id}/membros`);
        const returnValues = onValue(refDataBase, (resData) => {
            if (resData.exists()) {
                const data = resData.val();
                const list = Object.keys(data).map((key) => {
                    const post = data[key];
                    return { id: post.id, role: post.role, key: key };
                });
                setListMembros(list);
            }
        });
        setTimeout(() => {
            setRefreshing(false); off(refDataBase, "value", returnValues);
        }, 1000);
    }, [id]);


    const handleDeleteGrupo = async (settings: any) => {
        const refDatabase = doc(collection(db, "users"), settings.id);
        const querySnapshot = await getDoc(refDatabase)
        const userData = querySnapshot.data();
        const gruposArray = userData?.grupos || [];
        const updatedGruposArray = gruposArray.filter((item: any) => item.id !== id);
        await updateDoc(refDatabase, { grupos: updatedGruposArray });
    }

    const handleRemoveUser = async (settings: any) => {
        Alert.alert("Remoção", user?.uid === settings.id ? `Deseja sair do grupo ?` : `Remover: ${settings.nome}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remover",
                    onPress: async () => {
                        user?.uid === settings.id ?
                            await remove(ref(database, `grupos/${id}/membros/${settings.key}`)).then(() => {
                                handleDeleteGrupo(settings)
                                navigate.navigate("TabsRoutes")
                            }) :
                            remove(ref(database, `grupos/${id}/membros/${settings.key}`)).then(() => {
                                handleDeleteGrupo(settings)
                            })
                    }
                },
            ])
    }

    const handleEditUserRole = (key: string, index: any) => {
        update(ref(database, `grupos/${id}/membros/${key}`), { role: value })
        handleSelectedUser(index)
    }
    const handleSelectedUser = (index: number) => {
        const updatedMenuState = [...openedMenu];
        updatedMenuState[index] = !updatedMenuState[index];
        setOpenedMenu(updatedMenuState)
    }

    const EnviarSolicataoParaEntrarNoGrupo = async () => {
        const referenceCloudFiresStorage = collection(db, "users");
        const queryBuilder = Query(referenceCloudFiresStorage, where("email", "==", emailUser));
        const getUserts = await getDocs(queryBuilder);
        getUserts.forEach((i) => {
            const refRealTime = ref(database, `user/${i.data().id}/alerts`)
            push(refRealTime, {
                type: "grupo",
                date: Math.floor(Date.now() / 1000),
                id: id,
                name: nome,
                avatar: image.url,
            });
        })
        setAddUser(false)
    };

    useEffect(() => {
        if (user && listMembrosAtt.some((membro) => membro.id === user.uid && membro.role === "Dono" || membro.role === "Administrador")) {
            setVerify(true);
        } else {
            setVerify(false);
        }
    }, [user, listMembrosAtt]);

    useEffect(() => {
        const refDataBase = ref(database, `grupos/${id}/membros`);
        onValue(refDataBase, (resData) => {
            if (resData.exists()) {
                const data = resData.val();
                const newList = Object.keys(data)
                    .map((key) => {
                        const post = data[key];
                        return { id: post.id, role: post.role, key: key };
                    })
                    .filter((member) => !listMembros.find((m) => m.id === member.id));
                setListMembros((prevList) => [...prevList, ...newList]);
            }
        });
    }, []);

    useEffect(() => {
        listMembros.map((ids) => {
            const refDataBase = doc(db, "users", ids.id);
            getDoc(refDataBase).then((res) => {
                if (res.exists()) {
                    const newUser = { key: ids.key, role: ids.role, id: ids.id, nome: res.data().name, avatar: res.data().avatar };
                    if (!listMembrosAtt.find((users) => users.id === newUser.id)) {
                        setListMembrosAtt((oldList) => [...oldList, newUser]);
                    }
                }
            });
        });
    }, [listMembros]);

    return (
        <Container>
            <ScrollView style={{ height: "100%" }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {listMembrosAtt && listMembrosAtt.map((users, index) => {
                    return (
                        <View style={styles.viewRenderUser} key={index}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <View>
                                    <Image source={{ uri: users.avatar }} style={{ height: 65, width: 65 }} />
                                </View>
                                <View style={styles.viewRenderName}>
                                    <Text style={{ color: "white", fontSize: 20 }}>{users.nome}</Text>
                                    <Text style={{ color: "white", fontSize: 20 }}>{users.role}</Text>
                                </View>
                                <View style={styles.viewRenderButton} >
                                    {verify ? (
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                                            <TouchableOpacity onPress={() => handleSelectedUser(index)}>
                                                <Entypo name="edit" size={24} color="green" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleRemoveUser(users)}>
                                                <Entypo name="remove-user" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    ) : user?.uid === users.id ? <TouchableOpacity onPress={() => handleRemoveUser(users)}>
                                        <Entypo name="remove-user" size={24} color="red" />
                                    </TouchableOpacity> : null}
                                </View>
                            </View>
                            {
                                openedMenu[index] ? (
                                    <View style={{ width: "100%", marginTop: 5, marginBottom: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                        <Picker style={styles.picker} itemStyle={styles.item} onValueChange={(newRole, itemIndex) => setValue(newRole)} selectedValue={value} >
                                            <Item key={select.adm} value={"Administrador"} label={select.adm} />
                                            <Item key={select.mem} value={"Membro"} label={select.mem} />
                                        </Picker>
                                        <TouchableOpacity onPress={() => handleEditUserRole(users.key, index)}>
                                            <Entypo name="save" size={35} color="green" />
                                        </TouchableOpacity>
                                    </View>
                                ) :
                                    null
                            }
                        </View>
                    )
                })}
            </ScrollView>
            {
                addUser ?
                    <View style={{ position: "absolute", top: "90%", left: "5%", backgroundColor: themes.COLORS.MAINBorder, width: 270, height: 50, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                        <TextInput style={{ color: "white" }} value={emailUser} onChangeText={(text) => setEmailUser(text)} placeholder="Digite o Nome/Email" />
                    </View> :
                    null
            }
            {
                verify ? (
                    <View style={{ position: "absolute", top: "90%", left: "80%", backgroundColor: themes.COLORS.MAINBorder, width: 50, height: 50, borderRadius: 100, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity onLongPress={() => setAddUser(!addUser)} onPress={() => { !addUser ? setAddUser(!addUser) : EnviarSolicataoParaEntrarNoGrupo() }} >
                            <AntDesign name="check" size={40} color={themes.COLORS.MAINChat2} />
                        </TouchableOpacity>
                    </View>
                ) :
                    null
            }

        </Container >
    );
};
const GrupoRakingScreen = ({ params }: SeeGrupos) => {
    const { id } = params.Home
    const [postInDataBase, setPostInDataBase] = useState<IPost[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const refDataBase = ref(database, `grupos/${id}/posts`);
        const queryLikes = query(refDataBase, orderByChild("likes"), limitToLast(10));
        const returnValues = onValue(queryLikes, (resData) => {
            if (resData.exists()) {
                const data = resData.val();
                const postList = Object.keys(data)
                    .map((key) => {
                        const post = data[key];
                        return { id: key, ...post };
                    })
                    .sort((a, b) => {
                        const likeA = a.likes ? Object.keys(a.likes).length : 0;
                        const likeB = b.likes ? Object.keys(b.likes).length : 0;
                        return likeB - likeA;
                    });
                setPostInDataBase(postList);
            }
        });
        return () => { off(refDataBase, "child_changed", returnValues) };
    }, []);
    return (
        <Container>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {postInDataBase && postInDataBase.map((items, index) => {
                    return (
                        <PostView grupo={{ id: id, validacao: true }} id={items.id} key={items.id + index} user={items.user} body={items.body} images={items?.images} arquivos={items.arquivos} data={items.data} />
                    );
                })}
            </ScrollView>
        </Container>
    );
};


export const SeeGrupo = () => {
    const route = useRoute<SeeGrupos>();
    const navigate = useNavigation()
    const handleNavigate = () => {
        navigate.navigate("TabsRoutes")
    }
    const renderTabBarIcon = (
        name: keyof typeof AntDesign.glyphMap,
        focused: boolean,
        nameScreen: string
    ) => (
        <View style={[styles.view, focused && styles.focus]}>
            <AntDesign name={name} size={20} color={focused ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3 : themes.COLORS.GRAY4} />
            <Text style={{ color: focused ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3 : themes.COLORS.GRAY4 }}>
                {nameScreen}
            </Text>
        </View>
    );
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: themes.COLORS.GRAY6,
                tabBarActiveTintColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
                headerStyle: styles.headerRight,
                headerTitleStyle: styles.headerTitle,
                headerRightContainerStyle: styles.headerRight,
                tabBarStyle: {
                    height: 50, backgroundColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY3,
                },
                tabBarIconStyle: {
                    width: "100%",
                },

                headerRight: () => (
                    <TouchableOpacity onPress={handleNavigate}>
                        <MaterialIcons style={styles.headerTitle} name="arrow-back-ios" size={24} color="black" />
                    </TouchableOpacity>
                ),
            }}>
            <Tab.Screen name="Home" options={{ tabBarIcon: ({ focused }: TabBarIconProps) => renderTabBarIcon("home", focused, route.params.Home.nome) }}>
                {() => <GrupoHomeScreen params={{ ...route.params }} key={route.key} name={route.name} />}
            </Tab.Screen>
            <Tab.Screen name="Membros" options={{ tabBarIcon: ({ focused }: TabBarIconProps) => renderTabBarIcon("addusergroup", focused, "Membros") }}>
                {() => <GrupoMembrosScreen params={{ ...route.params }} key={route.key} name={route.name} />}
            </Tab.Screen>
            <Tab.Screen name="Rank" options={{ tabBarIcon: ({ focused }: TabBarIconProps) => renderTabBarIcon("dashboard", focused, "Ranking") }}>
                {() => <GrupoRakingScreen params={{ ...route.params }} key={route.key} name={route.name} />}
            </Tab.Screen>
        </Tab.Navigator >
    );
};

const styles = StyleSheet.create({
    headerRight: {
        borderBottomWidth: 3,
        borderBottomColor: themes.COLORS.MAINLineCross,
        backgroundColor: themes.COLORS.MAIN
    },
    headerTitle: {
        marginRight: 15,
        fontSize: RFValue(25),
        fontWeight: 'bold',
        color: 'white',
    },
    headerRightTitle: {
        marginRight: 15,
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: 'white',
    },
    view: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    focus: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1.5,
        borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
        height: "100%",
    },
    viewRenderUser: {
        display: "flex",
        marginRight: 10,
        marginBottom: 25,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    viewRenderName: {
        width: "50%",
    },
    viewRenderButton: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        width: "30%",
    },
    picker: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 0,
        width: "50%"
    },
    item: {
        fontSize: 16,
        color: 'black',
    },
})

export default SeeGrupo;