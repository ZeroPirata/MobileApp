import { TouchableOpacity, FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY5};
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
export const CreatePostHeader = styled.View`
  align-self: center;
  padding: 10px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-width: 1px;
  border-radius: 10px;
  width: 80%;
`;
export const CreatePostText = styled.TextInput`
  height: 50px;
  padding: 5px;
  font-size: ${RFValue(35)}px;
  color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE4};
`;
export const CreateBody = styled.TextInput`
  color: white;
  height: 150px;
  margin-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE4};
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const HeaderBackButton = styled.View`
  position: absolute;
  top: ${RFValue(25)}px;
  bottom: 0;
  right: 0;
  left: 0;
`;
export const ButtonImage = styled.View`
  margin-top: 10px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
`;
export const ButtonUploadFile = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonArrowBack = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const FlatListImage = styled(FlatList)`
  display: flex;
`;
export const ButtonRemoveImage = styled(TouchableOpacity)``;
export const ViewLoading = styled.View`
  margin: 0 auto;
  align-self: center;
`;
export const TextLoading = styled.Text`
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  font-family: ${({ theme }) => theme.FONTS.Poppins_600SemiBold_Italic};
  font-size: ${RFValue(35)}px;
`;
export const ImageLeyoutUpload = styled.View`
  margin-top: 15px;
  height: ${RFValue(150)}px;
`;

export const ImageLoading = styled.Image`
  margin: 0 10px;
  width: 145px;
  height: ${RFValue(147)}px;
`;
export const ImageLoadingView = styled.View``;
export const ButtonSendPost = styled(TouchableOpacity)`
  margin-top: 10px;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-items: center;
  width: 150px;
  height: 60px;
`;
export const ButtonSendPostText = styled.Text`
  text-align: center;
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_500Medium};
`;
/* 
export const CreatePostText = styled.View``;
*/
