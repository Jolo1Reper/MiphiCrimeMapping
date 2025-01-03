import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";
import FilterPanel from "./components/FilterPanel";
import MarkerPanel from "./components/MarkerPanel";
import "./App.css";
import api from "./api";

const App = () => {
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(null);

  const fetchAll = async () => {
    try {
      const response = await api.get("/api/crime-marks");
      const loadedPoints = response.data.map((item) => ({
        title: item.crimeTypeTitle,
        location: item.location,
        coords: [item.xPoint, item.yPoint],
      }));

      setPoints(loadedPoints);
    } catch(error) {
      console.error("Ошибка при загрузке меток:", error.response);
    }
  }

  useEffect(() => {
    let isMounted = true; // Добавляем флаг

    fetchAll().then(() => {
        // Проверяем, смонтирован ли компонент
        if (!isMounted) return; // Если компонент не смонтирован, ничего не делаем
    });

    return () => { // Возвращаем функцию cleanup
      isMounted = false; // Устанавливаем флаг при размонтировании
      console.log("Компонент размонтирован.");
    };
  }, []);

  const handleAddPoint = (newPoint) => {
    setCurrentPoint({ coords: newPoint, title: "", location: "" });
  };

  const handleSavePoint = async (data) => {
    try {
      const response = await api.post("/api/crime-marks", data);
      console.log(response.data.message);

      const crimeTypeResponse = await api.get(`/api/crime-types/${data.crimeTypeId}`);
      const newPoint = {
        title: crimeTypeResponse.data.title,
        location: data.location,
        coords: [data.pointLatitude, data.pointLongitude],
      };
      setPoints((prev) => [...prev, newPoint]);
      setCurrentPoint(null);

    } catch(error) {
      console.error("Ошибка при сохранении метки:", error.response);
    } 
  };

  const handleCancelPoint = () => {
    setCurrentPoint(null);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <FilterPanel />
        <MapComponent points={points} onAddPoint={handleAddPoint} currentPoint={currentPoint} />
        <MarkerPanel
          points={points}
          currentPoint={currentPoint}
          onSavePoint={handleSavePoint}
          onCancelPoint={handleCancelPoint}
        />
      </div>
    </div>
  );
};

export default App;