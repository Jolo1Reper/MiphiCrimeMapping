import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

const resetFormData = () => {
  return {
    crimeTypeId: "",
    wantedPersonId: "",
    wantedPersonName: "",
    wantedPersonSurname: "",
    wantedPersonPatronymic: "",
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
  const [errors, setErrors] = useState({});

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
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSave = async() => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return;
    }

    if (currentPoint) {
      const convertWantedPersonId = (formData.wantedPersonId === "0" || formData.wantedPersonId === "-1")
      ? null 
      : formData.wantedPersonId;

      const payload = {
        crimeTypeId: formData.crimeTypeId ? formData.crimeTypeId : null,
        wantedPersonId: convertWantedPersonId || null,
        wantedPersonName: formData.wantedPersonName || null,
        wantedPersonSurname: formData.wantedPersonSurname || null,
        wantedPersonPatronymic: formData.wantedPersonPatronymic || null,
        wantedPersonBirthDate: formData.wantedPersonBirthDate ? new Date(formData.wantedPersonBirthDate).toISOString() : null,
        crimeDate: new Date(formData.crimeDate).toISOString(),
        location: formData.location || null,
        description: formData.description || null,
        pointLatitude: currentPoint.coords[0],
        pointLongitude: currentPoint.coords[1],
      };
      await onSave(payload);
      
      setFormData(resetFormData());
    }
  };

  const handleCancel = () => {
    setFormData(resetFormData());
    setErrors({});
    onHide();
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
    <Modal show={show} onHide={handleCancel} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Добавить метку</Modal.Title>
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
        <button className="cansel-button" onClick={handleCancel}>
          Отмена
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPointModal;
