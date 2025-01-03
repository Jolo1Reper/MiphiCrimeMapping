import React, { useState } from "react";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";
import FilterPanel from "./components/FilterPanel";
import MarkerPanel from "./components/MarkerPanel";
import "./App.css";

const App = () => {
  const [points, setPoints] = useState([]);

  const handleAddPoint = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <FilterPanel />
        <MapComponent points={points} onAddPoint={handleAddPoint}/>
        <MarkerPanel points={points}/>
      </div>
    </div>
  );
};

export default App;