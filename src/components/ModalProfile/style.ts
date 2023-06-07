import styled from "styled-components/native";
import {Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
export const Container = styled.View`
  width: 100%;
  border: 2px solid ${({theme}) => theme.COLORS.MAINBorder};
  background-color: ${({theme}) => theme.COLORS.MAIN};
  position: absolute;
  display: flex;
  top: auto;
  z-index: 1;
`;
export const ContainerSld = styled.View``;
export const ImageProfile = styled(Image)`
  position: absolute;
  border-radius: 50px;
  border: 3px solid ${({theme}) => theme.COLORS.MAINBorder};
  bottom: -50px;
  align-items: center;
  justify-content: center;
  height: ${RFValue(85)}px;
  width: ${RFValue(85)}px;
  left: 50%;
  margin-left: -50px;
  z-index: 20;
`;
export const ImageBackground = styled(Image)``;
export const ImageBackgroundG = styled(Image)`
  border-radius: 100px;
  width: 150px;
  height: 150px;
`;
export const ImageSld = styled.View`
  display: flex;
  align-items: center;
`;
export const DescStld = styled.View`
  align-items: center;
  width: 100%;
`;
export const DescStldPerso = styled.View`
  align-items: center;
  margin: 50px 0 15px 0;
  width: 100%;
`;
export const RulesStld = styled.View`
  border: 1px solid ${({theme}) => theme.COLORS.MAINBorder};
  margin: 10px 0px 0px 0px;
  padding: 10px 5px;
  width: 100%;
`;

export const Rules = styled.Text`
  color: ${({theme}) => theme.COLORS.MAINChat2};
  font-size: ${RFValue(13)}px;
`;
export const TextGrup = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${RFValue(25)}px;
`;
export const TextGrupDesc = styled.Text`
  color: ${({theme}) => theme.COLORS.MAINChat2};
  font-size: ${RFValue(13)}px;
`;

export const OptionsStld = styled.View`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const TextName = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${RFValue(30)}px;
`;
export const TextUser = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.COLORS.GRAY4};
`;
export const TextDesc = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.COLORS.WHITE};
`;
