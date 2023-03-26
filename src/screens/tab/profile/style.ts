import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const MainContaienr = styled.View`
  padding-top: 25px;
  width: 100%;
`;
export const ContainerHead = styled.View`
  width: 100%;
  height: 350px;
  border-bottom-width: 5px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  background-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE5};
`;

/* Leyout user BackGround / Avatar */

export const SectionLeyoutUser = styled.View`
  height: 150px;
  width: 100%;
`;

/* BackGround */

export const EditBackGroundButton = styled(TouchableOpacity)`
  height: 100%;
  width: 100%;
`;

export const BackGroundIconView = styled.View`
  color: red;
  text-align: center;
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BackGroundImage = styled.Image`
  border-color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.ROSA_CLARO};
  height: 100%;
  width: 100%;
`;

export const FeatherIcons = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.VERDE_AZUL_CLARO};
`;

/* Avatar */

export const EditAvatarButton = styled(TouchableOpacity)`
  background-color: red;
  text-align: center;
`;

export const AvatarIconView = styled.View`
  position: absolute;
  background-color: red;
  border-bottom-left-radius: 35px;
  border-top-right-radius: 35px;
  bottom: -50px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  left: 25px;
  z-index: 20;
`;

export const AvatarImage = styled.Image`
  height: 100px;
  position: absolute;
  border-bottom-left-radius: 35px;
  border-top-right-radius: 35px;
  border-color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.ROSA_CLARO};
  border-width: 1px;
  bottom: -50px;
  left: 25px;
  width: 100px;
`;
/* Detais Info */

export const SectionUserInfo = styled.View`
  padding-top: 50px;
  padding-left: 10px;
  height: 25%;
`;

export const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionEditNameUser = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const UserTextInputName = styled.TextInput`
  background-color: white;
  width: 150px;
  height: 25px;
`;

export const ButtonSettings = styled(TouchableOpacity)`
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 35;
  width: 75;
  margin-left: 10;
  margin-right: 10;
`;

export const TextButtons = styled.Text``;

export const NameUser = styled.Text`
  font-size: ${RFValue(35)}px;
  height: 115%;
  font-family: ${({ theme }) => theme.FONTS.PTSansNarrow_700Bold};
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.LARANJA};
`;

export const EmailUser = styled.Text`
  font-size: ${RFValue(35)}px;
  height: 115%;
  font-family: ${({ theme }) => theme.FONTS.PTSansNarrow_700Bold};
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.LARANJA};
`;

/* Descrição */

export const SectionEditDescricaoUser = styled.View``;

export const UserTextInputDescription = styled.TextInput`
  background-color: white;
`;

export const UserDescricao = styled.Text`
  font-size: ${RFValue(15)}px;
  width: 95%;
  height: 85px;
  font-family: ${({ theme }) => theme.FONTS.PTSansNarrow_700Bold};
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.CINZA_CLARO};
`;

/* Button Edit User */

export const EditUser = styled(TouchableOpacity)``;
