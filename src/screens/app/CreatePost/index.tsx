import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { uuidv4 } from "@firebase/util";
import { useState } from "react";

import { useAuthentication } from "../../../hooks/useAuthentication";
import { IFiles } from "../../../interfaces/PostInterface";
import { db, storage } from "../../../configs/firebase";
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

let imageUuidv4: any = [];
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
  const [uploadImageProgress, setUploadImageProgress] = useState(false);
  const [finalyUploadFile, setFinlalyUploadFile] = useState(false);

  const [image, setImage] = useState<IFiles[]>([]);
  const [theArray, setTheArray] = useState<string[]>([]);

  const handleHomeNavigation = () => {
    navigation.navigate("TabsRoutes");
  };

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

  const uploadImage = async () => {
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
      image.forEach(async (images, index) => {
        const id = uuidv4();
        imageUuidv4.push({ id: id });
        const response = await fetch(images.uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${user?.email}/${id}`);
        const uploadStatus = uploadBytesResumable(imageRef, blob);
        uploadStatus.on("state_changed", (snapshot) => {
          const lastIndex = image.length - 1;
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (lastIndex == index && progress == 100) {
            setUploadImageProgress(true);
          }
        });
        setImage([]);
      });
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
      await addDoc(collection(db, "post"), {
        date: data,
        user: user?.email,
        title: value?.title,
        description: value?.description,
      });
      navigation.navigate("TabsRoutes");
      return;
    }
  };

  if (uploadImageProgress) {
    imageUuidv4.forEach(async (files: { id: any }, index: number) => {
      const lastIndex = imageUuidv4.length - 1;
      const refUrlImage = ref(storage, `images/${user?.email}/${files.id}`);
      await getDownloadURL(refUrlImage).then((url) => {
        setTheArray((oldArray) => [...oldArray, url]);
      });
      if (index == lastIndex) {
        setUploadImageProgress(false);
        setFinlalyUploadFile(true);
      }
    });
    imageUuidv4 = [];
  }

  if (finalyUploadFile) {
    navigation.navigate("TabsRoutes");
    addDoc(collection(db, "post"), {
      date: data,
      user: user?.email,
      title: value?.title,
      description: value?.description,
      files: theArray,
    });
    setFinlalyUploadFile(false);
    setIsLoagind(false);
  }

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
          <ButtonSendPost onPress={uploadImage}>
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
