import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = ({ points, onAddPoint, onUpdatePoint, onDeletePoint }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [newPointCoords, setNewPointCoords] = useState(null);

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setNewPointCoords(coords);
  };

  const handlePlacemarkDragEnd = (e, index) => {
    const newCoords = e.get("target").geometry.getCoordinates();
    onUpdatePoint(index, { coords: newCoords });
  };

  const confirmAddPoint = () => {
    if (newPointCoords) {
      onAddPoint(newPointCoords);
      setNewPointCoords(null);
    }
  };

  return (
    <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
      <Map
        defaultState={{
          center: [55.751244, 37.618423], // Center of Moscow
          zoom: 10,
        }}
        width="100%"
        height="500px"
        onClick={handleMapClick}
      >
        {points.map((point, index) => (
          <Placemark
            key={index}
            geometry={point.coords}
            options={{ draggable: true }}
            onDragEnd={(e) => handlePlacemarkDragEnd(e, index)}
            onClick={() => setSelectedPoint(index)}
            properties={{
              balloonContent: `Point #${index + 1} \n (${point.coords[0].toFixed(6)}, ${point.coords[1].toFixed(6)})`,
              hintContent: `Crime Type: ${point.crimeDetails.type || "Unknown"}`,
            }}
            onMouseEnter={() => setSelectedPoint(index)}
            onMouseLeave={() => setSelectedPoint(null)}
          />
        ))}
        {newPointCoords && (
          <Placemark
            geometry={newPointCoords}
            options={{ preset: "islands#redDotIcon" }}
            properties={{
              balloonContent: "Click Confirm to add this point",
            }}
          />
        )}
      </Map>
      {newPointCoords && (
        <div className="confirm-popup">
          <p>
            Add point at ({newPointCoords[0].toFixed(6)}, {newPointCoords[1].toFixed(6)})?
          </p>
          <button className="btn btn-success me-2" onClick={confirmAddPoint}>
            Confirm
          </button>
          <button className="btn btn-danger" onClick={() => setNewPointCoords(null)}>
            Cancel
          </button>
        </div>
      )}
    </YMaps>
  );
};

export default MapComponent;
// 47.515105, 42.159288
// ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70// src/components/Map.js
