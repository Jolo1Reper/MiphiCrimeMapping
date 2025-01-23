import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import './Statistic.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistic = ({ onClose, statsData = [], crimeTypes = [] }) => {

  const [selectedCrimeTypeIds, setSelectedCrimeTypeIds] = useState(
    crimeTypes.map((type) => type.id)
  );
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleCheckboxChange = (id) => {
    setSelectedCrimeTypeIds((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedCrimeTypeIds(crimeTypes.map((type) => type.id));
    setDateRange({ start: "", end: "" });
  };

  const filteredStatsData = statsData.filter((stat) => {
    const isInType =
      selectedCrimeTypeIds.includes(
        crimeTypes.find((type) => type.title === stat.title)?.id
      );

    const isInDateRange =
      (!dateRange.start || new Date(stat.crimeDate) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(stat.crimeDate) <= new Date(dateRange.end));

    return isInType && isInDateRange;
  });

  const filteredCrimeTypes = crimeTypes.filter((type) =>
    selectedCrimeTypeIds.includes(type.id)
  );

  const labels = filteredCrimeTypes.map((type) => type.title);
  const data = filteredCrimeTypes.map((type) => {
    const filteredStats = filteredStatsData.filter(
      (stat) => stat.title === type.title
    );
    return filteredStats.length;
  });
  const colors = filteredCrimeTypes.map((type) => type.color);

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderColor: "#2c3e50",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="stats-modal">
      <button className="stats-close-icon" onClick={onClose}>
        ✖
      </button>
      <h3 className="stats-title">Статистика по выбранным преступлениям</h3>

      <div className="stats-filters">
        <div className="stats-filter-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            Выберите типы преступлений
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-list">
              {crimeTypes.map((type) => (
                <li key={type.id} className="dropdown-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCrimeTypeIds.includes(type.id)}
                      onChange={() => handleCheckboxChange(type.id)}
                    />
                    {type.title}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="filter-date-range">
          <label>Промежуток времени</label>
            <input
              type="date"
              className="filter-input"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
            />
            <input
              type="date"
              className="filter-input"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
            />
        </div>
      </div>

      <div className="stats-content">
        {filteredStatsData.length > 0 ? (
          <div className="stats-main">
            <div className="stats-chart">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <ul className="stats-list">
              {filteredCrimeTypes.map((type, index) => (
                <li key={type.id}>
                  <span
                    className="stats-color-indicator"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  <strong>{type.title}: {data[index]}</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Нет данных для отображения статистики.</p>
        )}
      </div>

      <button className="stats-reset-button" onClick={handleResetFilters}>
        Сбросить фильтры статистики
      </button>
    </div>
  );
};

export default Statistic;
