import React, { ReactNode } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { ModalSize } from "../../lib/model/Model";

interface Props {
  show: boolean;
  htmlId: string;
  title: string;
  shouldHide: (hide: boolean) => void;
  component?: ReactNode;
  showModalHeader?: boolean;
  modalSize?: ModalSize;
}

const GenericModal: React.FC<Props> = ({
  show,
  component,
  htmlId,
  title,
  shouldHide,
  showModalHeader = true,
  modalSize = ModalSize.MEDIUM,
}) => {
  return (
    <Modal
      show={show}
      id={htmlId}
      centered
      backdrop={true}
      onHide={() => {
        shouldHide(true);
      }}
      className={modalSize}
    >
      {showModalHeader && (
        <ModalHeader className="text-capitalize">{title}</ModalHeader>
      )}
      <ModalBody>{component}</ModalBody>
    </Modal>
  );
};

export default GenericModal;
