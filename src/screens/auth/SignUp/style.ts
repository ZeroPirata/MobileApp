import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
  padding-top: 20px;
  width: 100%;
  height: 100%;
`;
export const ContainerHeaderButton = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 50px;
  justify-content: center;
`;
export const ContainerHeader = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
export const TextContainerHeader = styled.Text`
  font-size: ${RFValue(55)}px;
  color: white;
`;
export const DescriptionContainerHeader = styled.Text`
  font-size: ${RFValue(25)}px;
  color: white;
`;
export const DescriptionContainerHeaderSocial = styled.Text`
  margin-top: 15px;
  color: ${({ theme }) => theme.COLORS.GOOGLE.YELLOW};
  width: 70%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const ButtonSocialSignUp = styled.View`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const ContainerBody = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TextContainerBody = styled.Text`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.FONTS.SignikaNegative_500Medium};
  font-size: ${RFValue(30)}px;
  color: red;
`;
export const TextError = styled.Text`
  width: 80%;
  font-size: ${RFValue(15)}px;
  color: red;
`;
