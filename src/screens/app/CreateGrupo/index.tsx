import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ISendFiles } from "../../../interfaces/PostInterface";
import { push, ref, set } from "firebase/database";
import { database, db } from "../../../configs/firebase";
import { uuidv4 } from "@firebase/util";
import { UploadSingleImage } from "../../../utils/functions";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { AddImageGrupo, AddImageStld, AddMembroGrupo, AddMembroGrupoInput, ButtonAddMembro, ButtonsImageStld, Container, ContainerGrupo, CreateGrupoBtn, ImageSelect, TextInputDescStld, TextInputNameStld, ViewListMembros } from "./style";
import themes from "../../../styles/themes";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
export const CreateGrupo = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation()
  const [values, setValues] = useState({
    nome: "",
    descricao: "",
  });

  const [emailUser, setEmailUser] = useState<string[]>([]);
  const [grupoRules, setGrupoRules] = useState<string[]>([]);
  const [email, setEmail] = useState({
    email: "",
  });
  const [regras, setText] = useState({
    text: "",
  });
  const handleAddEmail = () => {
    const newEmailUser = [...emailUser, email.email];
    setEmailUser(newEmailUser);
    setEmail({ email: "" });
  };
  const handleAddRules = () => {
    const newRule = [...grupoRules, regras.text];
    setGrupoRules(newRule);
    setText({ text: "" });
  };

  const removeUserList = (index: number) => {
    setEmailUser(emailUser.filter((__, i) => i !== index));
  };
  const removeRule = (index: number) => {
    setGrupoRules((prevRules) => {
      const updatedRules = [...prevRules];
      updatedRules.splice(index, 1);
      return updatedRules;
    });
  };

  const [imageSelect, setImageSelect] = useState<ISendFiles>();
  const pickImage = async () => {
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      videoQuality: 1,
      allowsMultipleSelection: false,
      quality: 1,
      aspect: [16, 9],
    });
    if (result.canceled) {
      return;
    } else {
      setImageSelect(result.assets[0]);
    }
  };

  const SendImage = async (id: string) => {
    if (imageSelect) {
      const uploadedImage = await UploadSingleImage(
        `grupos-${id}`,
        imageSelect
      );
      return uploadedImage;
    }
  };

  const EnviarSolicataoParaEntrarNoGrupo = (grupoId: string, imageUrl: any) => {
    const referenceCloudFiresStorage = collection(db, "users");
    emailUser.map(async (emails) => {
      const queryBuilder = query(
        referenceCloudFiresStorage,
        where("email", "==", emails)
      );
      const getUserts = await getDocs(queryBuilder);
      getUserts.forEach((i) => {
        const refRealTime = ref(
          database,
          `user/${i.data().id}/alerts`
        );
        push(refRealTime, {
          type: "grupo",
          date: Math.floor(Date.now() / 1000),
          id: grupoId,
          name: values.nome,
          avatar: imageUrl?.url,
        });
      });
    });
  };

  const createGrupo = async () => {
    const GUID = uuidv4();
    const imageUrl = await SendImage(GUID);
    const refRealTime = ref(database, `grupos/${GUID}`);
    await set(refRealTime, {
      nome: values?.nome,
      descricao: values?.descricao,
      image: {
        id: imageUrl?.id || "NoNe",
        url: imageUrl?.url || "https://imgs.search.brave.com/bn5WFs_Hg5tycrgOvw_QL367onF5GR5fxUoWMOVjt1g/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbGluZS1kZXNp/Z24tYnVzaW5lc3Mt/c2V0LTQvMjEvcGVv/cGxlLWN1c3RvbWVy/LXVua25vd24tMTAy/NC5wbmc",
      },
      membros: [{ id: user?.uid, role: "Dono" }],
      regras: grupoRules
    });
    const usersRef = doc(db, "users", String(user?.uid));

    await setDoc(
      usersRef,
      {
        grupos: arrayUnion({ id: GUID }),
      },
      { merge: true }
    ).then(() => navigation.navigate("TabsRoutes", { screen: "Home" }));
    EnviarSolicataoParaEntrarNoGrupo(GUID, imageUrl);
  };

  const handleDeleteImageIndex = () => {
    setImageSelect(undefined)
  }
  return (
    <Container>
      <ContainerGrupo>
        <ScrollView>
          <CreateGrupoBtn onPress={createGrupo}>
            <Text style={{ fontSize: 25, alignItems: "center", textAlign: "center", alignContent: "center", }}>Criar Grupo</Text>
          </CreateGrupoBtn>
          <TextInputNameStld
            placeholder="Nome do Grupo"
            value={values.nome}
            maxLength={30}
            onChangeText={(text) => setValues({ ...values, nome: text })}
            placeholderTextColor={themes.COLORS.GRAY5}
          />
          <TextInputDescStld
            placeholder="Descrição do grupo"
            numberOfLines={5}
            textAlignVertical="top"
            value={values.descricao}
            placeholderTextColor={themes.COLORS.GRAY5}
            onChangeText={(text) => setValues({ ...values, descricao: text })}
          />
          <AddImageStld>
            <ButtonsImageStld>
              <AddImageGrupo onPress={pickImage}>
                <Text>Add Image</Text>
              </AddImageGrupo>
              {imageSelect?.uri != null ? (
                <AddImageGrupo onPress={handleDeleteImageIndex} >
                  <Text>Remove</Text>
                </AddImageGrupo>
              ) : (
                null
              )}
            </ButtonsImageStld>
            {imageSelect?.uri != null ? (
              <ImageSelect
                source={{ uri: imageSelect?.uri }}
              />
            ) : (
              null
            )}
          </AddImageStld>
          <AddMembroGrupo>
            <AddMembroGrupoInput
              value={email.email}
              onChangeText={(text) => setEmail({ ...email, email: text })}
              placeholder="Digite Email"
              placeholderTextColor={themes.COLORS.GRAY5}
            />
            <ButtonAddMembro onPress={handleAddEmail}>
              <Text>Adicionar</Text>
            </ButtonAddMembro>
          </AddMembroGrupo>
          {emailUser.length > 0 &&
            <ViewListMembros>
              {emailUser.map((emails, index) => {
                return (
                  <View key={index} style={{ alignContent: "center", alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", borderBottomColor: themes.COLORS.MAINFill, borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }}>
                    <Text style={{ color: "white" }}>{emails}</Text>
                    <TouchableOpacity onPress={() => removeUserList(index)}>
                      <Text style={{ color: "white" }} >Remover</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ViewListMembros>
          }
          <AddMembroGrupo>
            <AddMembroGrupoInput
              placeholderTextColor={themes.COLORS.GRAY5}
              value={regras.text}
              onChangeText={(text) => setText({ ...regras, text: text })}
              placeholder="Digite a Regra"
            />
            <ButtonAddMembro onPress={handleAddRules}>
              <Text>Adicionar</Text>
            </ButtonAddMembro>
          </AddMembroGrupo>
          {grupoRules.length > 0 &&
            <ViewListMembros>
              {grupoRules.map((rules, index) => {
                return (
                  <View
                    key={rules} // Usando o valor do item como chave única
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      borderBottomColor: themes.COLORS.MAINFill,
                      borderBottomWidth: 1,
                      marginTop: 5,
                      marginBottom: 5
                    }}
                  >
                    <Text style={{ color: "white" }}>{index + " " + rules}</Text>
                    <TouchableOpacity onPress={() => removeRule(index)}>
                      <Text style={{ color: "white" }}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ViewListMembros>
          }
        </ScrollView >
      </ContainerGrupo>
    </Container >
  );
};
