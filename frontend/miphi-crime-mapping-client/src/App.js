import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MapPage from "./pages/MapPage";
import WantedPersonsPage from "./pages/WantedPersonsPage";
import CrimeTypesListPage from "./pages/CrimeTypesListPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/crime-types" element={<CrimeTypesListPage />} />
          <Route path="/wanted-persons" element={<WantedPersonsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;