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
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const UserDomain = styled.Text`
  font-size: ${RFValue(10)}px;
  border-top-width: 1px;
  margin-top: 10px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  padding: 10px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
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
  margin-top: 25px;
  width: 85%;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
  align-self: center;
`;
export const ButtoSeeMore = styled(TouchableOpacity)``;
export const EditPostButton = styled(TouchableOpacity)``;
export const DeletePostButton = styled(TouchableOpacity)``;
export const ViewButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TextButtons = styled.Text``;

/* Section Comentario */

export const CommentSection = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  border: 1px solid blue;
  align-items: center;
  justify-content: center;
  width: 80%;
`;
export const CreateComentario = styled.TextInput`
  margin: 15px 10px;
  border: 1px solid red;
  width: ${RFValue(175)}px;
`;
export const ImageUserComment = styled.Image`
  border-radius: 50px;
  width: 35px;
  height: 35px;
`;
export const ButtonSendComment = styled(TouchableOpacity)`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 25px;
  width: 50px;
  background-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  font-size: ${RFValue(15)}px;
`;
export const TextButtonSend = styled.Text``;
/* 
export const  = styled.``
 */
