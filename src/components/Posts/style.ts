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

export const TextButtonSeeMore = styled.Text`
  margin: 5px 0;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_400Regular};
  color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE1};
`;

export const ButtonSeeMore = styled(TouchableOpacity)``;

/* Data Section */

export const DataView = styled.View`
  display: flex;
  flex-direction: row;
`;
export const DateTime = styled.Text`
  color: ${({ theme }) => theme.COLORS.ROYAL_BLUE.COLOR_4};
  font-size: ${RFValue(10)}px;
`;

/* Image Section */

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

/* Buttons Section Edit / Delete */

export const CointaienrButton = styled.View`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

export const TextButtons = styled.Text`
  background-color: ${({ theme }) => theme.COLORS.GRAY2};
`;

export const DeletePostButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
`;

export const EditPostButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100px;
`;

export const TextButtonsView = styled.View`
  width: 0;
  height: 0;
  background-color: "transparent";
  border-style: solid;
  border-top-width: 10px;
  border-right-width: 10px;
  border-bottom-width: 10px;
  border-left-width: 0px;
  border-top-color: transparent;
  border-right-color: ${({ theme }) => theme.COLORS.GRAY2};
  border-bottom-color: transparent;
  border-left-color: transparent;
`;
export const TextButtonsViewDireita = styled.View`
  width: 0;
  height: 0;
  background-color: "transparent";
  border-style: solid;
  border-top-width: 10px;
  border-right-width: 10px;
  border-bottom-width: 10px;
  border-left-width: 0px;
  border-top-color: transparent;
  border-right-color: ${({ theme }) => theme.COLORS.GRAY2};
  border-bottom-color: transparent;
  border-left-color: transparent;
`;
export const TextButtonsViewEsquerda = styled.View`
  width: 0;
  height: 0;
  background-color: "transparent";
  border-style: solid;
  border-top-width: 10px;
  border-right-width: 0px;
  border-bottom-width: 10px;
  border-left-width: 10px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: ${({ theme }) => theme.COLORS.GRAY2};
`;

/* Likes Section */

export const LikeAndDeslikeButton = styled.View`
  margin-top: 3px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;

export const LikeCounts = styled.Text`
  font-size: ${RFValue(15)}px;
`;
export const ButtonLike = styled(TouchableOpacity)``;
/* 
export const  = styled.``
 */
