import { TextInputProps } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface InputProps extends TextInputProps {
  width?: string | number;
  marginTop?: number;
  iconSize?: number;
  iconColor?: string;
  LeftIcon?: boolean;
  RightIcon?: boolean;
  iconName?: keyof typeof Icon.glyphMap;
  secureTextEntry?: boolean;
}
export { InputProps };
