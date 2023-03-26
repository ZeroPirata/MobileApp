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
import { View } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { MaterialIcons } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { uri } from "../../styles/image.json";
import { useNavigation } from "@react-navigation/native";
import { ModalsProps, Option } from "../../interfaces/ModalInterface";
import { Modals } from "../Modals";

const HeaderProfile = () => {
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

  console.log(user?.uid);
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
            placeholderTextColor={themes.COLORS.TEXT_and_BACKGROUND.GRAY1}
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
export { HeaderProfile };
