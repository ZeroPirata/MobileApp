import {TouchableOpacity} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.MAIN};
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.View`
  width: 95%;
  justify-content: center;
  display: flex;
  flex: 1;
`;

export const Text = styled.Text`
  font-size: ${RFValue(30)}px;
  border-bottom-width: 1px;
  width: 95%;
  align-self: center;
  border-color: ${({theme}) => theme.COLORS.MAINLineCross};
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONTS.Poppins_600SemiBold};
  text-align: center;
`;

export const TextsInputs = styled.View`
  align-items: center;
  display: flex;
`;

export const TextInputStld = styled.TextInput`
  width: 90%;
  margin: 10px 0;
  height: ${RFValue(35)}px;
  border: 1px solid;
  border-color: ${({theme}) => theme.COLORS.MAINBorder};
  border-radius: 15px;
  padding: 0 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: ${RFValue(20)}px;
`;

export const ButtonStld = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const ButtonCancel = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.COLORS.RED};
  border-radius: 25px;
  width: ${RFValue(125)}px;
`;

export const ButtonConfirm = styled.TouchableOpacity`
  width: ${RFValue(125)}px;
  background-color: ${({theme}) => theme.COLORS.MAINFill};
  border-radius: 25px;
`;
