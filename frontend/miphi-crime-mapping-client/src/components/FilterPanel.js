import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = () => {
  const [search, setSearch] = useState("");
  const [selectedCrimeType, setSelectedCrimeType] = useState("");
  const [radius, setRadius] = useState(1);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCrimeTypeChange = (e) => setSelectedCrimeType(e.target.value);
  const handleRadiusChange = (e) => setRadius(e.target.value);
  const handleDateRangeChange = (field, value) =>
    setDateRange((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3 className="filter-title">Фильтры</h3>
      </div>
      <div className="filter-content">
        {/* Секция поиска */}
        <div className="filter-section">
          <label htmlFor="search">Поиск</label>
          <input
            type="text"
            id="search"
            className="filter-input"
            value={search}
            onChange={handleSearchChange}
            placeholder="Введите текст для поиска..."
          />
        </div>

        {/* Секция выбора вида преступления */}
        <div className="filter-section">
          <label htmlFor="crimeType">Вид преступления</label>
          <select
            id="crimeType"
            className="filter-select"
            value={selectedCrimeType}
            onChange={handleCrimeTypeChange}
          >
            <option value="">Все</option>
            <option value="theft">Кража</option>
            <option value="assault">Нападение</option>
            <option value="vandalism">Вандализм</option>
          </select>
        </div>

        {/* Секция радиуса */}
        <div className="filter-section">
          <label htmlFor="radius">Радиус (км)</label>
          <input
            type="number"
            id="radius"
            className="filter-input"
            value={radius}
            onChange={handleRadiusChange}
            min="1"
            max="100"
          />
        </div>

        {/* Секция временного промежутка */}
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
      </div>
    </div>
  );
};

export default FilterPanel;
