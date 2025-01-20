import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const resetFormData = () => {
  return {
    crimeTypeId: "",
    wantedPersonId: "",
    wantedPersonName: "",
    wantedPersonSurname: "",
    wantedPersonBirthDate: "",
    crimeDate: new Date().toISOString().split("T")[0],
    location: "",
    description: "",
    pointLatitude: "",
    pointLongitude: ""
  }
}

const AddPointModal = ({
  show,
  onHide,
  onSave,
  crimeTypes = [],
  wantedPersons = [],
  currentPoint,
}) => {
  const [formData, setFormData] = useState(resetFormData());

  useEffect(() => {
    if (currentPoint) {
      setFormData((prev) => ({
        ...prev,
        location: currentPoint.location,
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
          const convertWantedPersonId = (formData.wantedPersonId === "0" || formData.wantedPersonId === "-1")
          ? null 
          : formData.wantedPersonId;

          const payload = {
            crimeTypeId: formData.crimeTypeId ? formData.crimeTypeId : null,
            wantedPersonId: convertWantedPersonId || null,
            wantedPersonName: formData.wantedPersonName ? formData.wantedPersonName : null,
            wantedPersonSurname: formData.wantedPersonSurname ? formData.wantedPersonSurname : null,
            wantedPersonBirthDate: formData.wantedPersonBirthDate ? new Date(formData.wantedPersonBirthDate).toISOString() : null,
            crimeDate: new Date(formData.crimeDate).toISOString(),
            location: formData.location,
            description: formData.description || null,
            pointLatitude: currentPoint.coords[0],
            pointLongitude: currentPoint.coords[1],
          };
          onSave(payload);
          
          setFormData(resetFormData());
        }
      } catch (error) {
        console.log(error);
      }
    };

  const handleCancel = () => {
    setFormData(resetFormData());
      onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
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
                const selectedPersonId = e.target.value;
                let selectedPerson = null;
                if(selectedPersonId !== "0" && selectedPersonId !== "-1") {
                    selectedPerson = wantedPersons.find((person) => person.id === selectedPersonId);
                    
                }
                handleInputChange("wantedPersonId", selectedPersonId );
                setFormData((prev) => ({
                  ...prev,
                  wantedPersonName: selectedPerson?.name || "",
                  wantedPersonSurname: selectedPerson?.surname || "",
                  wantedPersonBirthDate: selectedPerson?.birthDate || "",
                }));
              }}
            >
              <option key="default" value="0">Выберите преступника или введите его данные</option>
              <option key="unknown" value="-1">Неизвестно</option>
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

          <Form.Group className="mb-3">
            <Form.Label>Описание (необязательно)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
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
