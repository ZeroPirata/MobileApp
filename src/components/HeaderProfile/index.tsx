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
import { useAuthentication } from "../../hooks/useAuthentication";
import { MaterialIcons } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { useNavigation } from "@react-navigation/native";
const HeaderProfile = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const postCreateButton = () => {
    navigation.navigate("CreatePost");
  };
  return (
    <HeaderView>
      <ContainerPicture>
        <Photo
          source={{
            uri: user?.assets?.profile,
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
          <ButtonCreatePost onPress={postCreateButton}>
            <MaterialIcons name="add" size={45} color="white" />
          </ButtonCreatePost>
        </PlusIcon>
      </ContainerIcone>
    </HeaderView>
  );
};
export { HeaderProfile };
