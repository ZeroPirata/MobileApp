import {TouchableOpacity, Button} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding-top: 20px;
  background-color: ${({theme}) => theme.COLORS.MAINBackground};
  height: 100%;
`;

export const ButtonChangeEmail = styled(TouchableOpacity)`
  margin: 10px 0;
  height: ${RFValue(35)}px;
  display: flex;
  border-bottom-width: 2.5px;
  border-bottom-color: ${({theme}) => theme.COLORS.MAINLineCross};
  justify-content: center;
`;

export const TextsInputs = styled.View``;
export const TextInputStld = styled.TextInput``;

export const ButtonText = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({theme}) => theme.COLORS.WHITE};
`;
export const ButtonCancel = styled(TouchableOpacity)``;
export const ButtonConfirm = styled(TouchableOpacity)``;

export const DeleteAccountStld = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.RED};
  width: ${RFValue(200)}px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  justify-content: space-evenly;
  align-items: center;
`;
export const DeleteAccountTextStld = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.COLORS.WHITE};
`;
export const ButtonLogoutView = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.BLUE2};
  display: flex;
  width: 100%;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  justify-content: space-evenly;
`;
export const ButtonLogoutText = styled.Text`
  font-size: ${RFValue(25)}px;
`;
