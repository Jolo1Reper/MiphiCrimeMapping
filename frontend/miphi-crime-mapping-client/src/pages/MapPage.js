import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import FilterPanel from "../components/FilterPanel";
import MarkerPanel from "../components/MarkerPanel";
import AddPointModal from "../components/AddPointModal";
import EditPointModal from "../components/EditPointModal";
import "./MapPage.css";
import api from "../api";

const MapPage = () => {
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [wantedPersons, setWantedPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editPoint, setEditPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const loadTypes = await fetchAllCrimeTypes();
      setCrimeTypes(loadTypes);

      const loadPersons = await fetchAllWantedPersons();
      setWantedPersons(loadPersons);

      const loadPoints = await fetchAllCrimeMarks(loadTypes);
      setPoints(loadPoints);
    };

    fetchData();
  }, []);
  
  const fetchAllCrimeTypes = async () => {
    try {
      const response = await api.get("/api/crime-types/titles");
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке типов преступлений:", error);
    }
  };
  
  const fetchAllWantedPersons = async () => {
    try {
      const response = await api.get("api/wanted-persons/basic");
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке преступников:", error);
    }
  };
  
  const fetchAllCrimeMarks = async (crimeTypes) => {
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

  const handleGetPoint = async (point) => {
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
  };

  const handleSavePoint = async (point) => {
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

  const handleUpdatePoint = async (point) => {
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

  const handleDeletePoint = async (point) => {
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

  const handleAddPoint = (coords) => {
    setCurrentPoint({ coords: coords });
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
        <FilterPanel />
        <MapComponent 
        points={points}
        crimeTypes={crimeTypes}
        onAddPoint={handleAddPoint} 
        currentPoint={currentPoint} 
        onGetPoint={handleGetPoint}
        selectedPoint={selectedPoint} 
        />
        <MarkerPanel points={points} onMarkerSelect={handleMarkerSelect} />
        <AddPointModal
          show={isModalOpen}
          onHide={handleCancelAddPoint}
          onSave={handleSavePoint}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          currentPoint={currentPoint}
        />
        {editPoint && (
        <EditPointModal
          point={editPoint}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          onSave={handleUpdatePoint}
          onDelete={handleDeletePoint}
          onHide={handleCancelEditPoint}
        />
        )}
        {notification && <div className="notification">{notification}</div>}

      </div>
  );
};

export default MapPage;