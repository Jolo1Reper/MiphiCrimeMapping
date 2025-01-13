import { useState, useEffect } from "react";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import "./MapComponent.css";
import Legend from "./Legend";

const MapComponent = ({ onAddPoint = () => {}, points = [], crimeTypes = [], selectedPoint= null, onGetPoint = () => {} }) => {
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const [mapCenter, setMapCenter] = useState(defaultState.center);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    if (selectedPoint) {
      setMapCenter(selectedPoint.coords);
    }
  }, [selectedPoint]);

  const handleMapClick = async (e) => {
    const coords = e.get("coords");
    onAddPoint(coords);
  };

  const handleMouseEnter = (point) => {
    setHoveredPoint(point);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const handlePlacemarkClick = (point) => {
    onGetPoint(point);
  };

  return (
    <div className="map-container">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={defaultState}
          state={{ ...defaultState, center: mapCenter }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
          options={{
            suppressMapOpenBlock: true,
            // restrictMapArea: true // Sets for one city only!
          }}
        >
          {selectedPoint &&
          (
            <Placemark
              geometry={selectedPoint.coords}
              options={{
                preset: "islands#redIcon",
              }}
            />
          )}
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false
              }}
            >
              {points.map((point, index) => (
                <Placemark
                  key={index}
                  geometry={point.coords}
                  options={{
                    iconColor: point.color || "#FFFFFF"
                  }}
                  onClick={() => handlePlacemarkClick(point)}
                  onMouseEnter={() => handleMouseEnter(point)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </Clusterer>
        </Map>
      </YMaps>

      {hoveredPoint && (
        <div className="hovered-point-window">
          <strong>{hoveredPoint.title}</strong>
          <p className="hovered-point-location">Местонахождение: {hoveredPoint.location}</p>
          <p className="hovered-point-crime-date">Время совершения: {hoveredPoint.crimeDate.split("T")[0]}</p>
        </div>
      )}

      <Legend crimeTypes={crimeTypes} />
    </div>
  );
};

export default MapComponent;