import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as DataBase from "firebase/database";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { uuidv4 } from "@firebase/util";
import { useState } from "react";

import { useAuthentication } from "../../../hooks/useAuthentication";
import { IFiles } from "../../../interfaces/PostInterface";
import { database, storage } from "../../../configs/firebase";
import themes from "../../../styles/themes";
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
import { set } from "firebase/database";

let data = Math.floor(Date.now() / 1000);
const CreatePost = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation();

  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [isLoading, setIsLoagind] = useState(false);

  const [image, setImage] = useState<IFiles[]>([]);

  const handleHomeNavigation = () => {
    navigation.navigate("TabsRoutes");
  };

  const pickImage = async () => {
    setIsLoagind(true);
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      videoQuality: 1,
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

  const SendingPost = async () => {
    if (image.length >= 1) {
      if (value.title == "") {
        Alert.alert("Value null", "please, make a title...", [
          {
            text: "Ok",
            style: "cancel",
          },
        ]);
        return;
      }
      setLoadingUpload(true);
      const uploadPromise = image.map(async (images) => {
        const id = uuidv4();
        const response = await fetch(images.uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${user?.email}/${id}`);
        const uploadStatus = uploadBytesResumable(imageRef, blob);
        const snapshot = await uploadStatus;
        return {
          id,
          url: await getDownloadURL(snapshot.ref),
        };
      });
      const uploadedImages = await Promise.all(uploadPromise);
      const refDatabase = DataBase.ref(database, `posts/${uuidv4()}`);

      await set(refDatabase, {
        data: data,
        user: user?.email,
        title: value.title,
        description: value.description,
        files: uploadedImages.map((img) => img.url),
      });
      navigation.navigate("TabsRoutes");
      setLoadingUpload(false);
      return;
    }
    if (image.length == 0) {
      if (value.title == "" || value.description == "") {
        Alert.alert("Value null", "please, make a title and description...", [
          {
            text: "Ok",
            style: "cancel",
          },
        ]);
        return;
      }
      const refDatabase = DataBase.ref(database, `posts/${uuidv4()}`);
      await set(refDatabase, {
        data: data,
        user: user?.email,
        title: value.title,
        description: value.description,
      });
      navigation.navigate("TabsRoutes");
      return;
    }
  };

  return !loadingUpload ? (
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
                renderItem={({ index }) => (
                  <ImageLeyoutUpload>
                    <ButtonRemoveImage onPress={() => removeImage(index)}>
                      <ImageLoading
                        source={{ uri: image[index].uri }}
                        key={index}
                      />
                    </ButtonRemoveImage>
                  </ImageLeyoutUpload>
                )}
              />
            )}
          </ImageLoadingView>
          <ButtonSendPost onPress={SendingPost}>
            <ButtonSendPostText>Post</ButtonSendPostText>
          </ButtonSendPost>
        </CreatePostHeader>
      </ScrollView>
    </Container>
  ) : (
    <View
      style={{
        position: "absolute",
        backgroundColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Text
        style={{
          color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
          fontFamily: themes.FONTS.Poppins_600SemiBold_Italic,
          fontSize: RFValue(50),
        }}
      >
        Posting...
      </Text>
      <ActivityIndicator size={100} />
    </View>
  );
};
export { CreatePost };