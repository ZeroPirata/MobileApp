import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY4};
`;
export const InputContainer = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.WHITE_100};
  flex: 1;
  padding-left: ${RFValue(5)}px;
  padding-right: ${RFValue(5)}px;
  width: ${RFValue(100)}%;
  height: ${RFValue(45)}px;
  font-size: ${RFValue(15)}px;
`;
