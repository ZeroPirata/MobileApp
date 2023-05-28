import {TouchableOpacity} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding-top: 35px;
  background-color: ${({theme}) => theme.COLORS.MAIN};
  width: 100%;
  height: 100%;
`;
export const NewChatButtonStld = styled(TouchableOpacity)`
  align-self: flex-end;
  border-radius: 15px;
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.COLORS.MAINFill};
  width: 50%;
  height: 5%;
`;
export const NewChatText = styled.Text`
  font-size: ${RFValue(20)}px;
`;

export const ListChatHistory = styled.View``;
