import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
  width: 100%;
  height: 100%;
  padding-top: ${RFValue(25)}px;
`;
export const ContainerHeader = styled.View`
  align-items: center;
`;
export const TitleHeader = styled.Text`
  text-align: center;
  height: ${RFValue(65)}px;
  font-size: ${RFValue(50)}px;
  margin-top: ${RFValue(85)}px;
  font-family: ${({ theme }) => theme.FONTS.Poppins_600SemiBold};
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const NameApp = styled.Text`
  text-align: center;
  height: ${RFValue(55)}px;
  line-height: ${RFValue(55)}px;
  font-size: ${RFValue(50)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold_Italic};
  color: ${({ theme }) => theme.COLORS.GOOGLE.YELLOW};
`;

export const DescriptionTextHeader = styled.Text`
  margin-top: 15px;
  color: ${({ theme }) => theme.COLORS.GOOGLE.YELLOW};
  width: 70%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const ButtonsLoginSocial = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;
export const ContainerBody = styled.View`
  padding: 20px;
  margin: ${RFValue(10)}px;
  align-items: center;
`;

export const ContainerFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const FooterDescription1 = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.COLORS.WHITE_100};
  font-family: ${({ theme }) => theme.FONTS.BebasNeue_Regular};
`;
export const FooterDescription2 = styled.Text`
  padding-left: ${RFValue(10)}px;
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.COLORS.RIOT_THEMES.RED};
  font-family: ${({ theme }) => theme.FONTS.BebasNeue_Regular};
`;
export const ButtonSignUp = styled.TouchableOpacity``;
export const TextError = styled.Text`
  width: 100%;
  font-size: ${RFValue(13)}px;
  color: red;
`;
