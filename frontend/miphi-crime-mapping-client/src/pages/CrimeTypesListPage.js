import React, { useState, useEffect } from "react";
import "./CrimeTypesListPage.css";
import { Button, Form, Accordion } from "react-bootstrap";
import api from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";

const CrimeTypesListPage = () => {
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [isEditingType, setIsEditingType] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    count: 0
  });

  const fetchAllCrimeTypes = async () => {
    try {
      const response = await api.get("/api/crime-types");
      const loadedCrimeTypes = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        link: item.link,
        count: item.count
      }));

      setCrimeTypes(loadedCrimeTypes);
    } catch(error) {
      console.error("Ошибка при загрузке типов преступлений:", error.response);
    }
  };

  useEffect(() => {
      fetchAllCrimeTypes();
  });

  const fetchAddCrimeType = async (crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);
      const payload ={
        title: crimeType.title,
        description: crimeType.description !== "" ? crimeType.description : null,
        link: crimeType.link !== "" ? crimeType.link : null
      }
      const response = await api.post("/api/crime-types", payload);
      console.log(response.data.message);
    
      return {
        id: response.data.id,
        title: crimeType.title,
        description: crimeType.description,
        link: crimeType.link, 
        count: 0
      };

    } catch(error) {
      console.error("Ошибка при добавлении типа преступления:", error.response);
    }
  };

  const fetchUpdateCrimeType = async (id, crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);
      const payload = {
        id: id,
        title: crimeType.title,
        description: crimeType.description !== "" ? crimeType.description : null,
        link: crimeType.link !== "" ? crimeType.link : null
      }
      const response = await api.patch("/api/crime-types", payload);
      console.log(response.data.message);
    
      return {
        id: id,
        title: crimeType.title,
        description: crimeType.description,
        link: crimeType.link
      };

    } catch(error) {
      console.error("Ошибка при редактировании типа преступления:", error.response);
    }
  };

  const fetchDeleteCrimeType = async (id) => {
    try {
      await api.delete(`/api/crime-types/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении типа преступления:", error.response);
    }
  }

  const handleAddCrimeType = () => {
    const newCrimeType = fetchAddCrimeType(formData);
    setCrimeTypes([...crimeTypes, newCrimeType]);
    setFormData({ title: "", description: "", link: "" });
  };

  const handleUpdateCrimeType = (id) => {
    const updateCrimeType = fetchUpdateCrimeType(id, formData);
    setCrimeTypes(
      crimeTypes.map((crimeType) =>
        crimeType.id === id ? { ...crimeType, ...updateCrimeType } : crimeType
      )
    );
    setFormData({ title: "", description: "", link: "" });
    setIsEditingType(null);
  };

  const handleDeleteCrimeType = (id) => {
    fetchDeleteCrimeType(id);
    if(isEditingType !== null && isEditingType.id === id){
      setIsEditingType(null);
      setFormData({ title: "", description: "", link: "" });
    }
    setCrimeTypes(crimeTypes.filter((crimeType) => crimeType.id !== id));
  };

  const handleEdit = (crimeType) => {
    setIsEditingType(crimeType);
    setFormData({ title: crimeType.title, description: crimeType.description, link: crimeType.link });
  };

  const handleSave = () => {
    if (isEditingType) {
      handleUpdateCrimeType(isEditingType.id);
    } else {
      handleAddCrimeType();
    }
  };

  const handleCancel = () => {
    setIsEditingType(null);
    setFormData({ title: "", description: "", link: "", count: 0 });
  };

  return (
    <div className="crime-types-list-page">
      <header className="crime-types-header">
        <h2>Список типов преступлений</h2>
      </header>
      <div className="crime-types-content">
      <Accordion>
        {crimeTypes.map((crimeType) => (
            <Accordion.Item eventKey={crimeType.id} key={crimeType.id}>
            <Accordion.Header>
                <div className="d-flex justify-content-between w-100">
                <span>{crimeType.title}</span>
                <span className="crime-count">({crimeType.count} преступлений на карте)</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <p><strong>Название:</strong> {crimeType.title}</p>
                <strong>Описание:</strong> {crimeType.description === null || crimeType.description === "" ? "-" : <p> {crimeType.description} </p>}
                <p><strong>Количество совершенных преступлений:</strong> {crimeType.count}</p>
                <p>{crimeType.link === null || crimeType.link === "" ? "Ссылка на статью отсутствует" : <a href={crimeType.link} target="_blank" rel="noreferrer">Ссылка на статью</a>}</p>
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
          <h3>{isEditingType ? `Изменение для типа "${isEditingType.title}"` : "Добавление нового типа"}</h3>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ссылка на статью (необязательно)</Form.Label>
            <Form.Control
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание (необязательно)</Form.Label>
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
