import { View, Text, Alert, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as DataBase from "firebase/database";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { uuidv4 } from "@firebase/util";
import { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { ISendFiles } from "../../../interfaces/PostInterface";
import { database, db } from "../../../configs/firebase";
import themes from "../../../styles/themes";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GrupoInterface } from "../../../interfaces/GruposInterface";
import {
  getFileSize,
  sendPost,
  sendPostGrupos,
} from "../../../utils/functions";
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

const { Item } = Picker;

const CreatePost = () => {
  const { user } = useAuthentication();

  const [grupos, setGrupos] = useState<GrupoInterface[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [gruposInfo, setGruposInfos] = useState<any[]>([]);
  const [images, setImages] = useState<ISendFiles[]>([]);
  const [isLoading, setIsLoagind] = useState(false);
  const [files, setFiles] = useState<ISendFiles>();
  const [selectGrup, setSelectGrup] = useState();
  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  const navigation = useNavigation();

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
    setLoadingUpload(true);
    if (selectGrup == null) {
      const refDatabase = DataBase.ref(database, `posts/${uuidv4()}`);
      const dataUser = {
        email: String(user?.email),
        nome: String(user?.displayName),
      };
      sendPost(
        refDatabase,
        dataUser,
        value.description,
        images,
        files,
        String(user?.uid)
      );
    } else {
      sendPostGrupos(
        String(user?.email),
        value.title,
        value.description,
        images,
        files,
        String(user?.uid),
        selectGrup
      );
    }
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
          setGrupos(user.grupos);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };




  const setGruposInfo = useCallback(() => {
    grupos.map((grups) => {
      const RefRealTime = DataBase.ref(database, `grupos/${grups}`);
      DataBase.onValue(RefRealTime, (snaphShot) => {
        setGruposInfos([{ ...snaphShot.val(), id: grups }]);
      });
    });
  }, [grupos]);

  useEffect(() => {
    if (user?.uid != null) {
      gruposUser(user?.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    setGruposInfo();
  }, [grupos]);

  const RemoverFile = () => {
    Alert.alert(
      "Remover arquivo",
      `Você tem certeza que deseja deletar: ${files?.name} ${fileSize}`,
      [
        { text: "Cencel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => setFiles(undefined),
        },
      ]
    );
  }

  const fileSize = getFileSize(Number(files?.size))
  return !loadingUpload ? (
    <Container>
      <CreatePostTextView>
        <CreatePostText
          multiline={true}
          onChangeText={(text) => setValue({ ...value, description: text })}
          value={value?.description}
          placeholder="Type here"
          placeholderTextColor={themes.COLORS.GRAY4}
          numberOfLines={10}
          textAlign={"left"}
          textAlignVertical="top"
        />
        <SelectPickerView>
          <Picker
            selectedValue={selectGrup}
            onValueChange={(grupValue, itemIndex) => setSelectGrup(grupValue)}
            style={{
              color: "white",
              width: "100%",
            }}
          >
            <Item label="Feed normal" value={null} />
            {gruposInfo &&
              gruposInfo.map((gps) => {
                return <Item key={gps.id} value={gps.id} label={gps.nome} />;
              })}
          </Picker>
        </SelectPickerView>
        <ControllerButtonsFileImages>
          <ButtonAddFile onPress={pickFiles}>
            <AntDesign name="addfile" size={24} color="black" />
            <ButtonAddFileText>Add Files</ButtonAddFileText>
          </ButtonAddFile>
          <ButtonAddImage onPress={pickImage}>
            <Entypo name="folder-images" size={24} color="black" />
            <ButtonAddImageText>Add Images</ButtonAddImageText>
          </ButtonAddImage>
        </ControllerButtonsFileImages>
        <ControlleViewImageRender style={
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
        </ControlleViewImageRender>
        {files ? <ControllViewFilesRender>
          <FontAwesome name="file" size={24} color="white" />
          <FileSettings>
            <ButtonRemoveImage onPress={RemoverFile}>
              <FileName>{files.name}</FileName>
              <FileSize>{fileSize}</FileSize>
              <FileType>{files.mimeType}</FileType>
            </ButtonRemoveImage>
          </FileSettings>
        </ControllViewFilesRender> : null}
        <ButtonSend onPress={SendingPost}>
          <TextSend>Send</TextSend>
        </ButtonSend>
      </CreatePostTextView>
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