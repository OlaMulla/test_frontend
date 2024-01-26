

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WarningDialog(props) {
  return (
    <Modal show={props.isOpened} onHide={props.onCancel}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onConfirm}>
          {props.confirmLabel ?? "OK"}
        </Button>
        {props.withCancel && (
          <Button variant="secondary" onClick={props.onCancel}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default WarningDialog;
