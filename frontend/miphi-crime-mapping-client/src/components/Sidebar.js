// src/components/Sidebar.js
import React from "react";

const Sidebar = ({ points }) => {
  return (
    <div className="p-3 bg-light border">
      <h3 className="mb-3">Метки</h3>
      {points.length > 0 ? (
        <ul className="list-group">
          {points.map((point, index) => (
            <li key={index} className="list-group-item">
              {point[0].toFixed(6)}, {point[1].toFixed(6)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет добавленных меток.</p>
      )}
    </div>
  );
};

export default Sidebar;
