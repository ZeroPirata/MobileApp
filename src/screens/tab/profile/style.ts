import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

/*  */
export const Container = styled.View`
  padding-top: 25px;
  height: 100%;
  width: 100%;
`;
export const ProfilePictureView = styled.View`
  height: 50%;
  width: 100%;
`;

/* 
  
*/
export const ContainerHead = styled.View`
  width: 100%;
  height: 50%;
  border-bottom-width: 5px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  background-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE5};
`;
export const BackGroundImageView = styled.View`
  background-color: red;
  height: 150px;
`;
export const ProfilePicture = styled.Image`
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
export const BackGroundImage = styled.Image`
  border-color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.ROSA_CLARO};
  height: 100%;
  width: 100%;
`;

export const ChangeProfilePicture = styled(TouchableOpacity)``;
export const AboutInfo = styled.View`
  padding-top: 50px;
  padding-left: 10px;
  height: 25%;
`;
export const PrimaryInfo = styled.Text`
  font-size: ${RFValue(35)}px;
  height: 115%;
  font-family: ${({ theme }) => theme.FONTS.PTSansNarrow_700Bold};
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.LARANJA};
`;
export const SecondaryInfo = styled.Text`
  font-size: ${RFValue(15)}px;
  width: 95%;
  height: 200%;
  font-family: ${({ theme }) => theme.FONTS.PTSansNarrow_700Bold};
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.CINZA_CLARO};
`;
export const ContainerPost = styled.View``;
export const ContainerButtonCreate = styled.View``;
export const ButtonCreateNewPost = styled(TouchableOpacity)``;
export const ButtonTextCreateNewPost = styled.Text``;
export const ContainerFeed = styled.View``;
export const EditButton = styled(TouchableOpacity)`
  height: 100%;
  width: 100%;
`;
export const IconView = styled.View`
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
export const FeatherIcons = styled(Feather)`
  font-size: ${RFValue(65)}px;
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.VERDE_AZUL_CLARO};
`;

export const FeatherIconsEditName = styled(Feather)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.VERDE_AZUL_CLARO};
`;

export const NameTag = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
