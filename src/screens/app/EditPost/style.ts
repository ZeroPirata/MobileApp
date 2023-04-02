import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
  width: 100%;
  height: 100%;
  padding-top: ${RFValue(25)}px;
  background: white;
  align-items: center;
  display: flex;
  flex-direction: row;
`;
export const ControlerPost = styled.View`
  height: ${RFValue(500)}px;
  width: 80%;
  display: flex;
  align-self: center;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-width: 1px;
`;
export const ControlerImageSelect = styled.View``;
export const ButtonControler = styled(TouchableOpacity)``;
export const ControlerInput = styled.TextInput`
  border: 1px solid red;
  margin: 10px 15px;
  height: 50px;
`;
export const TextEditPost = styled.Text``;
export const Description = styled.TextInput``;
