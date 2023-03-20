import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ModalsProps } from "../../interfaces/ModalInterface";
import {
  ModalSettings,
  TextModal,
  TextModalClose,
  TextModalIcon,
  TextModalOptions,
  TouchModal,
  TouchModalClose,
  TouchModalOpen,
  TouchModalOptions,
  ViewModal,
  ViewModalInside,
  ViewModalInsideSettings,
} from "./style";

const Modals = ({ options, icon_size }: ModalsProps) => {
  const [modalView, setModalView] = useState(false);
  const modalRef = useRef(null);

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
        <Feather name="settings" size={icon_size} color="white" />
      </TouchModalOpen>
    </ViewModal>
  );
};
export { Modals };
