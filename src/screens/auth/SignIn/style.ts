import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";
export const Container = styled.View`
  padding-top: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.MAIN};
`;
export const ImageBackGround = styled(Image)`
  position: absolute;
  opacity: 0.1;
  width: 100%;
  height: 100%;
`;
export const LoginComponent = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;
export const EmailInputView = styled.View``;
export const PasswordInputView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const LeyoutLogin = styled.View`
  display: flex;
  align-self: center;
  height: 50%;
  width: 80%;
`;

export const EmailInputText = styled.TextInput`
  border: 3px solid ${({ theme }) => theme.COLORS.MAINBorder};
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-top: ${RFValue(15)}px;
  padding: 0 ${RFValue(15)}px;
  font-size: ${RFValue(25)}px;
  border-radius: 10px;
`;
export const PasswordInputText = styled.TextInput`
  border: 3px solid ${({ theme }) => theme.COLORS.MAINBorder};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(25)}px;
  padding: 0 ${RFValue(15)}px;
  width: ${RFValue(85)}%;
  margin-top: ${RFValue(15)}px;
  border-radius: 10px;
`;

export const LoginText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.Poppins_500Medium_Italic};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(45)}px;
  align-self: center;
`;
export const ForguetPassWordView = styled(TouchableOpacity)``;
export const ForguetPassWordText = styled.Text`
  margin: ${RFValue(10)}px 0;
  color: ${({ theme }) => theme.COLORS.WHITE};
  align-self: flex-end;
`;

export const ButtonLoginView = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.MAINFill};
  width: ${RFValue(60)}%;
  border-radius: 8px;
  align-self: center;
`;
export const ButtonLoginText = styled.Text`
  font-size: ${RFValue(25)}px;
  text-align: center;
`;

export const TextCreateAccount = styled.Text`
  border-top-color: ${({ theme }) => theme.COLORS.MAINLineCross};
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-top: ${RFValue(25)}px;
  font-size: ${RFValue(15)}px;
  padding: ${RFValue(20)}px 0;
  border-top-width: 2px;
`;
export const ModalsAnotherLogin = styled.View``;
export const ButtonAccount = styled(TouchableOpacity)`
  border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
  border-radius: ${RFValue(25)}px;
  padding: ${RFValue(8)}px;
  margin: ${RFValue(8)}px;
  width: ${RFValue(70)}%;
  flex-direction: row;
  align-items: center;
  align-self: center;
  display: flex;
`;
export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(20)}px;
  text-align: center;
  width: 100%;
`;

export const ErroLog = styled.Text`
  font-size: ${RFValue(25)}px;
  align-self: center;
  color: ${({ theme }) => theme.COLORS.ATTENTION};
`;

export const SeePassword = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: ${RFValue(15)}px;
`;
