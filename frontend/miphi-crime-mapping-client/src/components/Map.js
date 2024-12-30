// src/components/Map.js
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = ({ onAddPoint = () => {}, points = [] }) => {
  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onAddPoint(coords); // Передаем координаты в функцию-обработчик
  };

  return (
    <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
      <div className="border rounded" style={{ overflow: "hidden" }}>
        <Map
          defaultState={{
            center: [55.751244, 37.618423], // Центр Москвы
            zoom: 10,
          }}
          width="100%"
          height="500px"
          onClick={handleMapClick}
        >
          {points.map((coords, index) => (
            <Placemark key={index} geometry={coords} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default MapComponent;


// 47.515105, 42.159288
// ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70// src/components/Map.js
