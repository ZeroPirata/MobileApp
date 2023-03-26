import Icon from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export interface Option {
  name: string;
  function: () => void;
}

export interface ModalsProps {
  options: Option[];
  iconSize?: number;
  iconNameFeater?: keyof typeof Feather.glyphMap;
  iconNameMaterial?: keyof typeof MaterialIcons.glyphMap;
}
