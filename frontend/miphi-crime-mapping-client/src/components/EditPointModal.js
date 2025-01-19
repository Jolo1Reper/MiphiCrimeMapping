import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPointModal = ({ point, crimeTypes, wantedPersons, onSave, onDelete, onHide }) => {
  const [formData, setFormData] = useState({
    id: point?.id || "",
    crimeTypeId: point?.crimeTypeId || "",
    wantedPersonId: point?.wantedPersonId || "-1",
    wantedPersonName: point?.wantedPersonName || "",
    wantedPersonSurname: point?.wantedPersonSurname || "",
    wantedPersonBirthDate: point?.wantedPersonBirthDate?.split("T")[0] || "",
    crimeDate: point?.crimeDate?.split("T")[0] || "",
    location: point?.location || "",
    pointLatitude: point?.coords?.[0] || "",
    pointLongitude: point?.coords?.[1] || "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveClick = () => {
    const convertWantedPersonId = (formData.wantedPersonId === "0" || formData.wantedPersonId === "-1")
    ? null 
    : formData.wantedPersonId;

    const payload = {
      id: formData.id,
      crimeTypeId: formData.crimeTypeId ? formData.crimeTypeId : null,
      wantedPersonId: convertWantedPersonId || null,
      wantedPersonName: formData.wantedPersonName ? formData.wantedPersonName : null,
      wantedPersonSurname: formData.wantedPersonSurname ? formData.wantedPersonSurname : null,
      wantedPersonBirthDate: formData.wantedPersonBirthDate ? new Date(formData.wantedPersonBirthDate).toISOString() : null,
      crimeDate: new Date(formData.crimeDate).toISOString(),
      location: formData.location,
      pointLatitude: parseFloat(formData.pointLatitude),
      pointLongitude: parseFloat(formData.pointLongitude),
    };
    onSave(payload);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDeleteClick = () => {
    onDelete(point);
    setShowConfirm(false);
  };

  const cancelDeleteClick = () => {
    setShowConfirm(false);
  };

  const onShow = () => {
    if(!!point) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <Modal show={onShow} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Редактировать метку</Modal.Title>
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
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveClick}>
          Сохранить
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Удалить
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showConfirm} onHide={cancelDeleteClick}>
    <Modal.Header closeButton>
      <Modal.Title>Подтвердите удаление</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Вы уверены, что хотите удалить метку <strong>{point?.title}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={confirmDeleteClick}>
        Удалить
      </Button>
      <Button variant="secondary" onClick={cancelDeleteClick}>
        Отмена
      </Button>
    </Modal.Footer>
  </Modal>
    </>
    
  );
};

export default EditPointModal;
