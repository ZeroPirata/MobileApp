import styled from "styled-components/native";
import { TouchableOpacity, Modal } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ViewModal = styled.View``;
export const ViewModalInside = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
export const ViewModalInsideSettings = styled.View`
  border: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  padding: 20px;
`;
export const TouchModal = styled(TouchableOpacity)``;
export const TouchModalOptions = styled(TouchableOpacity)``;
export const TouchModalOpen = styled(TouchableOpacity)``;
export const ModalSettings = styled(Modal)``;
export const TextModal = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.CINZA_CLARO};
  padding: 5px 0;
`;
export const TextModalOptions = styled.Text`
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.VERDE_AZUL_CLARO};
  font-family: ${({ theme }) => theme.FONTS.DMSans_500Medium_Italic};
  font-size: ${RFValue(25)}px;
  align-items: center;
  align-self: center;
`;
export const TouchModalClose = styled(TouchableOpacity)``;
export const TextModalClose = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED};
  font-size: ${RFValue(25)}px;
  align-self: center;
`;

export const TextModalIcon = styled.Text``;
