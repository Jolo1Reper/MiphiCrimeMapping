import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const EditPointModal = ({ point, crimeTypes, wantedPersons, onSave, onDelete, onHide }) => {
  const [formData, setFormData] = useState({
    id: point?.id || "",
    crimeTypeId: point?.crimeTypeId || "",
    wantedPersonId: point?.wantedPersonId || "-1",
    wantedPersonName: point?.wantedPersonName || "",
    wantedPersonSurname: point?.wantedPersonSurname || "",
    wantedPersonPatronymic: point?.wantedPersonPatronymic || "",
    wantedPersonBirthDate: point?.wantedPersonBirthDate?.split("T")[0] || "",
    crimeDate: point?.crimeDate?.split("T")[0] || "",
    location: point?.location || "",
    description: point?.description || "",
    pointLatitude: point?.coords?.[0] || "",
    pointLongitude: point?.coords?.[1] || "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSave = async() => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return;
    }

    const convertWantedPersonId = (formData.wantedPersonId === "0" || formData.wantedPersonId === "-1")
    ? null 
    : formData.wantedPersonId;

    const payload = {
      id: formData.id,
      crimeTypeId: formData.crimeTypeId ? formData.crimeTypeId : null,
      wantedPersonId: convertWantedPersonId || null,
      wantedPersonName: formData.wantedPersonName || null,
      wantedPersonSurname: formData.wantedPersonSurname || null,
      wantedPersonPatronymic: formData.wantedPersonPatronymic || null,
      wantedPersonBirthDate: formData.wantedPersonBirthDate ? new Date(formData.wantedPersonBirthDate).toISOString() : null,
      crimeDate: new Date(formData.crimeDate).toISOString(),
      location: formData.location || null,
      description: formData.description,
      pointLatitude: parseFloat(formData.pointLatitude),
      pointLongitude: parseFloat(formData.pointLongitude),
    };
    await onSave(payload);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.crimeTypeId) {
      newErrors.crimeTypeId = "Тип преступления обязателен.";
    }
    if (!formData.location) {
      newErrors.location = "Место совершения преступления обязательно.";
    }
    if (!formData.crimeDate) {
      newErrors.crimeDate = "Дата совершения преступления обязательна.";
    }
    if (formData.wantedPersonId === ""
      && !formData.wantedPersonSurname
      && !formData.wantedPersonName
      && !formData.wantedPersonBirthDate
    ) {
      newErrors.wantedPersonId = "Укажите преступника.";
    }
    if (formData.wantedPersonId !== "-1" && !formData.wantedPersonSurname) {
      newErrors.wantedPersonSurname = "Укажите фамилию преступника.";
    }
    if (formData.wantedPersonId !== "-1" && !formData.wantedPersonName) {
      newErrors.wantedPersonName = "Укажите имя преступника.";
    }
    if (formData.wantedPersonId !== "-1" && !formData.wantedPersonBirthDate) {
      newErrors.wantedPersonBirthDate = "Укажите дату рождения преступника.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Modal show={onShow} onHide={onHide} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Редактировать метку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-1">
              <Form.Label>Тип преступления</Form.Label>
              <Form.Select
                value={formData.crimeTypeId}
                onChange={(e) => handleInputChange("crimeTypeId", e.target.value)}
                isInvalid={!!errors.crimeTypeId}
              >
                <option value="">Выберите тип преступления</option>
                {crimeTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </Form.Select>
              {errors.crimeTypeId && <Form.Text className="text-danger">{errors.crimeTypeId}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-1">
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
                  setErrors((prevErrors) => ({ ...prevErrors, wantedPersonSurname: "", wantedPersonName: "", wantedPersonBirthDate: "" }));
                  setFormData((prev) => ({
                    ...prev,
                    wantedPersonName: selectedPerson?.name || "",
                    wantedPersonSurname: selectedPerson?.surname || "",
                    wantedPersonPatronymic: selectedPerson?.patronymic || "",
                    wantedPersonBirthDate: selectedPerson?.birthDate || "",
                  }));
                }}
                isInvalid={!!errors.wantedPersonId}
              >
                <option key="default" value="0">Выберите преступника или введите его данные</option>
                <option key="unknown" value="-1">Неизвестно</option>
                {wantedPersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.surname} {person.name} {person.patronymic} ({person.birthDate.split("T")[0]})
                  </option>
                ))}
              </Form.Select>
              {errors.wantedPersonId && <Form.Text className="text-danger">{errors.wantedPersonId}</Form.Text>}
            </Form.Group>
            
            <Form.Group className="form-control mb-1">
            <Form.Label>Фамилия</Form.Label>
              <Form.Control
              type="text"
              value={formData.wantedPersonSurname}
              onChange={(e) => {
                  setFormData({
                    ...formData,
                    wantedPersonSurname: e.target.value,
                    wantedPersonId: "",
                    });
                    setErrors((prevErrors) => ({ ...prevErrors, wantedPersonSurname: "" }));
                }
              }
              placeholder="Введите фамилию преступника"
              isInvalid={!!errors.wantedPersonSurname}
              />
              {errors.wantedPersonSurname && <Form.Text className="text-danger">{errors.wantedPersonSurname}<br/></Form.Text>}

              <Form.Label>Имя</Form.Label>
              <Form.Control
              type="text"
              value={formData.wantedPersonName}
              onChange={(e) => {
                  setFormData({
                    ...formData,
                    wantedPersonName: e.target.value,
                    wantedPersonId: "",
                    });
                  setErrors((prevErrors) => ({ ...prevErrors, wantedPersonName: "" }));
                }
              }
              placeholder="Введите имя преступника"
              isInvalid={!!errors.wantedPersonName}
              />
              {errors.wantedPersonName && <Form.Text className="text-danger">{errors.wantedPersonName}<br/></Form.Text>}

              <Form.Label>Отчество (при наличии)</Form.Label>
              <Form.Control
              type="text"
              value={formData.wantedPersonPatronymic}
              onChange={(e) => 
                  setFormData({
                  ...formData,
                  wantedPersonPatronymic: e.target.value,
                  wantedPersonId: "",
                  })
              }
              placeholder="Введите отчество преступника"
              />

              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
              type="date"
              value={formData.wantedPersonBirthDate?.split("T")[0] || ""}
              onChange={(e) => {
                  setFormData({
                    ...formData,
                    wantedPersonBirthDate: e.target.value,
                    wantedPersonId: "",
                    });
                  setErrors((prevErrors) => ({ ...prevErrors, wantedPersonBirthDate: "" }))
                }
              }
              placeholder="Введите дату рождения преступника"
              isInvalid={!!errors.wantedPersonBirthDate}
              />
              {errors.wantedPersonBirthDate && <Form.Text className="text-danger">{errors.wantedPersonBirthDate}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Место совершения преступления</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Введите место"
                isInvalid={!!errors.location}
              />
              {errors.location && <Form.Text className="text-danger">{errors.location}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Дата совершения преступления</Form.Label>
              <Form.Control
                type="date"
                value={formData.crimeDate}
                onChange={(e) => handleInputChange("crimeDate", e.target.value)}
                isInvalid={!!errors.crimeDate}
              />
              {errors.crimeDate && <Form.Text className="text-danger">{errors.crimeDate}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-1">
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
          <button className="apply-button" onClick={handleSave}>
            Сохранить
          </button>
          <button className="reset-button" onClick={handleDeleteClick}>
            Удалить
          </button>
          <button className="cansel-button" onClick={onHide}>
            Отмена
          </button>
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
      <button className="reset-button" onClick={confirmDeleteClick}>
        Удалить
      </button>
      <button className="cansel-button" onClick={cancelDeleteClick}>
        Отмена
      </button>
    </Modal.Footer>
  </Modal>
    </>
    
  );
};

export default EditPointModal;
