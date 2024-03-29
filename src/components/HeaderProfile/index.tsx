import { HeaderView, ContainerPicture, Photo, ContainerIcone, SearchBarIcon, PlusIcon, TextInputSearch, } from "./style";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigation } from "@react-navigation/native";
import { Option } from "../../interfaces/ModalInterface";
import { MaterialIcons } from "@expo/vector-icons";
import { uri } from "../../styles/image.json";
import { db } from "../../configs/firebase";
import themes from "../../styles/themes";
import { Modals } from "../Modals";
import { useState } from "react";

export const HeaderProfile = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation();

  const postCreateButton = () => {
    navigation.navigate("CreatePost");
  };
  const grupoCreateButton = () => {
    navigation.navigate("CreateGrupo");
  };

  const options: Option[] = [
    {
      name: "Criar Postagem",
      function: () => postCreateButton(),
    },
    {
      name: "Criar Grupo",
      function: () => grupoCreateButton(),
    },
  ];

  const [value, setValue] = useState({
    search: "",
  });

  const handleKeyPress = async (text: string) => {
    let letPostData: any[] = [];
    const referenceCloudFiresStorage = collection(db, "users");
    const queryBuilder = query(
      referenceCloudFiresStorage,
      text.includes("@")
        ? where("email", "==", text)
        : where("arroba", "==", text)
    );
    const getUserts = await getDocs(queryBuilder);
    getUserts.docs.map((itens) => {
      letPostData.push({
        id: itens.data().id,
        name: itens.data().name,
        avatar: itens.data().avatar,
        email: itens.data().email,
      });
    });
    navigation.navigate("ListSearchedUser", letPostData);
  };

  return (
    <HeaderView>
      <ContainerPicture>
        <Photo
          source={{
            uri: String(user?.photoURL ? user?.photoURL : uri),
          }}
        />
      </ContainerPicture>
      <ContainerIcone>
        <SearchBarIcon>
          <TextInputSearch
            placeholder={"Search"}
            value={value.search}
            onChangeText={(text) => setValue({ ...value, search: text })}
            placeholderTextColor={themes.COLORS.TEXT_and_BACKGROUND.GRAY1}
            onSubmitEditing={() => handleKeyPress(value.search)}
          />
          <MaterialIcons name="search" size={30} color="white" />
        </SearchBarIcon>
        <PlusIcon>
          <Modals
            options={options}
            key={"modal"}
            iconSize={35}
            iconNameFeater={"plus-square"}
          />
        </PlusIcon>
      </ContainerIcone>
    </HeaderView>
  );
};
