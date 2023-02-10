import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
export const Button = styled(TouchableOpacity)`
  border-radius: ${RFValue(15)}px;
  align-items: center;
  justify-content: center;
`;
export const TextBtn = styled.Text``;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
