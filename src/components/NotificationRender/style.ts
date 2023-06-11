import styled from "styled-components/native";
import {Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;
export const TypeView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ContainerListRender = styled.View`
  margin: 5px 0;
  flex-direction: row;
  height: 75px;
  width: 100%;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.COLORS.MAINLineCross};
`;
export const Texts = styled.Text`
  font-size: ${RFValue(15)}px;
  color: white;
`;
export const TextsDate = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({theme}) => theme.COLORS.MAINLineCross};
`;
export const ImageRender = styled(Image)`
  width: 20%;
  height: 75px;
`;
export const ItensRender = styled.View`
  width: 40%;
  height: 100%;
  margin: 0 3px;
  display: flex;
  justify-content: center;
`;
export const IconsRender = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 40%;
`;
