// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [points, setPoints] = useState([]);

  const handleAddPoint = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };
  return (
    <div>
      <Header />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <MapComponent points={points} onAddPoint={handleAddPoint} />
          </div>
          <div className="col-md-4">
            <Sidebar points={points} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
