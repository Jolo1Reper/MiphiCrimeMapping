import React, { useState, useEffect } from "react";
import "./CrimeTypesListPage.css";
import { Button, Form, Accordion, Card } from "react-bootstrap";
import api from "../api";

// [
//   { id: 1, title: "Кража", description: "Незаконное завладение чужим имуществом", count: 5 },
//   { id: 2, title: "Грабеж", description: "Открытое хищение чужого имущества", count: 2 },
//   { id: 3, title: "Мошенничество", description: "Обман или злоупотребление доверием", count: 3 },
// ]

const CrimeTypesListPage = () => {
  const [crimeTypes, setCrimeTypes] = useState([]);

  const [isEditing, setIsEditing] = useState(null); // ID редактируемого типа преступления
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchAllCrimeTypes = async () => {
    try {
      const response = await api.get("/api/crime-types");
      const loadedCrimeTypes = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: "",
        link: null,
        count: 0
      }));

      setCrimeTypes(loadedCrimeTypes);
    } catch(error) {
      console.error("Ошибка при загрузке типов преступлений:", error.response);
    }
  }

  // const fetchSelectCrimeType = async (id) => {
  //   try {
  //     const response = await api.get(`/api/crime-types/${id}`);
  //     const selectCrimeType = response.data;
      
  //     console.log(crimeTypes);

  //     setCrimeTypes(
  //       crimeTypes.map((crimeType) =>
  //         crimeType.id === id 
  //         ? { ...crimeType, id: crimeType.id, title: selectCrimeType.title, description: selectCrimeType.description } 

  //         : crimeType
  //       )
  //     );
  //   } catch(error) {
  //     console.error("Ошибка при загрузке типа преступления: ", error.response);
  //   } 
  // }

  useEffect(() => {
      fetchAllCrimeTypes();
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
            <Accordion.Item eventKey={crimeType.id} key={`${crimeType.id}`}>
            <Accordion.Header>
                <div className="d-flex justify-content-between w-100">
                <span>{crimeType.title}</span>
                <span className="crime-count">({crimeType.count} преступлений на карте)</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <p>Название: {crimeType.title}</p>
                <p>Описание:</p>
                <p>{crimeType.description}</p>
                <p>Количество преступлений на карте: {crimeType.count}</p>
                <p>Статья: {crimeType.link === null || crimeType.link === "" ? "отсутствует" : <a href={crimeType.link}>ссылка</a>}</p>
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
          <Button className="me-2 btn btn-primary me-2" onClick={handleSave}>
            Сохранить
          </Button>
          <Button className="btn btn-secondary me-2" onClick={handleCancel}>
            Отменить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrimeTypesListPage;
