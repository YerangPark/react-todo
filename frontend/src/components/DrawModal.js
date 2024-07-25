import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function DrawModal(props) {
  if (!props.todo) return null; // 투두가 없으면 아무 것도 렌더링하지 않음
  const [editValue, setEditValue] = useState(props.todo.contents);
  useEffect(() => {
    setEditValue(props.todo.contents);
  }, [props.todo]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          id="inputTodo"
          aria-describedby="todoInputBlock"
          placeholder="Type..."
          className="mb-3"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)} // TODO : 추후 length 제한 걸기. 300자?
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {props.onSave(props.todo.id, editValue); props.onHide()}}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DrawModal;