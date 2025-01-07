import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import "./MapComponent.css";

const MapComponent = ({ onAddPoint = () => {}, points = [], currentPoint = null }) => {
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onAddPoint(coords);
  };

  return (
    <div className="map-container">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={defaultState}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          {/* Отображение временной метки красным цветом */}
          {currentPoint && (
            <Placemark
              geometry={currentPoint.coords}
              options={{
                preset: "islands#redIcon",
              }}
            />
          )}
          {/* Отображение сохранённых меток */}
          {points.map((point, index) => (
            <Placemark
              key={index}
              geometry={point.coords}
              properties={{
                balloonContent: `<strong>${point.title}</strong><br>${point.description}`,
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComponent;