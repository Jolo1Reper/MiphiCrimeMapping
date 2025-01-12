// MarkerModal.js
import React from "react";
import './MarkerModal.css'
const MarkerModal = ({ selectedPoint, onClose, onEdit, onDelete }) => {
  if (!selectedPoint) return null;

  const handleClose = () => {
    onClose(); // Закрыть модальное окно
  };

  const handleEdit = () => {
    onEdit(selectedPoint); // Вызвать onEdit с выбранной меткой
    onClose(); // Закрыть модальное окно
  };

  const handleDelete = () => {
    onDelete(selectedPoint); // Вызвать onDelete с выбранной меткой
    onClose(); // Закрыть модальное окно
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Выбор действия</h4>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Метка:</strong> {selectedPoint.title}
          </p>
          <p>
            <strong>Местонахождение:</strong> {selectedPoint.location}
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={handleEdit}>
            Изменить
          </button>
          <button className="btn delete" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
