import React, { useState } from "react";
import "./CrimeTypesListPage.css";
import { Button, Form, Accordion, Card } from "react-bootstrap";

// { crimeTypes, onAddCrimeType, onUpdateCrimeType, onDeleteCrimeType }
const CrimeTypesListPage = () => {
  const [crimeTypes, setCrimeTypes] = useState([
    { id: 1, title: "Кража", description: "Незаконное завладение чужим имуществом", count: 5 },
    { id: 2, title: "Грабеж", description: "Открытое хищение чужого имущества", count: 2 },
    { id: 3, title: "Мошенничество", description: "Обман или злоупотребление доверием", count: 3 },
  ]);
  const [isEditing, setIsEditing] = useState(null); // ID редактируемого типа преступления
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleAddCrimeType = () => {
    const newCrimeType = {
      id: Date.now(), // Генерация уникального ID
      title: formData.title,
      description: formData.description,
      count: 0, // Новые типы преступлений не отображаются на карте сразу
    };
    setCrimeTypes([...crimeTypes, newCrimeType]);
    setFormData({ title: "", description: "" });
  };

  const handleUpdateCrimeType = (id) => {
    setCrimeTypes(
      crimeTypes.map((crimeType) =>
        crimeType.id === id ? { ...crimeType, ...formData } : crimeType
      )
    );
    setFormData({ title: "", description: "" });
    setIsEditing(null);
  };

  const handleDeleteCrimeType = (id) => {
    setCrimeTypes(crimeTypes.filter((crimeType) => crimeType.id !== id));
  };

  const handleEdit = (crimeType) => {
    setIsEditing(crimeType.id);
    setFormData({ title: crimeType.title, description: crimeType.description });
  };

  const handleSave = () => {
    if (isEditing) {
      handleUpdateCrimeType(isEditing);
    } else {
      handleAddCrimeType();
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="crime-types-list-page">
      <header className="crime-types-header">
        <h2>Список типов преступлений</h2>
      </header>
      <div className="crime-types-content">
      <Accordion>
        {crimeTypes.map((crimeType) => (
            <Accordion.Item eventKey={crimeType.id.toString()} key={crimeType.id}>
            <Accordion.Header>
                <div className="d-flex justify-content-between w-100">
                <span>{crimeType.title}</span>
                <span className="crime-count">({crimeType.count} преступления на карте)</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <p>{crimeType.description}</p>
                {/* Кнопки для редактирования и удаления */}
                <div className="button-group">
                <Button variant="primary" size="sm" onClick={() => handleEdit(crimeType)}>
                    Изменить
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteCrimeType(crimeType.id)}>
                    Удалить
                </Button>
                </div>
            </Accordion.Body>
            </Accordion.Item>
        ))}
        </Accordion>
        <div className="add-new-crime-type">
          <h3>Добавить новый тип</h3>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Button className="me-2" onClick={handleSave}>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrimeTypesListPage;
