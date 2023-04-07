import {
  HeaderView,
  ContainerPicture,
  Photo,
  ContainerIcone,
  SearchBarIcon,
  PlusIcon,
  TextInputSearch,
  ButtonCreatePost,
} from "./style";
import { TouchableOpacity } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { MaterialIcons } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { uri } from "../../styles/image.json";
import { useNavigation } from "@react-navigation/native";
import { ModalsProps, Option } from "../../interfaces/ModalInterface";
import { Modals } from "../Modals";
import { useState } from "react";
import { db } from "../../configs/firebase";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { IListSearchedUsers } from "../../interfaces/ListagemDeUsuario";

export const HeaderProfile = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const postCreateButton = () => {
    navigation.navigate("CreatePost");
  };

  const options: Option[] = [
    {
      name: "Criar Postagem",
      function: () => postCreateButton(),
    },
    {
      name: "Criar Grupo",
      function: () => console.log("Loading"),
    },
  ];

  const [value, setValue] = useState({
    search: "",
  });

  const [usuarios, setUsuarios] = useState<any[]>([]);

  const handleKeyPress = async (text: string) => {
    let letPostData: any[] = [];
    const referenceCloudFiresStorage = collection(db, "users");
    const queryBuilder = query(
      referenceCloudFiresStorage,
      text.includes("@")
        ? where("email", "==", text)
        : where("name", "==", text)
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
