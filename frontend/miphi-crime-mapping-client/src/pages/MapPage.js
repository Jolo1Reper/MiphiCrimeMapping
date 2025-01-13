import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import FilterPanel from "../components/FilterPanel";
import MarkerPanel from "../components/MarkerPanel";
import AddPointModal from "../components/AddPointModal";
import EditPointModal from "../components/EditPointModal";
import "./MapPage.css";
import api from "../api";
import axios from "axios";

const MapPage = () => {
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [wantedPersons, setWantedPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editPoint, setEditPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const [isFilterPanelVisible, setFilterPanelVisible] = useState(true);
  const [isMarkerPanelVisible, setMarkerPanelVisible] = useState(true);
  const toggleFilterPanel = () => setFilterPanelVisible(!isFilterPanelVisible);
  const toggleMarkerPanel = () => setMarkerPanelVisible(!isMarkerPanelVisible);

  useEffect(() => {
    const fetchData = async () => {
      const loadTypes = await fetchGetAllCrimeTypes();
      setCrimeTypes(loadTypes);

      const loadPersons = await fetchGetAllWantedPersons();
      setWantedPersons(loadPersons);

      const loadPoints = await fetchGetAllCrimeMarks(loadTypes);
      setPoints(loadPoints);
    };

    fetchData();
  }, []);
  
  const fetchGetAllCrimeTypes = async () => {
    try {
      const response = await api.get("/api/crime-types/titles");
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке типов преступлений:", error);
    }
  };
  
  const fetchGetAllWantedPersons = async () => {
    try {
      const response = await api.get("api/wanted-persons/basic");
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке преступников:", error);
    }
  };
  
  const fetchGetAllCrimeMarks = async (crimeTypes) => {
    try {
      const response = await api.get("/api/crime-marks");
      const loadedPoints = response.data.map((item) => {
        const crimeType = crimeTypes.find((type) => type.id === item.crimeTypeId);
        return {
          id: item.id,
          title: crimeType.title,
          color: crimeType?.color || null,
          crimeDate: item.crimeDate,
          location: item.location,
          coords: [item.pointLatitude, item.pointLongitude],
        };
      });
      return loadedPoints;
    } catch (error) {
      console.error("Ошибка при загрузке меток преступлений:", error);
    }
  };

  const fetchGetPoint = async (point) => {
    try {
    const response = await api.get(`/api/crime-marks/${point.id}`);
    const getPoint = {
      id: response.data.id,
      crimeTypeId: response.data.crimeTypeId,
      wantedPersonId: response.data.wantedPersonId,
      wantedPersonName: response.data.wantedPersonName,
      wantedPersonSurname: response.data.wantedPersonSurname,
      wantedPersonBirthDate: response.data.wantedPersonBirthDate,
      crimeDate: response.data.crimeDate,
      location: response.data.location,
      coords: [response.data.pointLatitude, response.data.pointLongitude]
    } 

    setEditPoint(getPoint);
  } catch(error) {
    console.error("Ошибка при загрузке метки преступления:", error);
  }
  };

  const fetchAddPoint = async (point) => {
    try {
      const response = await api.post("/api/crime-marks", point);
      console.log(response.data.message);

      const crimeType = crimeTypes.find((type) => type.id === point.crimeTypeId);
      const newPoint = {
        id: response.data.id,
        title: crimeType.title,
        color: crimeType.color,
        crimeDate: point.crimeDate,
        location: point.location,
        coords: [point.pointLatitude, point.pointLongitude],
      };
      setPoints((prev) => [...prev, newPoint]);
      setCurrentPoint(null);
      setIsModalOpen(false);
      showNotification("Метка успешно сохранена!");

    } catch(error) {
      console.error("Ошибка при сохранении метки:", error);
    } 
  };

  const fetchUpdatePoint = async (point) => {
    try {
      console.log(point);
      const response = await api.patch(`/api/crime-marks`, point);
      console.log(response.data.message);
      const crimeType = crimeTypes.find((type) => type.id === point.crimeTypeId);
      
      const updatePoint = {
        id: response.data.id,
        title: crimeType.title,
        color: crimeType.color,
        crimeDate: point.crimeDate,
        location: point.location,
        coords: [point.pointLatitude, point.pointLongitude],
      };
      setPoints((prev) =>
        prev.map((p) => (p.id === updatePoint.id ? updatePoint : p))
      );
      setEditPoint(null);
      showNotification("Изменения метки сохранены!");
    } catch (error) {
      console.error("Ошибка при обновлении метки:", error.response);
    }
  };

  const fetchDeletePoint = async (point) => {
    try {
      const response = await api.delete(`/api/crime-marks/${point.id}`);
      console.log(response.data.message);
      setPoints((prev) => prev.filter((p) => p.id !== point.id));
      setEditPoint(null);
      showNotification("Метка успешно удалена!");
    } catch (error) {
      console.error("Ошибка при удалении метки:", error.response);
    }
  };

  const fetchAddressFromCoordinates = async (coords) => {
    const [latitude, longitude] = coords;
    const apiKey = "78f10438-fb7e-4516-a20a-41c29d8f3b01";
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${longitude},${latitude}&format=json`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Ошибка при запросе адреса:", error);
    }
  };

  const extractShortAddress = (data) => {
    const featureMembers = data?.response?.GeoObjectCollection?.featureMember;
  
    if (featureMembers && featureMembers.length > 0) {
      const firstGeoObject = featureMembers[0]?.GeoObject;
      const components =
        firstGeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
  
      if (components) {
        const city = components.find((comp) => comp.kind === "locality")?.name;
        const street = components.find((comp) => comp.kind === "street")?.name;
        const house = components.find((comp) => comp.kind === "house")?.name;
  
        return [city, street, house].filter(Boolean).join(", ") || "Адрес не найден";
      }
    }

    return "-";
  };

  const handleAddPoint = async (coords) => {
    const geocodeData = await fetchAddressFromCoordinates(coords);
  
    if (geocodeData) {
      const shortAddress = extractShortAddress(geocodeData);
      console.log("Краткий адрес:", shortAddress);
      setCurrentPoint({ location: shortAddress, coords: coords });
    } else {
      setCurrentPoint({ coords: coords });
    }
    setIsModalOpen(true);
  };

  const handleCancelAddPoint = () => {
    setIsModalOpen(false);
    setCurrentPoint(null);
    showNotification("Добавление метки отменено!");
  };

  const handleCancelEditPoint = () => {
    setEditPoint(null);
    showNotification("Изменение метки отменено!");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // TODO Modal?  
  const handleMarkerSelect = (point) => {
    setSelectedPoint(point);
  } 

  return (
        <div className="map-page">
        <div
          className={`filter-panel ${isFilterPanelVisible ? "" : "collapsed"}`}
        >
          <FilterPanel />
        </div>

        <div
          className={`panel-toggle left ${isFilterPanelVisible ? "" : "collapsed"}`}
          onClick={toggleFilterPanel}
        >
          <span>Фильтры</span>
        </div>
        
        <MapComponent 
        points={points}
        crimeTypes={crimeTypes}
        onAddPoint={handleAddPoint}
        onGetPoint={fetchGetPoint}
        selectedPoint={selectedPoint} 
        />

        <div
          className={`marker-panel ${isMarkerPanelVisible ? "" : "collapsed"}`}
        >
          <MarkerPanel points={points} onMarkerSelect={handleMarkerSelect} />
        </div>

        <div
          className={`panel-toggle right ${isMarkerPanelVisible ? "" : "collapsed"}`}
          onClick={toggleMarkerPanel}
        >
          <span>Метки</span>
        </div>

        <AddPointModal
          show={isModalOpen}
          onHide={handleCancelAddPoint}
          onSave={fetchAddPoint}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          currentPoint={currentPoint}
        />
        {editPoint && (
        <EditPointModal
          point={editPoint}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          onSave={fetchUpdatePoint}
          onDelete={fetchDeletePoint}
          onHide={handleCancelEditPoint}
        />
        )}
        {notification && <div className="notification">{notification}</div>}

      </div>
  );
};

export default MapPage;