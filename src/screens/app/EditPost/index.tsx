import { useRoute } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, ScrollView, TextInput } from "react-native";
import { db } from "../../../configs/firebase";
import {
  Container,
  ButtonControler,
  ControlerImageSelect,
  Description,
  TextEditPost,
  ControlerInput,
  ControlerPost,
} from "./style";

const EditPost = () => {
  const route = useRoute<EditPost>();
  const docRef = doc(db, "post", route.params.id);
  const [value, setValue] = useState({
    title: route.params.title,
    description: route.params.description,
  });

  const UpdateInfoPost = async () => {
    await updateDoc(docRef, {
      title: value.title,
      description: value.description,
    });
  };
  console.log(value.title);

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
          {route.params.files ? (
            <TextEditPost>{route.params.files}</TextEditPost>
          ) : null}
          <Button title="Enviar" onPress={UpdateInfoPost} />
        </ControlerPost>
      </ScrollView>
    </Container>
  );
};
export { EditPost };
