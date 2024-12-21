// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [points, setPoints] = useState([]);

  const handleAddPoint = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, { coords: newPoint, crimeDetails: { type: "", perpetrator: "", date: "" } }]);
  };

  const handleUpdatePoint = (index, updatedPoint) => {
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints];
      updatedPoints[index] = { ...updatedPoints[index], ...updatedPoint };
      return updatedPoints;
    });
  };

  const handleDeletePoint = (index) => {
    setPoints((prevPoints) => prevPoints.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <MapComponent
              points={points}
              onAddPoint={handleAddPoint}
              onUpdatePoint={handleUpdatePoint}
              onDeletePoint={handleDeletePoint}
            />
          </div>
          <div className="col-md-4">
            <Sidebar
              points={points}
              onUpdatePoint={handleUpdatePoint}
              onDeletePoint={handleDeletePoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;