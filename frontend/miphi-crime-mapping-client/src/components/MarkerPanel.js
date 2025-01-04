import React, { useState } from "react";
import "./MarkerPanel.css";

const MarkerPanel = ({ points, currentPoint, onSavePoint, onCancelPoint }) => {
  
  const [formData, setFormData] = useState({
    crimeTypeId: "9cd0be1a-3952-40c9-a93a-bff647ec85e6",
    wantedPersonId: null,
    wantedPersonName: "",
    wantedPersonSurname: "",
    wantedPersonBirthDate: "",
    crimeDate: "",
    location: "",
    pointLatitude: "",
    pointLongitude: "",
  });

  const handleSave = () => {
    if (currentPoint) {
      const payload = {
        crimeTypeId: formData.crimeTypeId,
        wantedPersonId: formData.wantedPersonId,
        wantedPersonName: formData.wantedPersonName || null,
        wantedPersonSurname: formData.wantedPersonSurname || null,
        wantedPersonBirthDate: formData.wantedPersonBirthDate
          ? new Date(formData.wantedPersonBirthDate).toISOString()
          : null,
        crimeDate: new Date(formData.crimeDate).toISOString(),
        location: formData.location,
        pointLatitude: currentPoint.coords[0],
        pointLongitude: currentPoint.coords[1],
      };
      onSavePoint(payload);
      setFormData({
        crimeTypeId: "9cd0be1a-3952-40c9-a93a-bff647ec85e6",
        wantedPersonId: null,
        wantedPersonName: "",
        wantedPersonSurname: "",
        wantedPersonBirthDate: null,
        crimeDate: null,
        location: ""
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      crimeTypeId: "9cd0be1a-3952-40c9-a93a-bff647ec85e6",
      wantedPersonId: null,
      wantedPersonName: "",
      wantedPersonSurname: "",
      wantedPersonBirthDate: "",
      crimeDate: "",
      location: "",
      pointLatitude: "",
      pointLongitude: "",
    });
    onCancelPoint();
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
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Id типа преступления"
              value={formData.crimeTypeId}
              onChange={(e) => setFormData({ ...formData, crimeTypeId: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Имя преступника"
              value={formData.wantedPersonName}
              onChange={(e) => setFormData({ ...formData, wantedPersonName: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Фамилия преступника"
              value={formData.wantedPersonSurname}
              onChange={(e) => setFormData({ ...formData, wantedPersonSurname: e.target.value })}
            />
            <input
              type="date"
              className="form-control mb-2"
              placeholder="Дата рождения преступника"
              value={formData.wantedPersonBirthDate}
              onChange={(e) => setFormData({ ...formData, wantedPersonBirthDate: e.target.value })}
            />
            <input
              type="date"
              className="form-control mb-2"
              placeholder="Дата совершения преступления"
              value={formData.crimeDate}
              onChange={(e) => setFormData({ ...formData, crimeDate: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Место совершения преступления"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={handleCancel}>
                Отмена
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Сохранить
              </button>
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