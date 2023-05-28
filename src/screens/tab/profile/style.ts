import {Feather} from "@expo/vector-icons";
import {TouchableOpacity, Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.MAIN};
  width: 100%;
  height: 100%;
`;
/*  */
export const ContainerHeaderProfile = styled.View`
  width: 100%;
`;
/*  */
export const HeaderImagesView = styled.View``;
export const HeaderBackGroundView = styled(TouchableOpacity)`
  width: 100%;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.COLORS.MAINLineCross};
`;
export const HeaderBackGround = styled(Image)`
  width: 100%;
  min-height: ${RFValue(200)}px;
`;
/*  */
export const HeaderProfileView = styled(TouchableOpacity)`
  background-color: red;
  text-align: center;
  z-index: 150;
`;
export const HeaderProfile = styled(Image)`
  position: absolute;
  border-radius: 50px;
  border: 3px solid ${({theme}) => theme.COLORS.MAINLineCross};
  bottom: -50px;
  align-items: center;
  justify-content: center;
  height: ${RFValue(85)}px;
  width: ${RFValue(85)}px;
  left: 50%;
  margin-left: -50px;
  z-index: 20;
`;
/*  */
export const HeaderUserInfoView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-color: ${({theme}) => theme.COLORS.MAINLineCross};
  border-bottom-width: 2px;
  padding-bottom: 15px;
  margin-top: ${RFValue(40)}px;
`;
export const HeaderUserName = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${RFValue(35)}px;
`;
export const HeaderUserArroba = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY2};
  font-size: ${RFValue(20)}px;
`;
export const HeaderUserDescription = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${RFValue(15)}px;
`;

export const ButtonEditView = styled(TouchableOpacity)`
  padding: 0px 10px;
`;
export const CancelButton = styled(TouchableOpacity)`
  margin: 0px 10px;
`;
export const ButtonEditText = styled.Text``;

export const EditUserNameView = styled.View`
  margin-top: ${RFValue(10)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70%;
  height: 35px;
`;
export const EditUserDescricaoView = styled.View`
  margin-top: ${RFValue(10)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 75px;
`;
export const EditUserName = styled.TextInput`
  width: 90%;
  color: ${({theme}) => theme.COLORS.WHITE};
  border: 1px solid ${({theme}) => theme.COLORS.MAINBorder};
`;
export const EditUserDescricao = styled.TextInput`
  width: 100%;
  height: 100%;
  color: ${({theme}) => theme.COLORS.WHITE};
  border: 1px solid ${({theme}) => theme.COLORS.MAINBorder};
`;

export const SaveButton = styled(TouchableOpacity)`
  margin: 3px 10px;
`;
export const ButtonsView = styled.View``;
