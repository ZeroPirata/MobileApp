import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  height: ${RFValue(100)}%;
  padding-top: ${RFValue(25)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackGroundLogo = styled(Image)`
  position: absolute;
  opacity: 0.1;
  width: 100%;
  height: 100%;
`;

export const RegisterLeyout = styled.View`
  width: ${RFValue(80)}%;
  height: ${RFValue(50)}%;
`;
export const InputValues = styled.TextInput`
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.COLORS.MAINBorder};
  padding: ${RFValue(5)}px;
  margin: ${RFValue(5)}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const TextRegister = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.Poppins_500Medium_Italic};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(45)}px;
  align-self: center;
`;

export const ShowPassword = styled.View`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: space-evenly;
  align-items: center;
  width: ${RFValue(40)}%;
`;
export const ShowPasswordText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const ShowPasswordInput = styled(TouchableOpacity)``;
export const HaveAccountInput = styled(TouchableOpacity)``;
export const SignUpButtonView = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAINFill};
  margin: ${RFValue(15)}px;
  width: ${RFValue(45)}%;
  border-radius: 10px;
  align-self: center;
`;
export const HaveAccountView = styled.View``;
export const HaveAccountText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const SignUpButtonText = styled.Text`
  font-size: ${RFValue(25)}px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;
export const PasswordTextError = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED};
  text-align: center;
  align-self: center;
  width: ${RFValue(80)}%;
  font-size: ${RFValue(18)}px;
`;
