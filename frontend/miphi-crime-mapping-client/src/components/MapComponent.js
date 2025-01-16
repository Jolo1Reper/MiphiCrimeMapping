import { useState, useEffect } from "react";
import { YMaps, Map, Placemark, Clusterer, Circle } from "@pbe/react-yandex-maps";
import "./MapComponent.css";
import Legend from "./Legend";

const MapComponent = ({
  onAddPoint = () => {},
  points = [],
  crimeTypes = [],
  selectedPoint = null,
  onGetPoint = () => {},
  isSettingSearchCenter = true,
  searchCenter = null,
  radius,
  onAddSearchCenter = () => {}}) => {
    
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const [mapCenter, setMapCenter] = useState(defaultState.center);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    console.log("Точки"+points);
    if (selectedPoint) {
      setMapCenter(selectedPoint.coords);
    }
  }, [selectedPoint]);

  const handleMapClick = async (e) => {
    const coords = e.get("coords");
    console.log("Радиус "+radius);
    if (isSettingSearchCenter) {
      onAddSearchCenter(coords);
      console.log("Центр:"+ searchCenter);
    }
    else {
      onAddPoint(coords);
    }
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

          {searchCenter &&
            <>
            <Circle
            onClick={handleMapClick}
            geometry={[searchCenter, Number(radius)]}
            options={{
              draggable: false,
              fillColor: "#1E90FF33",
              strokeColor: "#1E90FF",
              strokeWidth: 2,
              }}
            /> 
            <Placemark
              geometry={searchCenter}
              options={{
                iconColor: "#95b5ba",
              }}
            />
            </>

            }

            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: true
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