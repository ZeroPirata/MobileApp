import styled from "styled-components/native";
import {TextInput, TouchableOpacity, Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
export const Container = styled.View`
  padding-top: 35px;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.MAIN};
  align-items: center;
  justify-content: center;
`;
export const ContainerGrupo = styled.View`
  width: 80%;
`;

export const TextInputNameStld = styled(TextInput)`
  border-color: ${({theme}) => theme.COLORS.MAINBorder};
  border-width: 3px;
  margin: 5px;
  border-radius: 15px;
  padding: 0px 15px;
  height: ${RFValue(45)}px;
  color: white;
  font-size: ${RFValue(20)}px;
`;
export const AddMembroGrupoInput = styled(TextInput)`
  border-color: ${({theme}) => theme.COLORS.MAINBorder};
  border-width: 3px;
  margin: 5px;
  width: 60%;
  border-radius: 15px;
  padding: 0px 15px;
  height: ${RFValue(45)}px;
  color: white;
  font-size: ${RFValue(15)}px;
`;
export const TextInputDescStld = styled(TextInput)`
  color: white;
  border-color: ${({theme}) => theme.COLORS.MAINBorder};
  border-width: 3px;
  margin: 5px;
  border-radius: 15px;
  padding: 5px 15px;
  height: ${RFValue(125)}px;
`;
export const CreateGrupoBtn = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.MAINFill};
  border-radius: 15px;
  justify-content: center;
  align-self: center;
  width: 150px;
  height: 45px;
`;
export const AddImageStld = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const AddImageGrupo = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.MAINFill};
  border-radius: 15px;
  width: 100px;
  height: 45px;
  align-items: center;
  margin: 5px 0;
  justify-content: center;
`;
export const ImageSelect = styled(Image)`
  border: 3px solid ${({theme}) => theme.COLORS.MAINChat2};
  border-radius: 15px;
  margin: 5px;
  width: 150px;
  height: 150px;
`;

export const ButtonsImageStld = styled.View``;
export const ButtonAddMembro = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.COLORS.MAINFill};
  border-radius: 15px;
  width: 100px;
  height: 45px;
  align-items: center;
  margin: 5px 0;
  justify-content: center;
`;
export const AddMembroGrupo = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;
export const ViewListMembros = styled.View`
  border: 3px solid ${({theme}) => theme.COLORS.MAINFill};
  padding: 15px;
  border-radius: 15px;
`;
