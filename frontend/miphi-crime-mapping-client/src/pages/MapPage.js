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

  useEffect(() => {
    fetchAllCrimeTypes();
    fetchAllWantedPersons();
    fetchAllCrimeMarks();
  }, []);

  const fetchAllCrimeTypes = async () => {
    try {
      const response = await api.get("/api/crime-types/titles");
      setCrimeTypes(response.data);
    } catch(error) {
      console.error("Ошибка при загрузке типов преступлений:", error);
    }
  }

  const fetchAllWantedPersons = async () => {
    try {
      const response = await api.get("api/wanted-persons/basic");
      setWantedPersons(response.data);
    } catch(error) {
      console.error("Ошибка при загрузке преступников:", error);
    }
  }

  const fetchAllCrimeMarks = async () => {
    try {
      const response = await api.get("/api/crime-marks");
      const loadedPoints = response.data.map((item) => ({
        title: item.crimeTypeTitle,
        location: item.location,
        coords: [item.pointLatitude, item.pointLongitude],
      }));

      setPoints(loadedPoints);
    } catch(error) {
      console.error("Ошибка при загрузке меток:", error.response);
    }
  }

  const handleSavePoint = async (data) => {
    try {
      const response = await api.post("/api/crime-marks", data);
      console.log(response.data.message);

      const newPoint = {
        title: crimeTypes.find((type) => type.id === data.crimeTypeId)?.title,
        location: data.location,
        coords: [data.pointLatitude, data.pointLongitude],
      };
      setPoints((prev) => [...prev, newPoint]);
      setCurrentPoint(null);
      setIsModalOpen(false);
      showNotification("Метка успешно сохранена!");

    } catch(error) {
      console.error("Ошибка при сохранении метки:", error);
    } 
  };
//TODO
  const handleUpdatePoint = async (updatedPoint) => {
    try {
      await api.put(`/api/crime-marks/${updatedPoint.id}`, updatedPoint);
      setPoints((prev) =>
        prev.map((p) => (p.id === updatedPoint.id ? updatedPoint : p))
      );
      setEditPoint(null);
    } catch (error) {
      console.error("Ошибка при обновлении метки:", error.response);
    }
  };
//TODO
  const handleDeletePoint = async (point) => {
    try {
      await api.delete(`/api/crime-marks/${point.id}`);
      setPoints((prev) => prev.filter((p) => p.id !== point.id));
      setEditPoint(null);
    } catch (error) {
      console.error("Ошибка при удалении метки:", error.response);
    }
  };

  const handleAddPoint = (coords) => {
    setCurrentPoint({ coords: coords });
    setIsModalOpen(true);
  };

  const handleCancelPoint = () => {
    setIsModalOpen(false);
    setCurrentPoint(null);
    showNotification("Добавление метки отменено.");
  };

  const handleEditPoint = (point) => {
    setEditPoint(point);
  };

  const handleCancelEdit = () => {
    setEditPoint(null);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
      <div className="map-page">
        <FilterPanel />
        <MapComponent 
        points={points} 
        onAddPoint={handleAddPoint} 
        currentPoint={currentPoint} 
        onEditPoint={handleEditPoint} 
        />
        <MarkerPanel points={points} />
        <AddPointModal
          show={isModalOpen}
          onHide={handleCancelPoint}
          onSave={handleSavePoint}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          currentPoint={currentPoint}
        />
        {editPoint && (
        <EditPointModal
          show={!!editPoint}
          point={editPoint}
          onSave={handleUpdatePoint}
          onDelete={handleDeletePoint}
          onCancel={handleCancelEdit}
        />
        )}
        {notification && <div className="notification">{notification}</div>}
      </div>
  );
};

export default MapPage;