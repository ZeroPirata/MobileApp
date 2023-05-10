import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  width: 100%;
  height: 100%;
  flex: 1;
  padding-top: ${RFValue(25)}px;
`;
export const ButtoSeeMore = styled(TouchableOpacity)`
  border-radius: 15px;
  align-self: center;
  background-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE5};
  width: 150px;
  height: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
export const TextSeeMore = styled.Text`
  font-size: ${RFValue(20)}px;
`;
