import React from "react";
import "./MarkerPanel.css";

const MarkerPanel = ({ points }) => {
  return (
    <div className="marker-panel">
      <div className="marker-header">
        <h3>Метки</h3>
      </div>
      <div className="marker-content">
      {points.length > 0 ? (
        <ul className="marker-list">
          {points.map((point, index) => (
            <li key={index} className="marker-list-item">
              {point[0].toFixed(6)}, {point[1].toFixed(6)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет добавленных меток.</p>
      )}
      </div>
    </div>
  );
};

export default MarkerPanel;
