import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import MapComponent from "../components/MapComponent";
import FilterPanel from "../components/FilterPanel";
import MarkerPanel from "../components/MarkerPanel";
import AddPointModal from "../components/AddPointModal";
import EditPointModal from "../components/EditPointModal";
import Statistic from "../components/Statistic";
import "./MapPage.css";
import api from "../api";
import { baseURL } from "../api";
import axios from "axios";

const MapPage = () => {
  const [connection, setConnection] = useState(null);
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

  const [isSettingSearchCenter, setIsSettingSearchCenter] = useState(false);
  const [searchCenter, setSearchCenter] = useState({ latitude: null, longitude: null });
  const [radiusInMeters, setRadiusInMeters] = useState(500);

  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const loadTypes = await fetchGetAllCrimeTypes();
      setCrimeTypes(loadTypes);

      const loadPersons = await fetchGetAllWantedPersons();
      setWantedPersons(loadPersons);

      const loadPoints = await fetchGetAllCrimeMarks(loadTypes);
      setPoints(loadPoints);

      fetchConnect();
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
  
  const fetchGetAllCrimeMarks = async(
    crimeTypes = [],
    search = "",
    selectedCrimeTypeIds = [],
    selectedWantedPersonIds = [],
    center = { latitude: null, longitude: null },
    radius = null,
    dateRange = { from: null, to: null }
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("SearchQuery", search);
      if (selectedCrimeTypeIds.length > 0) {
        selectedCrimeTypeIds.forEach((id) => params.append("CrimeTypeIds", id));
      }
      if (selectedWantedPersonIds.length > 0) {
        selectedWantedPersonIds.forEach((id) => params.append("WantedPersonIds", id));
      }
      if (center.latitude) params.append("Latitude", center.latitude);
      if (center.longitude) params.append("Longitude", center.longitude);
      if (radius) {
        const radiusInKilometers = radius/1000;
        params.append("Radius", radiusInKilometers);
      } 
      if (dateRange.from) params.append("StartDate", new Date(dateRange.from).toISOString());
      if (dateRange.to) params.append("EndDate", new Date(dateRange.to).toISOString());
  
      const response = await api.get(`/api/crime-marks?${params.toString()}`);
      
      const loadedPoints = response.data.map((item) => {
        const crimeType = crimeTypes.find((type) => type.id === item.crimeTypeId);
        return {
          id: item.id,
          title: crimeType.title,
          wantedPersonId: item?.wantedPersonId,
          color: crimeType?.color || null,
          crimeDate: item.crimeDate,
          location: item.location,
          description: item.description,
          coords: [item.pointLatitude, item.pointLongitude],
        };
      });
      
      return loadedPoints;
    } catch (error) {
      console.error("Ошибка при загрузке меток преступлений:", error);
    }
  };

  const fetchConnect = async () => {
    if (connection) {
      try {
        await connection.stop();
      } catch (error) {
        console.error("Error stopping the connection:", error);
      }
      setConnection(null);
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/realhub`)
      .withAutomaticReconnect()
      .build();
  
      setConnection(newConnection);
  };

  useEffect(() => {
    const setupConnection = async () => {
      if (connection) {
        try {
          await connection.start();
          console.log("Connected to RealHub");

          connection.on("Error", (error) => {
            console.error("Error:", error);
          });
        
          connection.on("AddedCrime", realCrimeAdded);

          connection.on("UpdatedCrime", realCrimeUpdated);

          connection.on("DeletedCrime", realCrimeDeleted);
        } catch (error) {
            console.error("Connection failed: ", error);
        }
      }
    };

    setupConnection();
  }, [connection]);

  const realCrimeAdded = (newCrime) => {
    const crimeType = crimeTypes.find((type) => type.id === newCrime.crimeTypeId);
    const newPoint = {
      id: newCrime.id,
      title: crimeType.title,
      color: crimeType.color,
      wantedPersonId: newCrime?.wantedPersonId,
      crimeDate: newCrime.crimeDate,
      location: newCrime.location,
      description: newCrime.description,
      coords: [newCrime.pointLatitude, newCrime.pointLongitude],
    };

    setPoints((prev) => [...prev, newPoint]);
  }

  const realCrimeUpdated = (updatedCrime) => {
    const crimeType = crimeTypes.find((type) => type.id === updatedCrime.crimeTypeId);
    const updatePoint = {
      id: updatedCrime.id,
      title: crimeType.title,
      wantedPersonId: updatedCrime?.wantedPersonId,
      color: crimeType.color,
      crimeDate: updatedCrime.crimeDate,
      location: updatedCrime.location,
      description: updatedCrime.description,
      coords: [updatedCrime.pointLatitude, updatedCrime.pointLongitude],
    };

    setPoints((prev) =>
      prev.map((p) => (p.id === updatePoint.id ? updatePoint : p))
    );
  }

  const realCrimeDeleted = (deletedCrimeId) => {
    setPoints((prev) => prev.filter((p) => p.id !== deletedCrimeId));
  }

  const fetchGetPoint = async (point) => {
    try {
    const response = await api.get(`/api/crime-marks/${point.id}`);
    const getPoint = {
      id: response.data.id,
      crimeTypeId: response.data.crimeTypeId,
      wantedPersonId: response.data.wantedPersonId,
      wantedPersonName: response.data.wantedPersonName,
      wantedPersonSurname: response.data.wantedPersonSurname,
      wantedPersonPatronymic: response.data.wantedPersonPatronymic,
      wantedPersonBirthDate: response.data.wantedPersonBirthDate,
      crimeDate: response.data.crimeDate,
      location: response.data.location,
      description: response.data.description,
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
      point.id = response.data.id;
      const newPoint = {
        id: point.id,
        title: crimeType.title,
        wantedPersonId: point?.wantedPersonId,
        color: crimeType.color,
        crimeDate: point.crimeDate,
        location: point.location,
        description: point.description,
        coords: [point.pointLatitude, point.pointLongitude],
      };

      setPoints((prev) => [...prev, newPoint]);
      if(connection?.state === "Connected") await connection.invoke("AddingCrime", point);
      setCurrentPoint(null);
      setIsModalOpen(false);
      showNotification("Метка успешно сохранена!");
    } catch(error) {
      console.error("Ошибка при сохранении метки:", error);
    } 
  };

  const fetchUpdatePoint = async (point) => {
    try {
      const response = await api.patch(`/api/crime-marks`, point);
      console.log(response.data.message);
      const crimeType = crimeTypes.find((type) => type.id === point.crimeTypeId);
      
      const updatePoint = {
        id: response.data.id,
        title: crimeType.title,
        wantedPersonId: point?.wantedPersonId,
        color: crimeType.color,
        crimeDate: point.crimeDate,
        location: point.location,
        description: point.description,
        coords: [point.pointLatitude, point.pointLongitude],
      };
      setPoints((prev) =>
        prev.map((p) => (p.id === updatePoint.id ? updatePoint : p))
      );

      if(connection?.state === "Connected") await connection.invoke("UpdatingCrime", point);
      setEditPoint(null);
      showNotification("Изменения метки сохранены!");
    } catch (error) {
      console.error("Ошибка при обновлении метки:", error.response);
    }
  };

  const fetchDeletePoint = async (point) => {
    try {
      await api.delete(`/api/crime-marks/${point.id}`);

      setPoints((prev) => prev.filter((p) => p.id !== point.id));
      if(connection?.state === "Connected") await connection.invoke("DeletingCrime", point.id);
      setEditPoint(null);
      showNotification("Метка успешно удалена!");
    } catch (error) {
      console.error("Ошибка при удалении метки:", error.response);
    }
  };

  const handleAddPoint = async (coords) => {
    const geocodeData = await fetchAddressFromCoordinates(coords);
  
    if (geocodeData) {
      const detailAddress = extractDetailedAddress(geocodeData).fullAddress;
      setCurrentPoint({ location: detailAddress, coords: coords });
    } else {
      setCurrentPoint({ coords: coords });
    }
    setIsModalOpen(true);
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

  const extractDetailedAddress = (data) => {
    const featureMembers = data?.response?.GeoObjectCollection?.featureMember;
  
    if (featureMembers && featureMembers.length > 0) {
      const firstGeoObject = featureMembers[0]?.GeoObject;
      const components =
        firstGeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
  
      if (components) {
        const city = components.find((comp) => comp.kind === "locality")?.name;
        const district = components.find((comp) => comp.kind === "district")?.name;
        const suburb = components.find((comp) => comp.kind === "suburb")?.name;
        const street = components.find((comp) => comp.kind === "street")?.name;
        const house = components.find((comp) => comp.kind === "house")?.name;
  
        return {
          city: city || "-",
          district: district || "-",
          suburb: suburb || "-",
          street: street || "-",
          house: house || "-",
          fullAddress: [city, district || suburb, street, house]
            .filter(Boolean)
            .join(", ") || "Адрес не найден",
        };
      }
    }
    return {
      city: "-",
      district: "-",
      suburb: "-",
      street: "-",
      house: "-",
      fullAddress: "Адрес не найден",
    };
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
  
  const handleMarkerSelect = (point) => {
    setSelectedPoint(point);
  } 

  const onApplyFilters = async({ search, selectedCrimeTypeIds, selectedWantedPersonIds, searchCenter, radius, dateRange }) => {
    setPoints([]);
    const loadedPoints = await fetchGetAllCrimeMarks(crimeTypes, search, 
      selectedCrimeTypeIds, selectedWantedPersonIds,
      searchCenter === null ? { latitude: null, longitude: null } 
      : { latitude: searchCenter.latitude, longitude: searchCenter.longitude },
      radius, { from: dateRange.from, to: dateRange.to }
    )
    
    setPoints(loadedPoints);
  }

  const onResetFilters = async() => {
    setRadiusInMeters(500);
    setSearchCenter({ latitude: null, longitude: null });
    setPoints([]);
    const loadedPoints = await fetchGetAllCrimeMarks(crimeTypes);
    setPoints(loadedPoints);
  }

  const onToggleSearchCenter = () => {
    if(isSettingSearchCenter) {
      setIsSettingSearchCenter(false);
    } else {
      setIsSettingSearchCenter(true);
    }
  }

  const onAddSearchCenter = (coords) => {
    if(isSettingSearchCenter) {
    setSearchCenter({ latitude: coords[0], longitude: coords[1] });
    setIsSettingSearchCenter(false);
    }
  }

  const onSetRadius = (r) => {
    setRadiusInMeters(r);
  }

  const handleToggleStats = () => {
    // ..
    // setStatsData(calculatedStats);
    setIsStatsVisible((prevState) => !prevState);
  };

  return (
        <div className="map-page">
        <div
          className={`filter-panel ${isFilterPanelVisible ? "" : "collapsed"}`}
        >
          <FilterPanel
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
          onToggleSearchCenter={onToggleSearchCenter}
          isSettingSearchCenter={isSettingSearchCenter}
          searchCenter={searchCenter}
          radius={radiusInMeters}
          onSetRadius={onSetRadius}
          onShowStats={handleToggleStats}
          />
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
        isSettingSearchCenter={isSettingSearchCenter}
        searchCenter={searchCenter}
        radius={radiusInMeters}
        onAddSearchCenter={onAddSearchCenter}
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
        
        {isStatsVisible && (
        <Statistic
          onClose={handleToggleStats}
          statsData={points}
          crimeTypes={crimeTypes}
          wantedPersons={wantedPersons}
        />
        )}
      </div>
  );
};

export default MapPage;