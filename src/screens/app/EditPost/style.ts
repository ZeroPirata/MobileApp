import { TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ButtonRemoveImage = styled(TouchableOpacity)``;
export const ButtonAddImageText = styled.Text``;
export const ButtonAddFileText = styled.Text``;
export const TextLoading = styled.Text``;
export const ViewLoading = styled.View``;
/*  */
export const FileName = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const FileSize = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const FileType = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const FlatListImage = styled(FlatList)`
  display: flex;
`;

export const TextSend = styled.Text`
  font-size: ${RFValue(15)}px;
`;
/*  */
export const FileSettings = styled.View`
  margin: 0 ${RFValue(15)}px;
  display: flex;
`;

export const ImageLoading = styled(Image)`
  width: 125px;
  height: 125px;
`;

export const CreatePostTextView = styled.View`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const ControllerButtonsFileImages = styled.View`
  justify-content: space-around;
  flex-direction: row;
  display: flex;
  width: 80%;
`;

export const CreatePostText = styled(TextInput)`
  color: ${({ theme }) => theme.COLORS.WHITE};
  border-color: ${({ theme }) => theme.COLORS.MAINBorder};
  padding: ${RFValue(5)}px;
  border-radius: 10px;
  border-width: 2px;
  width: 80%;
`;

export const SelectPickerView = styled.View`
  border-color: ${({ theme }) => theme.COLORS.MAINBorder};
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  margin: 15px;
  width: 80%;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  padding-top: ${RFValue(25)}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const ButtonAddImage = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.MAINFill};
  justify-content: space-evenly;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 40%;
`;

export const ButtonAddFile = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.MAINFill};
  justify-content: space-evenly;
  height: ${RFValue(35)}px;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
  align-items: center;
  display: flex;
  width: 40%;
`;

export const ControlleViewImageRender = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAINBackground};
  margin: ${RFValue(15)}px;
  flex-direction: row;
  border-radius: 15px;
  display: flex;
  height: 20%;
  width: 90%;
`;
export const ImageLeyoutUpload = styled.View`
  justify-content: center;
  flex-direction: row;
  align-self: center;
  display: flex;
  margin: 10px;
`;

export const ControllViewFilesRender = styled.View`
  margin: ${RFValue(15)}px 0;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 80%;
`;

export const ButtonSend = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.MAINFill};
  margin-top: ${RFValue(10)}px;
  width: ${RFValue(150)}px;
  height: ${RFValue(35)}px;
  justify-content: center;
  border-radius: 35px;
  align-items: center;
  display: flex;
`;
