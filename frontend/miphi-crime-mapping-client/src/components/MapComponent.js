import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import "./MapComponent.css";

const MapComponent = ({ onAddPoint = () => {}, points = [], currentPoint = null, onGetPoint = () => {} }) => {
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onAddPoint(coords);
  };

  const handlePlacemarkClick = (point) => {
    onGetPoint(point);
  };

  return (
    <div className="map-container">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={defaultState}
          width="100%"
          height="100%"
          onClick={handleMapClick}
          options={{
            suppressMapOpenBlock: true,
            // restrictMapArea: true // Sets for one city only!
          }}
        >
          {currentPoint && (
            <Placemark
              geometry={currentPoint.coords}
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
                  properties={{
                    hintContent: `<strong>${point.title}</strong><br>${point.location}`,
                  }}
                  options={{
                    preset: "islands#blueIcon",
                    hasHint: true,
                  }}
                  onClick={() => handlePlacemarkClick(point)}
                />
              ))}
            </Clusterer>
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComponent;