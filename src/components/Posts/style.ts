import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY4};
  margin: 15px 0;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  align-self: center;
  width: 80%;
  padding: 10px;
`;
export const TitlePoster = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  font-size: ${RFValue(25)}px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const UserDomain = styled.Text`
  margin-top: 3px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const Description = styled.Text`
  margin-top: 5px;
`;
export const ImageSettings = styled.View`
  justify-content: center;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
export const ImageConfig = styled.Image`
  width: 50%;
  height: 100%;
  margin: 5px;
  object-fit: contain;
`;
export const ButtonSeeMore = styled(TouchableOpacity)``;
export const DeletePostButton = styled(TouchableOpacity)``;
export const EditPostButton = styled(TouchableOpacity)``;

export const TextButtonSeeMore = styled.Text`
  margin: 5px 0;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_400Regular};
  color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE1};
`;
/* 
export const  = styled.``
 */
