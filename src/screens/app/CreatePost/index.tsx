import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  ImageLeyoutUpload,
  Container,
  CreatePostHeader,
  CreatePostText,
  CreateBody,
  ButtonImage,
  ButtonText,
  ButtonSendPost,
  HeaderBackButton,
  ButtonUploadFile,
  ButtonArrowBack,
  ImageLoading,
  TextLoading,
  ButtonRemoveImage,
  ViewLoading,
  FlatListImage,
  ImageLoadingView,
  ButtonSendPostText,
} from "./style";
import { Btn } from "../../../components/button/index";
import { MaterialIcons } from "@expo/vector-icons";
import themes from "../../../styles/themes";
import { db, storage } from "../../../configs/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { uuidv4 } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { ICreatePost } from "../../../interfaces/CreatePost";
let imageUuidv4: any = [];
const CreatePost = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation();

  const [image, setImage] = useState([]);
  const [isLoading, setIsLoagind] = useState(false);
  const [value, setValue] = useState<ICreatePost>();
  const [uploading, setUploading] = useState(false);
  const pickImage = async () => {
    setIsLoagind(true);
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      videoQuality: 1,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      quality: 1,
    });
    setIsLoagind(false);
    if (!result.canceled) {
      setImage(result.assets);
    }
  };
  const removeImage = (index: any) => {
    Alert.alert(
      "Remover a imagem",
      `Você tem certeza que deseja deletar: ${image[index].type}`,
      [
        { text: "Cencel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => setImage(image.filter((image, i) => i !== index)),
        },
      ]
    );
  };
  const handleHomeNavigation = () => {
    navigation.navigate("TabsRoutes");
  };
  const uploadImage = async () => {
    if (image.length >= 1) {
      image.forEach(async (image, index) => {
        const id = uuidv4();
        imageUuidv4.push({ id: id });
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${user?.email}/${id}`);
        uploadBytes(imageRef, blob);
        setImage([]);
      });
      await addDoc(collection(db, "post"), {
        title: value?.title,
        description: value?.description,
        files: imageUuidv4,
      });
      navigation.navigate("TabsRoutes");
      return;
    }
    if (image.length == 0) {
      await addDoc(collection(db, "post"), {
        title: value?.title,
        description: value?.description,
      });
      navigation.navigate("TabsRoutes");
      return;
    }
  };
  return (
    <Container>
      <HeaderBackButton>
        <ButtonArrowBack onPress={handleHomeNavigation}>
          <MaterialIcons name="arrow-back" size={50} color="white" />
        </ButtonArrowBack>
      </HeaderBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreatePostHeader>
          <CreatePostText
            placeholder="Title"
            value={value?.title}
            onChangeText={(text) => setValue({ ...value, title: text })}
            placeholderTextColor={themes.COLORS.GRAY2}
          />
          <CreateBody
            value={value?.description}
            multiline={true}
            style={{ textAlignVertical: "top" }}
            onChangeText={(text) => setValue({ ...value, description: text })}
            textAlign={"left"}
            numberOfLines={5}
            placeholder="Description"
            placeholderTextColor={themes.COLORS.TEXT_and_BACKGROUND.GRAY2}
          />

          <ButtonImage>
            <ButtonText>Files: {image.length} </ButtonText>
            <ButtonUploadFile onPress={pickImage}>
              <MaterialIcons
                name="upload-file"
                size={24}
                color={themes.COLORS.HEXTECH_METAL_GOLD.GOLD3}
              />
              <ButtonText>UploadFile </ButtonText>
            </ButtonUploadFile>
          </ButtonImage>
          <ImageLoadingView>
            {isLoading ? (
              <ViewLoading>
                <TextLoading>Loading...</TextLoading>
                <ActivityIndicator size={"large"} />
              </ViewLoading>
            ) : null}
            {image && (
              <FlatListImage
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={image}
                renderItem={({ item, index }) => (
                  <ImageLeyoutUpload>
                    <ButtonRemoveImage onPress={() => removeImage(index)}>
                      <ImageLoading source={{ uri: item.uri }} key={index} />
                    </ButtonRemoveImage>
                  </ImageLeyoutUpload>
                )}
              />
            )}
          </ImageLoadingView>
          <ButtonSendPost onPress={uploadImage}>
            <ButtonSendPostText>Post</ButtonSendPostText>
          </ButtonSendPost>
        </CreatePostHeader>
      </ScrollView>
    </Container>
  );
};
export { CreatePost };
