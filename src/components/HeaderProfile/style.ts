import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HeaderView = styled.View`
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  border-color: ${({ theme }) => theme.COLORS.GRAY2};
  border-bottom-width: ${RFValue(2.5)}px;
  flex-direction: row;
  align-items: center;
  min-height: ${RFValue(50)}px;
  padding: ${RFValue(10)}px;
  display: flex;
  width: 100%;
`;
export const NameUser = styled.Text`
  color: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  font-family: ${({ theme }) => theme.FONTS.DMSans_700Bold};
  font-size: ${RFValue(20)}px;
`;
export const ContainerNicks = styled.View`
  width: 85%;
`;
export const ContainerPicture = styled.View`
  align-items: center;
  width: 15%;
`;
export const ContainerIcone = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 85%;
`;
export const Photo = styled.Image`
  border-color: ${({ theme }) => theme.COLORS.HEXTECH_MAGIC_BLUE.BLUE4};
  border-radius: ${RFValue(150)}px;
  border-width: ${RFValue(2)}px;
  height: ${RFValue(45)}px;
  width: ${RFValue(45)}px;
`;
export const SearchBarIcon = styled(TouchableOpacity)`
  border-color: ${({ theme }) => theme.COLORS.MAINBorder};
  border-width: ${RFValue(2.5)}px;
  border-radius: ${RFValue(15)}px;
  justify-content: space-between;
  padding: 0 ${RFValue(15)}px;
  height: ${RFValue(40)}px;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 70%;
`;
export const PlusIcon = styled(TouchableOpacity)`
  justify-content: center;
  justify-items: center;
  flex-direction: row;
  display: flex;
  height: 100%;
  width: 25%;
`;
export const TextInputSearch = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.WHITE};
  height: 100%;
  width: 75%;
`;
export const ButtonCreatePost = styled(TouchableOpacity)``;
