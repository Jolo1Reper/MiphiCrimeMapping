import React, { useState, useEffect, useRef } from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  crimeTypes = [],
  wantedPersons = [],
  onApplyFilters = () => {},
  onResetFilters = () => {},
  onToggleSearchCenter = () => {},
  isSettingSearchCenter = false,
  searchCenter,
  radius = 1,
  onSetRadius = () => {},
  onShowStats = () => {}
}) => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const [isDropdownOpenTypes, setIsDropdownOpenTypes] = useState(false);
  const [isDropdownOpenPersons, setIsDropdownOpenPersons] = useState(false);
  const [selectedCrimeTypeIds, setSelectedCrimeTypeIds] = useState([]);
  const [selectedWantedPersonIds, setSelectedWantedPersoIds] = useState([]);

  const dropdownTypesRef = useRef(null);
  const dropdownPersonsRef = useRef(null);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleRadiusChange = (e) => onSetRadius(e.target.value);
  const handleDateRangeChange = (field, value) =>
    setDateRange((prev) => ({ ...prev, [field]: value }));

  const handleToggleSearchCenter = () => {
    onToggleSearchCenter();
  };

  const handleApplyFilters = () => {
    onApplyFilters({ search, selectedCrimeTypeIds, selectedWantedPersonIds, searchCenter, radius, dateRange });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCrimeTypeIds([]);
    setSelectedWantedPersoIds([]);
    setDateRange({ from: "", to: "" });
    onResetFilters();
  };

  const handleToggleStats = () => {
    setIsStatsVisible(prevState => !prevState);
  };

  const handleCheckboxChangeTypes = (id) => {
    setSelectedCrimeTypeIds((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  const handleClickOutsideTypes = (event) => {
    if (dropdownTypesRef.current && !dropdownTypesRef.current.contains(event.target)) {
      setIsDropdownOpenTypes(false);
    }
  };

  const handleCheckboxChangePersons = (id) => {
    setSelectedWantedPersoIds((prev) =>
      prev.includes(id) ? prev.filter((personId) => personId !== id) : [...prev, id]
    );
  };

  const handleClickOutsidePersons = (event) => {
    if (dropdownPersonsRef.current && !dropdownPersonsRef.current.contains(event.target)) {
      setIsDropdownOpenPersons(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpenTypes) {
      document.addEventListener("mousedown", handleClickOutsideTypes);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideTypes);
    }

    return () => document.removeEventListener("mousedown", handleClickOutsideTypes);
  }, [isDropdownOpenTypes]);

  useEffect(() => {
    if (isDropdownOpenPersons) {
      document.addEventListener("mousedown", handleClickOutsidePersons);
    } else {
      document.removeEventListener("mousedown", handleClickOutsidePersons);
    }

    return () => document.removeEventListener("mousedown", handleClickOutsidePersons);
  }, [isDropdownOpenPersons]);


  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3 className="filter-title">Фильтры</h3>
      </div>
      <div className="filter-content">
        <div className="filter-section">
          <label htmlFor="search">Поиск</label>
          <div className="search-container">
            <input
              type="text"
              id="search"
              className="filter-input"
              value={search}
              onChange={handleSearchChange}
              placeholder="Введите текст для поиска..."
            />
            <button className="search-button">
              <img
                src="/icons/search.png"
                alt="Поиск"
                className="search-icon"
              />
            </button>
          </div>
        </div>

        <div className="filter-section">
          <div className="stats-filter-dropdown" ref={dropdownTypesRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpenTypes((prev) => !prev)}
            >
              Выберите типы преступлений
            </button>
            {isDropdownOpenTypes && (
              <ul className="dropdown-list">
                {crimeTypes.map((type) => (
                  <li key={type.id} className="dropdown-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCrimeTypeIds.includes(type.id)}
                        onChange={() => handleCheckboxChangeTypes(type.id)}
                      />
                      {type.title}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="filter-section">
          <div className="stats-filter-dropdown" ref={dropdownPersonsRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpenPersons((prev) => !prev)}
            >
              Выберите преступников
            </button>
            {isDropdownOpenPersons && (
              <ul className="dropdown-list">
                <li key={"00000000-0000-0000-0000-000000000000"} className="dropdown-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedWantedPersonIds.includes("00000000-0000-0000-0000-000000000000")}
                      onChange={() => handleCheckboxChangePersons("00000000-0000-0000-0000-000000000000")}
                    />
                    Неизвестно
                  </label>
                </li>
                {wantedPersons.map((person) => (
                  <li key={person.id} className="dropdown-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedWantedPersonIds.includes(person.id)}
                        onChange={() => handleCheckboxChangePersons(person.id)}
                      />
                      {person.surname} {person.name} {person.patronymic ?? ""}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="filter-section">
          <label htmlFor="radius">Радиус (в метрах)</label>
          <div className="radius-container">
            <input
              type="number"
              id="radius"
              className="filter-input"
              value={radius}
              onChange={handleRadiusChange}
              min="1"
              max="100"
            />
            <button
              className={`toggle-center-button ${
                isSettingSearchCenter ? "active" : ""
              }`}
              onClick={handleToggleSearchCenter}
            >
              {isSettingSearchCenter ? "Выбор центра активен" : "Выбрать центр"}
            </button>
          </div>
        </div>

        <div className="filter-section">
          <label>Промежуток времени</label>
          <div className="filter-date-range">
            <input
              type="date"
              className="filter-input"
              value={dateRange.from}
              onChange={(e) => handleDateRangeChange("from", e.target.value)}
            />
            <span className="filter-date-divider">—</span>
            <input
              type="date"
              className="filter-input"
              value={dateRange.to}
              onChange={(e) => handleDateRangeChange("to", e.target.value)}
            />
          </div>
        </div>
        <div className="filter-actions">
          <button className="apply-button" onClick={handleApplyFilters}>
            Применить
          </button>
          <button className="reset-button" onClick={handleResetFilters}>
            Сбросить
          </button>
        </div>

        <div className="filter-section stats-section-div">
          <button className="stats-button" onClick={onShowStats}>
            Статистика
          </button>
        </div>

      </div>

      {isStatsVisible && (
        <div className="stats-overlay">
          <div className="stats-window">
            <h3>Статистика по меткам</h3>
            <p>Здесь будет информация о метках с примененными фильтрами.</p>
            <button className="close-stats" onClick={handleToggleStats}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
