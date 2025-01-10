import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPointModal = ({ show, point, onSave, onDelete, onCancel }) => {
  const [formData, setFormData] = useState({
    title: point?.title || "",
    location: point?.location || "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    onSave({ ...point, ...formData });
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(point);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Редактировать метку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Введите название"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Местоположение</Form.Label>
                <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Введите местоположение"
                />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
            Сохранить
            </Button>
            <Button variant="danger" onClick={handleDelete}>
            Удалить
            </Button>
            <Button variant="secondary" onClick={onCancel}>
            Отмена
            </Button>
        </Modal.Footer>
        </Modal>

        <Modal show={showConfirm} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены, что хотите удалить метку <strong>{point?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Удалить
          </Button>
          <Button variant="secondary" onClick={cancelDelete}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
};

export default EditPointModal;
