import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const HeaderView = styled.View`
  padding: 10px;
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY3};
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  border-bottom-width: 2.5px;
  border-right-width: 1.5px;
  border-left-width: 1.5px;
`;
export const NameUser = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
`;
export const ContainerNicks = styled.View`
  width: 85%;
`;
export const ContainerPicture = styled.View`
  width: 15%;
  align-items: center;
`;
export const ContainerIcone = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 85%;
`;
export const Photo = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 150px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE4};
  border-width: 2px;
`;
export const SearchBarIcon = styled(TouchableOpacity)`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE4};
  border-width: 1.5px;
  border-radius: 5px;
  width: 70%;
`;
export const PlusIcon = styled(TouchableOpacity)`
  justify-content: center;
  justify-items: center;
  display: flex;
  flex-direction: row;
  width: 25%;
`;
export const TextInputSearch = styled.TextInput`
  height: 100%;
  color: ${({ theme }) => theme.COLORS.WHITE};
  width: 75%;
`;
export const ButtonCreatePost = styled(TouchableOpacity)``;
