import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddPointModal = ({
  show,
  onHide,
  onSave,
  crimeTypes = [],
  wantedPersons = [],
  currentPoint,
}) => {
  const [formData, setFormData] = useState({
    crimeTypeId: "",
    wantedPersonId: "",
    wantedPersonName: "",
    wantedPersonSurname: "",
    wantedPersonBirthDate: "",
    crimeDate: new Date().toISOString().split("T")[0],
    location: "",
    pointLatitude: "",
    pointLongitude: "",
  });

  useEffect(() => {
    if (currentPoint) {
      setFormData((prev) => ({
        ...prev,
        pointLatitude: currentPoint.coords[0],
        pointLongitude: currentPoint.coords[1],
      }));
    }
  }, [currentPoint]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    try {
        if (currentPoint) {
          const payload = {
            ...formData,
            wantedPersonId: formData.wantedPersonId || null,
            wantedPersonBirthDate: new Date(formData.wantedPersonBirthDate).toISOString(),
            crimeDate: new Date(formData.crimeDate).toISOString(),
            pointLatitude: currentPoint.coords[0],
            pointLongitude: currentPoint.coords[1],
          };
          onSave(payload);
          setFormData({
            crimeTypeId: "",
            wantedPersonId: "",
            wantedPersonName: "",
            wantedPersonSurname: "",
            wantedPersonBirthDate: "",
            crimeDate: new Date().toISOString().split("T")[0],
            location: "",
            pointLatitude: "",
            pointLongitude: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

  const handleCancel = () => {
    setFormData({
        crimeTypeId: "",
        wantedPersonId: "",
        wantedPersonName: "",
        wantedPersonSurname: "",
        wantedPersonBirthDate: "",
        crimeDate: new Date().toISOString().split("T")[0],
        location: "",
        pointLatitude: "",
        pointLongitude: "",
      });
      onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить метку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Тип преступления</Form.Label>
            <Form.Select
              value={formData.crimeTypeId}
              onChange={(e) => handleInputChange("crimeTypeId", e.target.value)}
            >
              <option value="">Выберите тип преступления</option>
              {crimeTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Преступник</Form.Label>
            <Form.Select
              value={formData.wantedPersonId}
              onChange={(e) => {
                const selectedPerson = wantedPersons.find(
                  (person) => person.id === e.target.value
                );
                handleInputChange("wantedPersonId", e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  wantedPersonName: selectedPerson?.name || "",
                  wantedPersonSurname: selectedPerson?.surname || "",
                  wantedPersonBirthDate: selectedPerson?.birthDate || "",
                }));
              }}
            >
              <option value="">Выберите преступника</option>
              {wantedPersons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.surname} {person.name} ({person.birthDate.split("T")[0]})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="form-control mb-2">
            <Form.Label>Имя</Form.Label>
            <Form.Control
            type="text"
            value={formData.wantedPersonName}
            onChange={(e) =>
                setFormData({
                ...formData,
                wantedPersonName: e.target.value,
                wantedPersonId: "",
                })
            }
            placeholder="Введите имя преступника"
            />
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
            type="text"
            value={formData.wantedPersonSurname}
            onChange={(e) =>
                setFormData({
                ...formData,
                wantedPersonSurname: e.target.value,
                wantedPersonId: "",
                })
            }
            placeholder="Введите фамилию преступника"
            />
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
            type="date"
            value={formData.wantedPersonBirthDate?.split("T")[0] || ""}
            onChange={(e) =>
                setFormData({
                ...formData,
                wantedPersonBirthDate: e.target.value,
                wantedPersonId: "",
                })
            }
            placeholder="Введите дату рождения преступника"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Место совершения преступления</Form.Label>
            <Form.Control
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Введите место"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата совершения преступления</Form.Label>
            <Form.Control
              type="date"
              value={formData.crimeDate}
              onChange={(e) => handleInputChange("crimeDate", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="me-2 btn btn-primary me-2" onClick={handleSave}>
          Сохранить
        </Button>
        <Button variant="btn btn-secondary me-2" onClick={handleCancel}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPointModal;
