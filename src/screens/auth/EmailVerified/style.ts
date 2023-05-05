import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  height: ${RFValue(100)}%;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const TextUserName = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.Poppins_600SemiBold_Italic};
  color: ${({ theme }) => theme.COLORS.MAINFill};
  font-size: ${RFValue(30)}px;
`;
export const DefaultText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(30)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.MAINBorder};
`;
export const ButtonsView = styled.View`
  justify-content: space-evenly;
  flex-direction: row;
  display: flex;
  width: 100%;
`;

export const TextDescriptionView = styled.View`
  margin: ${RFValue(10)}px 0;
  width: ${RFValue(80)}%;
`;
export const TextDescription = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(20)}px;
  padding: ${RFValue(5)}px;
`;

export const ButtonSendEmail = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.INFORMATIVO};
  height: ${RFValue(50)}px;
  width: ${RFValue(150)}px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
`;
export const ButtonSendEmailText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-size: ${RFValue(20)}px;
`;
export const ButtonLogout = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.RED};
  height: ${RFValue(50)}px;
  width: ${RFValue(150)}px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
`;
export const ButtonLogoutText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(20)}px;
`;
export const AlertText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(20)}px;
`;
