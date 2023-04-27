import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ISendFiles } from "../../../interfaces/PostInterface";
import { push, ref, set } from "firebase/database";
import { database, db } from "../../../configs/firebase";
import { uuidv4 } from "@firebase/util";
import { UploadSingleImage } from "../../../utils/functions";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { collection, getDocs, query, where } from "firebase/firestore";
export const CreateGrupo = () => {
  const { user } = useAuthentication();

  const [values, setValues] = useState({
    nome: "",
    descricao: "",
  });

  const [emailUser, setEmailUser] = useState<string[]>([]);
  const [email, setEmail] = useState({
    email: "",
  });
  const handleAddEmail = () => {
    const newEmailUser = [...emailUser, email.email];
    setEmailUser(newEmailUser);
    setEmail({ email: "" });
  };

  const removeUserList = (index: number) => {
    setEmailUser(emailUser.filter((email, i) => i !== index));
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

  const SendImage = async () => {
    if (imageSelect) {
      const uploadedImage = await UploadSingleImage(
        String(user?.email),
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
          `user/${i.data().id}/alerts/grupInvite`
        );
        push(refRealTime, {
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
    const imageUrl = await SendImage();
    const refRealTime = ref(database, `grupos/${GUID}`);
    await set(refRealTime, {
      nome: values?.nome,
      descricao: values?.descricao,
      image: {
        id: imageUrl?.id,
        url: imageUrl?.url,
      },
      membros: [{ id: user?.uid }],
    });
    EnviarSolicataoParaEntrarNoGrupo(GUID, imageUrl);
  };
  return (
    <View style={{ paddingTop: 25 }}>
      <View>
        <Text>Nome</Text>
        <TextInput
          placeholder="Nome do Grupo"
          value={values.nome}
          onChangeText={(text) => setValues({ ...values, nome: text })}
        />
        <Text>Descrição do grupo</Text>
        <TextInput
          placeholder="Descrição do grupo"
          numberOfLines={5}
          textAlignVertical="top"
          value={values.descricao}
          onChangeText={(text) => setValues({ ...values, descricao: text })}
        />
        <Text>Imagem do grupo</Text>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "red",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: 150,
            height: 150,
          }}
        >
          {imageSelect?.uri != null ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: imageSelect?.uri }}
            />
          ) : (
            <FontAwesome name="image" size={35} />
          )}
        </TouchableOpacity>
        <Text>Adicionar Membro</Text>
        <TextInput
          value={email.email}
          onChangeText={(text) => setEmail({ ...email, email: text })}
          placeholder="Digite o Nome/Email"
        />
        <TouchableOpacity onPress={handleAddEmail}>
          <Text>Adicionar</Text>
        </TouchableOpacity>
        {emailUser.length > 0
          ? emailUser.map((emails, index) => {
              return (
                <Text>
                  {emails}{" "}
                  <TouchableOpacity onPress={() => removeUserList(index)}>
                    <Text>Remover</Text>
                  </TouchableOpacity>
                </Text>
              );
            })
          : null}
        <TouchableOpacity>
          <FontAwesome name="address-card-o" size={35} />
        </TouchableOpacity>

        <TouchableOpacity onPress={createGrupo}>
          <Text>Criar Grupo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
