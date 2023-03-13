import { Text, View } from "react-native";
import { IFiles } from "../../interfaces/PostInterface";

class TypeOfFiles {
  typeOfFile(type: string, uri: string) {
    if (type === "image") {
      return <Text>{uri}</Text>;
    } else {
      return (
        <Text>
          {uri} + {type}
        </Text>
      );
    }
  }
}
export { TypeOfFiles };
