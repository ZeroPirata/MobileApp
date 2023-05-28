import { useRoute } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, ScrollView, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database, db } from "../../../configs/firebase";
import {
  ButtonAddFile,
  ButtonAddFileText,
  ButtonAddImage,
  ButtonAddImageText,
  ButtonRemoveImage,
  ButtonSend,
  Container,
  ControllViewFilesRender,
  ControlleViewImageRender,
  ControllerButtonsFileImages,
  CreatePostText,
  CreatePostTextView,
  FileName,
  FileSettings,
  FileSize,
  FileType,
  FlatListImage,
  ImageLeyoutUpload,
  ImageLoading,
  SelectPickerView,
  TextLoading,
  TextSend,
  ViewLoading,
} from "./style";
import * as DocumentPicker from "expo-document-picker";

import { ref, update } from "firebase/database";
import themes from "../../../styles/themes";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { getFileSize } from "../../../utils/functions";
import { ISendFiles } from "../../../interfaces/PostInterface";
const { Item } = Picker;

const EditPost = () => {
  const route = useRoute<EditPost>();
  const [files, setFiles] = useState<ISendFiles>();
  const [filesStates, SetFilesStates] = useState(false)

  const bacakUpFiles = []
  bacakUpFiles.push(route.params.arquivos)

  const pickFiles = async () => {
    let result: any = await DocumentPicker.getDocumentAsync({
      type: ["application/*", "text/*"],
    });
    if (!result.canceled) {
      setFiles(result);
    }
  };

  const [value, setValue] = useState({
    body: route.params.body,
    arquivos: route.params.arquivos,
    images: route.params.images,
  });

  const updatePost = () => {
    const refDatabase = ref(database, `posts/${route.params.id}`);
    update(refDatabase, {
      body: value.body,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fileSize = getFileSize(Number(route.params.arquivos?.size))

  const navigation = useNavigation();



  const SwitchFilesPost = () => {
    Alert.alert(`${filesStates ? "Restaurar" : "Remover"} arquivo?`,
      `Você tem certeza que deseja remover este arquivo?`,
      [
        { text: "Cencel", style: "cancel" },
        {
          text: filesStates ? "Restaurar" : "Remover",
          onPress: () => {
            route.params.arquivos = null
          },
        },
      ]
    );
  }


  const SwitchFilePostLogic = () => {
    if (filesStates) {
      Alert.alert("Adicionar arquivo",
        `Você tem certeza que deseja remover este arquivo?`,
        [
          { text: "Cencel", style: "cancel" },
          {
            text: "Adicionar novo arquivo",
            onPress: () => pickFiles()
          },
        ]
      );
    }
  }

  return (
    <Container>
      <CreatePostTextView>
        <CreatePostText
          multiline={true}
          onChangeText={(text) => setValue({ ...value, body: text })}
          value={value?.body}
          placeholder="Type here"
          placeholderTextColor={themes.COLORS.GRAY4}
          numberOfLines={10}
          textAlign={"left"}
          textAlignVertical="top"
        />

        <ControllerButtonsFileImages>
          {/* <ButtonAddFile onPress={pickFiles}>
            <AntDesign name="addfile" size={24} color="black" />
            <ButtonAddFileText>Add Files</ButtonAddFileText>
          </ButtonAddFile>
          <ButtonAddImage onPress={pickImage}>
            <Entypo name="folder-images" size={24} color="black" />
            <ButtonAddImageText>Add Images</ButtonAddImageText>
          </ButtonAddImage> */}
        </ControllerButtonsFileImages>
        {/* <ControlleViewImageRender style={
          images.length > 0 ? { display: "flex", width: "90%", height: "20%" } : { display: "none" }
        }>
          {isLoading ? (
            <ViewLoading>
              <TextLoading>Loading...</TextLoading>
              <ActivityIndicator size={"large"} />
            </ViewLoading>
          ) : null}
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
        </ControlleViewImageRender> */}
        {route.params.arquivos ? <ControllViewFilesRender>
          <FontAwesome name="file" size={24} color="white" />
          <FileSettings>
            <ButtonRemoveImage onPress={SwitchFilesPost} >
              <FileName>{route.params.arquivos.id}</FileName>
              <FileSize>{fileSize}</FileSize>
            </ButtonRemoveImage>
          </FileSettings>
        </ControllViewFilesRender> : null}
        <ButtonSend onPress={updatePost}>
          <TextSend>Send</TextSend>
        </ButtonSend>
      </CreatePostTextView>
    </Container >
  );
};
export { EditPost };
