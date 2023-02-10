import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

interface IConsProps {
  IconSize?: number;
  IconColor?: string;
  IconName?: keyof typeof FontAwesome.glyphMap;
}

interface ButtonProps extends TouchableOpacityProps, IConsProps {
  title?: string;
  fontColor?: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: TouchableOpacityProps["style"];
  variant?:
    | "LargeButtonGoldBorded"
    | "NormalButtonGoldBorded"
    | "MediumButtonGoldBorded"
    | "SmallButtonGoldBorded"
    | "NormalIconButton"
    | "MediumIconButton"
    | "SmallIconButton"
    | "LargeIconButton"
    | "LargeButtonOutLine"
    | "NormalButtonOutLine"
    | "MediumButtonOutLine"
    | "SmallButtonOutLine"
    | "none";
  fontSize?: number;
  fontFamily?: string;
}
export { ButtonProps };
