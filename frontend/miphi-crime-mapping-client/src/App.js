import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MapPage from "./pages/MapPage";
import WantedPersonsPage from "./pages/WantedPersonsPage";
import CrimeTypesListPage from "./pages/CrimeTypesListPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout isMapPage={true}><MapPage /></Layout>} />
          <Route path="/crime-types" element={<Layout><CrimeTypesListPage /></Layout>} />
          <Route path="/wanted-persons" element={<Layout><WantedPersonsPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        </Routes>
    </Router>
  );
};

export default App;