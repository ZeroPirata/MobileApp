import { Container, GrupoImg, GrupoInfo, GrupoNome, GrupoSettings, GruposListaemStyle, GruposUnitarios } from "./style";
import { InterfaceGrupo, InterfaceGrupoList } from "../../../interfaces/GruposInterface";
import { Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { database, db } from "../../../configs/firebase";
import { useNavigation } from "@react-navigation/native";
import { useState, useCallback, useEffect } from 'react'
import { off, onValue, ref } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";

const Grupos = () => {
  const { user } = useAuthentication()
  const navigate = useNavigation()
  const [_u, setUserInfo] = useState()
  const [idGrups, setIdGrups] = useState([] as InterfaceGrupo[])
  const [gruposListInfo, setGrupoListInfo] = useState([] as InterfaceGrupoList[])
  const [finishLoading, setFinishLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFinishLoading(false)
    setIdGrups([])
    setGrupoListInfo([])
    const refDataBase = doc(db, "users", String(user?.uid))
    getDoc(refDataBase).then((res) => {
      if (res.exists()) {
        setIdGrups(res.data().grupos)
      }
    })
    setTimeout(() => {
      setRefreshing(false);
      setFinishLoading(true)
    }, 1000);
  }, []);

  const GetUserGrupos = useCallback(() => {
    const refDataBase = doc(db, "users", String(user?.uid))
    getDoc(refDataBase).then((res) => {
      if (res.exists()) {
        setIdGrups(res.data().grupos)
      }
    })
    setFinishLoading(true)
  }, [setUserInfo, user])

  const handleRoute = ({ ...item }: InterfaceGrupoList) => {
    navigate.navigate("SeeGrupo", { Home: { ...item } })
  }

  useEffect(() => {
    idGrups.map((ids) => {
      const refDataBase = ref(database, `grupos/${ids.id}`)
      const returnValue = onValue(refDataBase, (res) => {
        const newGrupo = { ...res.val(), ...gruposListInfo, id: ids.id };
        if (!gruposListInfo.find((grupo) => grupo.id === newGrupo.id)) {
          setGrupoListInfo((oldList) => [...oldList, newGrupo]);
        }
      })
      return () => {
        off(refDataBase, "child_changed", returnValue)
      }
    })
  }, [finishLoading === true, idGrups.length !== 0])

  useEffect(() => { GetUserGrupos() }, [user])
  return (
    <Container>
      <Text
        style={{ fontSize: 30, color: "white", textAlign: "center", paddingTop: 15 }}
      >
        Listagem de Grupos
      </Text>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <GruposListaemStyle>
          {gruposListInfo && gruposListInfo.map((gps, index) => {
            return (
              <GruposUnitarios key={index}>
                <GrupoImg source={
                  gps.image.url !== undefined && gps.image ?
                    { uri: gps.image.url } : { uri: "" }}
                />
                <GrupoInfo>
                  <GrupoNome>{gps.nome}</GrupoNome>
                </GrupoInfo>
                <GrupoSettings>
                  <TouchableOpacity onPress={() => handleRoute(gps)}>
                    <MaterialIcons name="exit-to-app" size={35} color="black" />
                  </TouchableOpacity>
                </GrupoSettings>
              </GruposUnitarios>
            )
          })}
        </GruposListaemStyle>
      </ScrollView>
    </Container>
  );
};

export { Grupos };
