import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
  width: 100%;
  height: 100%;
  padding-top: ${RFValue(25)}px;
`;
export const TitlePoster = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const UserDomain = styled.Text`
  font-size: ${RFValue(10)}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const Description = styled.Text`
  margin-top: 5px;
`;
export const ImageSettings = styled.View`
  display: flex;
  flex-direction: row;
`;
export const ImageConfig = styled.Image`
  justify-content: center;
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
export const PostPub = styled.View`
  margin: 25px 0;
  width: 85%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
  align-self: center;
`;
export const ButtoSeeMore = styled(TouchableOpacity)``;
/* 
export const  = styled.``
 */
