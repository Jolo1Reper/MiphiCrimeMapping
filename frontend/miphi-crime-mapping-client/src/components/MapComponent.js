import { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedPoint) {
      setMapCenter(selectedPoint.coords);
    }
  }, [selectedPoint]);

  const handleMapClick = async (e) => {
    const coords = e.get("coords");
    
    if (isSettingSearchCenter) {
      onAddSearchCenter(coords);
    }
    else {
      onAddPoint(coords);
    }
  };

  const handleMouseEnter = (point) => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      try {
        const globalPixels = mapInstance.options.get("projection").toGlobalPixels(
          [point.coords[0], point.coords[1]],
          mapInstance.getZoom()
        );
        const screenPosition = mapInstance.converter.globalToPage(globalPixels);
        setHoveredPoint({
          ...point,
          screenPosition,
        });

      } catch (error) {
        console.error("Error converting coordinates:", error);
      }
    }
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
          instanceRef={(ref) => (mapRef.current = ref)}
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
            geometry={[[searchCenter.latitude, searchCenter.longitude], Number(radius)]}
            options={{
              draggable: false,
              fillColor: "#1E90FF33",
              strokeColor: "#1E90FF",
              strokeWidth: 2,
              }}
            /> 
            <Placemark
              geometry={[searchCenter.latitude, searchCenter.longitude]}
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

      {hoveredPoint && hoveredPoint.screenPosition && (
        <div
          className="hovered-point-window"
          style={{
            top: `${hoveredPoint.screenPosition[1] - 230}px`,
            left: `${hoveredPoint.screenPosition[0] + 20}px`,
          }}
        >
          <p><strong>{hoveredPoint.title}</strong></p>
          <p className="hovered-point-description">{hoveredPoint?.description}</p>
          <p className="hovered-point-location">Местонахождение: {hoveredPoint.location}</p>
          <p className="hovered-point-crime-date">
            Время совершения: {hoveredPoint.crimeDate.split("T")[0]}
          </p>
        </div>
      )}

      <Legend crimeTypes={crimeTypes} />
    </div>
  );
};

export default MapComponent;