import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';

type PropsTypeModal = {
  cancelHand: () => void;
  showModalAdd: () => void;
};

export default function ModalAddProj({ cancelHand, showModalAdd }: PropsTypeModal): JSX.Element {
  return (
    <Modal isOpen={showModalAdd} toggle={cancelHand}>
      <ModalHeader>Редактирование проекта</ModalHeader>

      <ModalBody>aaaaaaa</ModalBody>
      <ModalFooter>
        <Button color="info" onClick={cancelHand}>
          Отмена
        </Button>
        <Button color="info" type="submit">
          ОK
        </Button>
      </ModalFooter>
    </Modal>
  );
}
