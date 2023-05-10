import { TouchableOpacity, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  border-bottom-color: ${({ theme }) => theme.COLORS.MAINLineCross};
  border-bottom-width: 1px;
  margin: ${RFValue(5)}px 0;
  align-self: center;
  width: 100%;
`;
export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: ${RFValue(15)}px;
  font-size: ${RFValue(25)}px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
`;
export const PostData = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: ${RFValue(15)}px;
  font-size: ${RFValue(10)}px;
  width: 90%;
`;
export const BodyContent = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: ${RFValue(15)}px;
  font-size: ${RFValue(18)}px;
  width: 90%;
`;

export const ImagesRenderView = styled.View``;
export const ImagesRender = styled(Image)``;
export const ImageViewControll = styled.View``;
export const FooterPostSettings = styled.View`
  justify-content: space-between;
  margin: ${RFValue(10)}px 0;
  flex-direction: row;
  align-items: center;
  text-align: center;
  display: flex;
`;
export const ButtonLike = styled(TouchableOpacity)`
  width: ${RFValue(50)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  display: flex;
`;
export const LikeCount = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: ${RFValue(5)}px;
  font-size: ${RFValue(20)}px;
`;

export const ButtonSeeMore = styled(TouchableOpacity)``;
export const TextButtonSeeMore = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(20)}px;
`;
