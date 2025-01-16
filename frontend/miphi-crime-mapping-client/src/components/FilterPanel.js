import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  crimeTypes = [],
  onApplyFilters = () => {},
  onResetFilters = () => {},
  onToggleSearchCenter = () => {},
  isSettingSearchCenter = false,
  searchCenter = null,
  radius = 1,
  onSetRadius = () => {}
}) => {
  const [search, setSearch] = useState("");
  const [selectedCrimeTypeId, setSelectedCrimeTypeId] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCrimeTypeChange = (e) => setSelectedCrimeTypeId(e.target.value);
  const handleRadiusChange = (e) => onSetRadius(e.target.value);
  const handleDateRangeChange = (field, value) =>
    setDateRange((prev) => ({ ...prev, [field]: value }));

  const handleToggleSearchCenter = () => {
    onToggleSearchCenter();
  };

  const handleApplyFilters = () => {
    onApplyFilters({ search, selectedCrimeTypeId, searchCenter, radius, dateRange });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCrimeTypeId("");
    setDateRange({ from: "", to: "" });
    onResetFilters();
  };

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
          <label htmlFor="crimeType">Вид преступления</label>
          <select
            id="crimeType"
            className="filter-select"
            value={selectedCrimeTypeId}
            onChange={handleCrimeTypeChange}
          >
            {crimeTypes.length > 0 ? (
              <>
                <option value="">Все</option>
                {crimeTypes.map((type, index) => (
                  <option key={index} value={type.id}>{type.title}</option>
                ))}
              </>
            ) : (
              <option disabled>Нет доступных типов преступлений</option>
            )}
          </select>
        </div>

        <div className="filter-section">
          <label htmlFor="radius">Радиус (км)</label>
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
      </div>
    </div>
  );
};

export default FilterPanel;
