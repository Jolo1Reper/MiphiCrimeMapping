import React, { useState } from "react";
import "./WantedPersonsPage.css";
import { Button, Form, Accordion } from "react-bootstrap";

const WantedPersonsPage = () => {
  const [wantedPersons, setWantedPersons] = useState([
    { 
      id: 1, 
      name: "Иван", 
      surname: "Иванов", 
      birthDate: "1985-06-15", 
      description: "Преступник, подозревается в краже",
      count: 2
    },
    { 
      id: 2, 
      name: "Петр", 
      surname: "Петров", 
      birthDate: "1990-03-22", 
      description: "Разыскивается за мошенничество",
      count: 5
    },
    { 
      id: 3, 
      name: "Сергей", 
      surname: "Сергеев", 
      birthDate: "1978-11-01", 
      description: "Подозревается в грабежах",
      count: 3
    },
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    description: "",
  });

  const handleAddWantedPerson = () => {
    const newPerson = {
      id: Date.now(),
      ...formData,
    };
    setWantedPersons([...wantedPersons, newPerson]);
    setFormData({ name: "", surname: "", birthDate: "", description: "" });
  };

  const handleUpdateWantedPerson = (id) => {
    setWantedPersons(
      wantedPersons.map((person) =>
        person.id === id ? { ...person, ...formData } : person
      )
    );
    setFormData({ name: "", surname: "", birthDate: "", description: "" });
    setIsEditing(null);
  };

  const handleDeleteWantedPerson = (id) => {
    setWantedPersons(wantedPersons.filter((person) => person.id !== id));
  };

  const handleEdit = (person) => {
    setIsEditing(person.id);
    setFormData({
      name: person.name,
      surname: person.surname,
      birthDate: person.birthDate,
      description: person.description,
    });
  };

  const handleSave = () => {
    if (isEditing) {
      handleUpdateWantedPerson(isEditing);
    } else {
      handleAddWantedPerson();
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ name: "", surname: "", birthDate: "", description: "" });
  };

  return (
    <div className="wanted-persons-page">
      <header className="wanted-persons-header">
        <h2>Разыскиваемые лица</h2>
      </header>
      <div className="wanted-persons-content">
      <Accordion>
        {wantedPersons.map((wantedPerson) => (
          <Accordion.Item eventKey={wantedPerson.id.toString()} key={wantedPerson.id}>
            <Accordion.Header>
              {/* Заголовок */}
              <div className="d-flex justify-content-between w-100">
                <span>{wantedPerson.name} {wantedPerson.surname} {wantedPerson.birthDate}</span>
                <span className="wanted-count">({wantedPerson.count} преступления на карте)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {/* Разворачиваемое содержимое */}
              <p>
                <strong>Имя:</strong> {wantedPerson.name} <br />
                <strong>Фамилия:</strong> {wantedPerson.surname} <br />
                <strong>Дата рождения:</strong> {wantedPerson.birthDate} <br />
                <strong>Описание:</strong> {wantedPerson.description}
              </p>
              {/* Кнопки действий */}
              <div className="button-group">
                <Button variant="primary" size="sm" onClick={() => handleEdit(wantedPerson)}>
                  Изменить
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteWantedPerson(wantedPerson.id)}>
                  Удалить
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
        <div className="add-new-wanted-person">
          <h3>Добавить разыскиваемого</h3>
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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

export default WantedPersonsPage;
