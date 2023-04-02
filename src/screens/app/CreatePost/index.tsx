import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as DataBase from "firebase/database";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { uuidv4 } from "@firebase/util";
import { useCallback, useEffect, useState } from "react";

import { useAuthentication } from "../../../hooks/useAuthentication";
import { IFiles, ISendFiles } from "../../../interfaces/PostInterface";
import { database, db, storage } from "../../../configs/firebase";
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
import { TypeOfFiles } from "../../../components/TypeFile";
import { Picker } from "@react-native-picker/picker";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { GrupoInterface } from "../../../interfaces/GruposInterface";
import { Usuario } from "../../../interfaces/UsuarioInterface";
import { User } from "firebase/auth/react-native";
import {
  FliesUpload,
  ImageArrayUpload,
  sendPost,
} from "../../../utils/functions";

const CreatePost = () => {
  const [grupos, setGrupos] = useState<GrupoInterface[]>([]);
  const [selectGrup, setSelectGrup] = useState();

  const { Item } = Picker;
  const { user } = useAuthentication();

  const navigation = useNavigation();

  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [isLoading, setIsLoagind] = useState(false);

  const [images, setImages] = useState<ISendFiles[]>([]);
  const [files, setFiles] = useState<ISendFiles>();

  const handleHomeNavigation = () => {
    navigation.navigate("TabsRoutes");
  };

  const pickFiles = async () => {
    setIsLoagind(true);
    let result: any = await DocumentPicker.getDocumentAsync({
      type: ["application/*", "text/*"],
    });
    setIsLoagind(false);
    if (!result.canceled) {
      setFiles(result);
    }
  };

  const pickImage = async () => {
    setIsLoagind(true);
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      videoQuality: 1,
      allowsMultipleSelection: true,
      quality: 1,
    });
    setIsLoagind(false);
    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const removeImage = (index: any) => {
    Alert.alert(
      "Remover a imagem",
      `Você tem certeza que deseja deletar: ${images[index].type}`,
      [
        { text: "Cencel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => setImages(images.filter((image, i) => i !== index)),
        },
      ]
    );
  };

  const SendingPost = async () => {
    if (value.title == "") {
      Alert.alert("Titulo Vazio", "Escreva pelo menos o titulo ψ(._. )>", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      return;
    }
    setLoadingUpload(true);
    const refDatabase = DataBase.ref(database, `posts/${uuidv4()}`);
    sendPost(
      refDatabase,
      String(user?.email),
      value.title,
      value.description,
      images,
      files
    );
    navigation.navigate("TabsRoutes");
    setLoadingUpload(false);
    return;
  };

  const gruposUser = async (uid: string) => {
    const createCollection = collection(db, "users");
    const queryBuild = query(createCollection, where("id", "==", uid));
    try {
      const querySnapshot = await getDocs(queryBuild);
      querySnapshot.docs.map((docs) => {
        if (docs.data().grupos) {
          const user = docs.data();
          const grupos = user.grupos.map((grups: any) => ({
            ...grups,
          }));
          setGrupos(grupos);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.uid != null) {
      gruposUser(user?.uid);
    }
  }, [user?.uid]);

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
          <Picker
            selectedValue={selectGrup}
            onValueChange={(grupValue, itemIndex) => setSelectGrup(grupValue)}
            style={{
              color: "white",
            }}
          >
            <Item label="Feed normal" value={null} />
            {grupos &&
              grupos.map((gps) => {
                return <Item key={gps.id} value={gps.id} label={gps.nome} />;
              })}
          </Picker>
          <ButtonImage>
            <ButtonText>Images: {Number(images.length)} </ButtonText>
            <ButtonUploadFile onPress={pickImage}>
              <MaterialIcons
                name="image-search"
                size={24}
                color={themes.COLORS.HEXTECH_METAL_GOLD.GOLD3}
              />
              <ButtonText>Images</ButtonText>
            </ButtonUploadFile>
            <ButtonUploadFile onPress={pickFiles}>
              <MaterialIcons
                name="file-upload"
                size={24}
                color={themes.COLORS.HEXTECH_METAL_GOLD.GOLD3}
              />
              <ButtonText>Files</ButtonText>
            </ButtonUploadFile>
          </ButtonImage>
          <ButtonText>
            File: {files?.name} - Tamanho: {files?.size}{" "}
          </ButtonText>
          <ImageLoadingView>
            {isLoading ? (
              <ViewLoading>
                <TextLoading>Loading...</TextLoading>
                <ActivityIndicator size={"large"} />
              </ViewLoading>
            ) : null}
            {images && (
              <FlatListImage
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={images}
                renderItem={({ index }) => (
                  <ImageLeyoutUpload>
                    <ButtonRemoveImage onPress={() => removeImage(index)}>
                      <ImageLoading
                        source={{ uri: images[index].uri }}
                        key={index}
                      />
                    </ButtonRemoveImage>
                  </ImageLeyoutUpload>
                )}
              />
            )}
            {/* {files && (
              <FlatListImage
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={files}
                renderItem={({ index }) =>
                  ComponentFilesType.typeOfFile(
                    files[index].type,
                    files[index].uri
                  )
                }
              />
            )} */}
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
