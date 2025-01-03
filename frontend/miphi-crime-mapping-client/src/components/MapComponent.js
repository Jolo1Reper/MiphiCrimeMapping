import React, { useEffect, useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import "./MapComponent.css";

const MapComponent = ({ onAddPoint = () => {}, points = [] }) => {

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onAddPoint(coords);
  };

  return (
    <div className="map-container">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={{
               center: [47.517641, 42.160875],
               zoom: 13,
          }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          {points.map((coords, index) => (
            <Placemark key={index} geometry={coords} />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComponent;