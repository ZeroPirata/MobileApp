import styled from "styled-components/native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

/* Body */

export const Body = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.MAINBorder};
  padding-bottom: 10px;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  padding-top: ${RFValue(25)}px;
  height: 100%;
  width: 100%;
`;

export const UserNameName = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(25)}px;
  width: 90%;
`;
export const DataPost = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin: 0px ${RFValue(15)}px;
  font-size: ${RFValue(10)}px;
  width: 90%;
`;

export const ViewRenderImages = styled.View``;
export const BodyContent = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin: 0px ${RFValue(15)}px;
  font-size: ${RFValue(18)}px;
  width: 90%;
`;

export const SafeAreaViewContent = styled.View`
  margin: 0px ${RFValue(15)}px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

export const Comment = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.MAINLineCross};
  margin: ${RFValue(7)}px 0;
`;
export const UserAndTime = styled.View`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;
export const CommentSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 100%;
`;
export const ListComment = styled.View``;

export const CreateCommentSection = styled.View`
  height: ${RFValue(70)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.MAINBorder};
  background-color: ${({ theme }) => theme.COLORS.MAIN};
`;
export const ImageUsersComment = styled.Image`
  border-radius: ${RFValue(50)}px;
  width: ${RFValue(35)}px;
  height: ${RFValue(35)}px;
  margin: 0 ${RFValue(10)}px;
`;
export const ImageUserComment = styled.Image`
  border-radius: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  width: ${RFValue(50)}px;
`;
export const ButtonSendComment = styled(TouchableOpacity)`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: ${RFValue(25)}px;
  width: ${RFValue(50)}px;
`;
export const TextButtonSend = styled.Text``;
export const UserName = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const TimeComment = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const CommentText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-bottom: 10px;
`;
export const TextCommentsSection = styled.View`
  width: 80%;
`;
export const UserDeleteComment = styled(TouchableOpacity)``;
export const CreateComentario = styled.TextInput`
  margin: 15px 10px;
  width: 60%;
  padding: 10px;
  border-width: 1px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const ButtonLike = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40%;
`;
export const LikeCount = styled.Text`
  margin: 0 10px;
`;
export const CommentariosShow = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
`;
