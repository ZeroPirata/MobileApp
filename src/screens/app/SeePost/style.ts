import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

/* Body */

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-top: ${RFValue(25)}px;
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
`;

/* Section da Postagem View */

export const PostPub = styled.View`
  margin-top: 25px;
  width: 90%;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
  align-self: center;
`;

export const TitlePoster = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const UserDomain = styled.Text`
  font-size: ${RFValue(10)}px;
`;
export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  padding: 10px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;

/* Section LikeButton/Comentarios */

export const LikeButtonPost = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const LikeButtonPostView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const QuantidadeDeComentario = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const LikeCounts = styled.Text`
  font-size: ${RFValue(25)}px;
`;

/* Section Footer */

export const FooterPostagem = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

/* Section Butons do Usuario Dono Postagem */

export const ButtoSeeMore = styled(TouchableOpacity)``;
export const EditPostButton = styled(TouchableOpacity)``;
export const DeletePostButton = styled(TouchableOpacity)``;
export const ViewButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TextButtons = styled.Text``;

/* Section Image */

export const ImageFlatListConfig = styled.View`
  height: 250px;
`;
export const ImageSettings = styled.View`
  width: 100%;
  height: 200px;
  margin: 0;
  padding: 0;
`;
export const ImageConfig = styled.Image`
  width: 100%;
  height: 100%;
`;

/* Section Comentario */

export const CommentSection = styled.View`
  height: 70px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
`;
export const CreateComentario = styled.TextInput`
  margin: 15px 10px;
  width: 60%;
  padding: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const ImageUserComment = styled.Image`
  border-radius: 50px;
  width: 50px;
  height: 50px;
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

/* Section Listagem de Comentarios */

export const ListagemDeComentarioNaPostagem = styled.View`
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 90%;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  margin-bottom: 70px;
`;

export const SessaoDeComentario = styled.View`
  width: 100%;
`;
export const Comentarios = styled.View`
  display: flex;
  flex-direction: row;
`;
export const TextSection = styled.View`
  display: flex;
  margin: 10px 0;
  width: 80%;
`;
export const UsuarioComentarioEmail = styled.Text`
  margin-top: 3px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const TempoDoComentario = styled.Text`
  color: ${({ theme }) => theme.COLORS.ROYAL_BLUE.COLOR_4};
  font-size: ${RFValue(10)}px;
`;
export const Textos = styled.Text`
  font-size: ${RFValue(18)}px;
`;
export const ImageUsersComment = styled.Image`
  border-radius: 50px;
  width: 35px;
  height: 35px;
  align-self: center;
  margin: 10px;
`;

/* 
export const  = styled.``
 */
