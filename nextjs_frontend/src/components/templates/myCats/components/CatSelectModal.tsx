import type { FC } from "react";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Wrap } from "@chakra-ui/react";

import { useStore } from "@/store/store";

import DisplayCat from "./DisplayCat";

const CatSelectModal: FC<CatSelectModalProps> = ({ isOpen, onClose, setCat, otherParent, isMarket }) => {
  const { userCats, catsWithoutOffer } = useStore();

  const catToRender = isMarket ? catsWithoutOffer : userCats;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent w="80%">
        <ModalHeader>Select a cat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrap w={"100%"} justify="center" m="auto" p={5}>
            {catToRender?.map((cat: Cat, index: number) => {
              if (!otherParent || Number(cat.indexId) !== Number(otherParent.id)) {
                return (
                  <DisplayCat
                    dnaBN={cat.genes}
                    key={index}
                    id={Number(cat.indexId)}
                    generation={Number(cat.generation)}
                    selectable={true}
                    setSelected={setCat}
                    onClose={onClose}
                  />
                );
              }
            })}
          </Wrap>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CatSelectModal;
