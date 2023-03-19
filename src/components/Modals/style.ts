import styled from "styled-components/native";
import { TouchableOpacity, Modal } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ViewModal = styled.View``;
export const ViewModalInside = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ViewModalInsideSettings = styled.View`
  border: ${({ theme }) => theme.COLORS.HEXTECH_METAL_GOLD.GOLD3};
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.TEXT_and_BACKGROUND.GRAY4};
`;
export const TouchModal = styled(TouchableOpacity)``;
export const TouchModalOptions = styled(TouchableOpacity)``;
export const TouchModalOpen = styled(TouchableOpacity)`
  flex: 1;
`;
export const ModalSettings = styled(Modal)``;
export const TextModal = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.CINZA_CLARO};
  padding: 5px 0;
`;
export const TextModalOptions = styled.Text`
  align-self: center;

  align-items: center;
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.COLORS.COLORS_CONSTRAT.VERDE_AZUL_CLARO};
  font-family: ${({ theme }) => theme.FONTS.DMSans_500Medium_Italic};
`;
export const TouchModalClose = styled(TouchableOpacity)``;
export const TextModalClose = styled.Text`
  align-self: center;
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.COLORS.RED};
`;

export const TextModalIcon = styled.Text``;
/* 
export const = styled. 
export const = styled. 
*/
