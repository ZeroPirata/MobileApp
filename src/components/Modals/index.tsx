import { ModalSettings, TextModal, TextModalClose, TextModalOptions, TouchModal, TouchModalClose, TouchModalOpen, TouchModalOptions, ViewModal, ViewModalInside, ViewModalInsideSettings, } from "./style";
import { ModalsProps } from "../../interfaces/ModalInterface";
import { Feather, } from "@expo/vector-icons";
import { useState } from "react";

export const Modals = ({ options, iconSize, iconNameFeater }: ModalsProps) => {
  const [modalView, setModalView] = useState(false);

  const handleModalOpen = () => {
    setModalView(true);
  };

  const handleModalClose = () => {
    setModalView(false);
  };

  return (
    <ViewModal>
      <TouchModal onPress={handleModalClose}>
        <ModalSettings
          animationType="slide"
          transparent={true}
          visible={modalView}
          onRequestClose={handleModalClose}
        >
          <ViewModalInside>
            <ViewModalInsideSettings>
              <TextModalOptions>Options</TextModalOptions>
              {options.map((index, key) => {
                return (
                  <TouchModalOptions
                    key={key}
                    onPress={() => {
                      handleModalClose();
                      index.function();
                    }}
                  >
                    <TextModal>{index.name}</TextModal>
                  </TouchModalOptions>
                );
              })}
              <TouchModalClose onPress={handleModalClose}>
                <TextModalClose>Fechar</TextModalClose>
              </TouchModalClose>
            </ViewModalInsideSettings>
          </ViewModalInside>
        </ModalSettings>
      </TouchModal>
      <TouchModalOpen onPress={handleModalOpen}>
        <Feather name={iconNameFeater} size={iconSize} color="white" />
      </TouchModalOpen>
    </ViewModal>
  );
};
