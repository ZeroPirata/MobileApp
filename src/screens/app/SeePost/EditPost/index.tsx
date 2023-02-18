import { useRoute } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, ScrollView, TextInput } from "react-native";
import { db } from "../../../../configs/firebase";
import { Container, PostPub } from "../style";

const EditPost = () => {
  const route = useRoute<EditPost>();
  const docRef = doc(db, "post", route.params.id);
  const [value, setValue] = useState({
    title: "",
    description: "",
  });
  const UpdateInfoPost = async () => {
    await updateDoc(docRef, {
      title: value.title,
      description: value.description,
    });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostPub>
          <TextInput
            value={value.title}
            onChangeText={(text) => setValue({ ...value, title: text })}
          />
          <TextInput
            value={value.description}
            onChangeText={(text) => setValue({ ...value, description: text })}
          />
          <Button title="Enviar" onPress={UpdateInfoPost} />
        </PostPub>
      </ScrollView>
    </Container>
  );
};
export { EditPost };
