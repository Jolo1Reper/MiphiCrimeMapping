import React, { useState } from "react";
import "./MarkerPanel.css";
import { Button, Form } from "react-bootstrap";

const MarkerPanel = ({
  points = [],
  crimeTypes = [],
  wantedPersons = [],
  currentPoint,
  onSavePoint,
  onCancelPoint,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [formData, setFormData] = useState({
    crimeTypeId: "",
    wantedPersonId: "",
    wantedPersonName: "",
    wantedPersonSurname: "",
    wantedPersonBirthDate: "",
    crimeDate: "",
    location: "",
    pointLatitude: "",
    pointLongitude: "",
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (currentPoint) {
        const payload = {
          ...formData,
          wantedPersonId: formData.wantedPersonId == "" ? null : formData.wantedPersonId,
          wantedPersonBirthDate: formData.wantedPersonBirthDate
            ? new Date(formData.wantedPersonBirthDate).toISOString()
            : null,
          crimeDate: new Date(formData.crimeDate).toISOString(),
          pointLatitude: currentPoint.coords[0],
          pointLongitude: currentPoint.coords[1],
        };

        onSavePoint(payload);

        setFormData({
          crimeTypeId: "",
          wantedPersonId: "",
          wantedPersonName: "",
          wantedPersonSurname: "",
          wantedPersonBirthDate: "",
          crimeDate: "",
          location: "",
          pointLatitude: "",
          pointLongitude: "",
        });
      }
    } catch (validationError) {
      console.log(validationError);
      } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsCanceling(true);
    setFormData({
      crimeTypeId: "",
      wantedPersonId: "",
      wantedPersonName: "",
      wantedPersonSurname: "",
      wantedPersonBirthDate: "",
      crimeDate: "",
      location: "",
      pointLatitude: "",
      pointLongitude: "",
    });
    onCancelPoint();
    setIsCanceling(false);
  };

  return (
    <div className="marker-panel">
      <div className="marker-header">
        <h3>Метки</h3>
      </div>
      <div className="marker-content">
        {currentPoint && (
          <div className="marker-form">
            <h4>Добавление метки</h4>

            <div className="d-flex justify-content-end">
              <Form>
                <Form.Group className="form-control mb-2">
                  <Form.Label>Типы преступлений</Form.Label>
                  <Form.Select
                    value={formData.crimeTypeId}
                    onChange={(e) =>
                      setFormData({ ...formData, crimeTypeId: e.target.value })
                    }
                  >
                    <option value="">Выберите тип преступления</option>
                    {crimeTypes.map((crimeType, index) => (
                      <option key={index} value={crimeType.id}>
                        {crimeType.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-control mb-2">
                  <Form.Label>Преступник</Form.Label>
                  <Form.Select
                    value={formData.wantedPersonId}
                    onChange={(e) => {
                      const selectedPersonId = e.target.value;
                      const selectedPerson = wantedPersons.find(
                        (person) => person.id === selectedPersonId
                      );
                      setFormData({
                        ...formData,
                        wantedPersonId: selectedPersonId,
                        wantedPersonName: selectedPerson
                          ? selectedPerson.name
                          : "",
                        wantedPersonSurname: selectedPerson
                          ? selectedPerson.surname
                          : "",
                        wantedPersonBirthDate: selectedPerson
                          ? selectedPerson.birthDate
                          : "",
                      });
                    }}
                  >
                    <option value="">Выберите преступника</option>
                    {wantedPersons.map((person, index) => (
                      <option key={index} value={person.id}>
                        {person.surname} {person.name} {person.birthDate}
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
                <Form.Group className="form-control mb-2">
                  <Form.Label>Дата совершения преступления</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.crimeDate}
                    onChange={(e) =>
                      setFormData({ ...formData, crimeDate: e.target.value })
                    }
                    placeholder="Введите дату совершения преступления"
                  />
                </Form.Group>
                <Form.Group className="form-control mb-2">
                  <Form.Label>Место совершения преступления</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Введите место совершения преступления"
                  />
                </Form.Group>

                <Button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Сохранение..." : "Сохранить"}
                </Button>
                <Button
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
                  disabled={isCanceling}
                >
                  {isCanceling ? "Отмена..." : "Отменить"}
                </Button>
              </Form>
            </div>
          </div>
        )}
        {points.length > 0 ? (
          <ul className="marker-list mt-3">
            {points.map((point, index) => (
              <li key={index} className="marker-list-item">
                <strong>{point.title}</strong>
                <p>{point.location}</p>
                <small>
                  {point.coords[0].toFixed(6)}, {point.coords[1].toFixed(6)}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">Нет добавленных меток.</p>
        )}
      </div>
    </div>
  );
};

export default MarkerPanel;