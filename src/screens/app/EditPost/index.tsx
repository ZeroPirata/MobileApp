import { useRoute } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database, db } from "../../../configs/firebase";
import {
  Container,
  ButtonControler,
  ControlerImageSelect,
  Description,
  TextEditPost,
  ControlerInput,
  ControlerPost,
} from "./style";
import { ref, update } from "firebase/database";

const EditPost = () => {
  const route = useRoute<EditPost>();

  const [value, setValue] = useState({
    title: route.params.title,
    description: route.params.description,
  });

  const updatePost = () => {
    const refDatabase = ref(database, `posts/${route.params.id}`);
    update(refDatabase, {
      title: value.title,
      description: value.description,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const navigation = useNavigation();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ControlerPost>
          <ControlerInput
            onChangeText={(text) => setValue({ ...value, title: text })}
          >
            {route.params.title}
          </ControlerInput>
          <Description
            value={value?.description}
            multiline={true}
            style={{ textAlignVertical: "top" }}
            onChangeText={(text) => setValue({ ...value, description: text })}
            textAlign={"left"}
            numberOfLines={5}
            placeholder="Description"
          />
          {/* {route.params.files ? (
            <TextEditPost>{route.params.files}</TextEditPost>
          ) : null} */}
          <Button
            title="Enviar"
            onPress={() => {
              updatePost();
              navigation.navigate("TabsRoutes");
            }}
          />
        </ControlerPost>
      </ScrollView>
    </Container>
  );
};
export { EditPost };
