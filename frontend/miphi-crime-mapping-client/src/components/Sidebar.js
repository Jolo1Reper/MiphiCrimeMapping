import React from "react";

const Sidebar = ({ points, onUpdatePoint, onDeletePoint }) => {
  return (
    <div className="p-3 bg-light border">
      <h3 className="mb-3">Метки</h3>
      <ul className="list-group">
        {points.map((point, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                #{index + 1}: {point.coords[0].toFixed(6)}, {point.coords[1].toFixed(6)}
              </span>
              <div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => {
                    const newLat = parseFloat(prompt("Enter new latitude:", point.coords[0]));
                    const newLng = parseFloat(prompt("Enter new longitude:", point.coords[1]));
                    if (!isNaN(newLat) && !isNaN(newLng)) {
                      onUpdatePoint(index, { coords: [newLat, newLng] });
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeletePoint(index)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2">
              <label>Crime Type:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={point.crimeDetails.type}
                onChange={(e) =>
                  onUpdatePoint(index, {
                    crimeDetails: { ...point.crimeDetails, type: e.target.value },
                  })
                }
              />
              <label>Perpetrator:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={point.crimeDetails.perpetrator}
                onChange={(e) =>
                  onUpdatePoint(index, {
                    crimeDetails: { ...point.crimeDetails, perpetrator: e.target.value },
                  })
                }
              />
              <label>Date:</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={point.crimeDetails.date}
                onChange={(e) =>
                  onUpdatePoint(index, {
                    crimeDetails: { ...point.crimeDetails, date: e.target.value },
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;