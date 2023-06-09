import {Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 100%;
  background-color: ${({theme}) => theme.COLORS.MAIN};
  padding-top: 20px;
`;
export const GruposListaemStyle = styled.View``;
export const GruposUnitarios = styled.View`
  margin: 5px 0px;
  background-color: ${({theme}) => theme.COLORS.MAINChat2};
  border: 2px solid ${({theme}) => theme.COLORS.MAINBorder};
  height: 85px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const GrupoNome = styled.Text`
  font-size: ${RFValue(15)}px;
  margin: 0 5px;
`;
export const GrupoDesc = styled.Text``;
export const GrupoInfo = styled.View`
  width: 50%;
`;
export const GrupoImg = styled(Image)`
  width: 25%;
  height: 100%;
`;
export const GrupoSettings = styled.View`
  width: 25%;
  align-items: center;
`;
