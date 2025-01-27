import React, { useState, useEffect, useRef } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement,  CategoryScale, LinearScale } from "chart.js";
import './Statistic.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement,  CategoryScale, LinearScale);

const Statistic = ({ onClose, statsData = [], crimeTypes = [], wantedPersons = [] }) => {

  const [selectedCrimeTypeIds, setSelectedCrimeTypeIds] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPersonIds, setSelectedPersonIds] = useState([]);
  const [viewMode, setViewMode] = useState("crimeTypes");

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);
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

  const handleCheckboxChangeCrimeType = (id) => {
    setSelectedCrimeTypeIds((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedCrimeTypeIds([]);
    setDateRange({ start: "", end: "" });
    setSelectedPersonIds([]);
    setSortOrder("desc");
  };

  const toggleSortOrderWantedPersons = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  
  const handleCheckboxChangeWantedPersons = (id) => {
    setSelectedPersonIds((prev) =>
      prev.includes(id) ? prev.filter((personId) => personId !== id) : [...prev, id]
    );
  };

  const filteredDataForTypes = selectedCrimeTypeIds.length !== 0
  ? statsData.filter((stat) => {
    const isInType =
      selectedCrimeTypeIds.includes(
        crimeTypes.find((type) => type.title === stat.title)?.id
      );

    const isInDateRange =
      (!dateRange.start || new Date(stat.crimeDate) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(stat.crimeDate) <= new Date(dateRange.end));

    return isInType && isInDateRange;
  })
  : statsData.filter((stat) => {
    const isInDateRange =
      (!dateRange.start || new Date(stat.crimeDate) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(stat.crimeDate) <= new Date(dateRange.end));

    return isInDateRange;
  });

  const filteredCrimeTypes = selectedCrimeTypeIds.length !== 0
  ? crimeTypes.filter((type) =>
    selectedCrimeTypeIds.includes(type.id)
  ) : crimeTypes;

  const labelsCrimeTypes = filteredCrimeTypes.map((type) => type.title);
  const dataCrimeTypes = filteredCrimeTypes.map((type) => {
    const filteredStats = filteredDataForTypes.filter(
      (stat) => stat.title === type.title
    );
    return filteredStats.length;
  });
  const colorsCrimeTypes = filteredCrimeTypes.map((type) => type.color);

  const chartDataCrimeTypes = {
    labels: labelsCrimeTypes,
    datasets: [
      {
        data: dataCrimeTypes,
        backgroundColor: colorsCrimeTypes,
        borderColor: "#2c3e50",
        borderWidth: 2,
      },
    ],
  };

  const chartOptionsCrimeTypes = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const personCrimeCounts = wantedPersons.map((person) => {
    const crimeCount = statsData.filter(
      (stat) => stat.wantedPersonId === person.id
    ).length;
  
    return {
      ...person,
      crimeCount,
    };
  });
  
  const unknownCrimeCount = statsData.filter(
    (stat) => stat.wantedPersonId === null
  ).length;
  
  const fullPersons = [
    ...personCrimeCounts,
    {
      id: "unknown",
      surname: "Неизвестно",
      name: "",
      patronymic: "",
      crimeCount: unknownCrimeCount,
    },
  ];

  const filteredPersons = selectedPersonIds.length !==0 ? fullPersons.filter(
    (person) => person.crimeCount > 0 && selectedPersonIds.includes(person.id)
  ) : fullPersons.filter((person) => person.crimeCount > 0);
  
  const sortedPersons = [...filteredPersons].sort((a, b) => {
    return sortOrder === "desc"
      ? b.crimeCount - a.crimeCount
      : a.crimeCount - b.crimeCount;
  });
  
  const labelsWantedPersons = sortedPersons.map(
    (person) => `${person.surname} ${person.name} ${person.patronymic ?? ""}`.trim()
  );
  const dataWantedPersons = sortedPersons.map((person) => person.crimeCount);
  
  const chartDataWantedPersons = {
    labels: labelsWantedPersons,
    datasets: [
      {
        label: "Количество преступлений",
        data: dataWantedPersons,
        backgroundColor: labelsWantedPersons.map((label) =>
          label === "Неизвестно" ? "#0ab35e" : "#1abc9c"
        ),
        borderColor: "#16a085",
        borderWidth: 2,
      },
    ],
  };

  const chartOptionsWantedPersons = {
    responsive: true, // График будет адаптивным
    maintainAspectRatio: false,
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      min: 0,
      max: 15,
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 50,
      },
    },
  };

  return (
    <div className="stats-modal">
      <button className="stats-close-icon" onClick={onClose}>
        ✖
      </button>
      <h3 className="stats-title">Статистика по выбранным преступлениям</h3>

      <div className="stats-navigation">
        <button
          className={viewMode === "crimeTypes" ? "active" : ""}
          onClick={() => setViewMode("crimeTypes")}
        >
          По типам преступлений
        </button>
        <button
          className={viewMode === "criminals" ? "active" : ""}
          onClick={() => setViewMode("criminals")}
        >
          По преступникам
        </button>
      </div>

      {viewMode === "crimeTypes" ? (
        <>
        <div className="stats-filters">
          <div className="stats-filter-dropdown" ref={dropdownRef}>
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
                        onChange={() => handleCheckboxChangeCrimeType(type.id)}
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
          {filteredDataForTypes.length > 0 ? (
            <div className="stats-main">
              <div className="stats-chart">
                <Pie data={chartDataCrimeTypes} options={chartOptionsCrimeTypes} />
              </div>
              <ul className="stats-list">
                {filteredCrimeTypes.map((type, index) => (
                  <li key={type.id}>
                    <span
                      className="stats-color-indicator"
                      style={{
                        backgroundColor:
                          chartDataCrimeTypes.datasets[0].backgroundColor[index],
                      }}
                    ></span>
                    <strong>{type.title}: {dataCrimeTypes[index]}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Нет данных для отображения статистики.</p>
          )}
        </div>
        </>
      ) : (
        <>
        <div className="stats-filters">
          <button className="sort-button" onClick={toggleSortOrderWantedPersons}>
            Сортировать по {sortOrder === "desc" ? "возрастанию" : "убыванию"}
          </button>

          <div className="stats-filter-dropdown" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            > 
            Выберите преступников 
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-list">
                {fullPersons.map((person) => (
                  <li key={person.id} className="dropdown-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPersonIds.includes(person.id)}
                        onChange={() => handleCheckboxChangeWantedPersons(person.id)}
                      />
                      {`${person.surname} ${person.name} ${person.patronymic ?? ""}`.trim()}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="stats-content">
          {sortedPersons.length > 0 ? (
            <div className="stats-chart bar-chart">
                <div className="bar-div" style={{ minWidth: `${chartDataWantedPersons.labels.length * 60}px` }}>
                  <Bar data={chartDataWantedPersons} options={chartOptionsWantedPersons}/>
                </div>
            </div>
          ) : (
            <p>Нет данных для отображения статистики по преступникам.</p>
          )}
        </div>
        </>

      )}
      <button className="stats-reset-button" onClick={handleResetFilters}>
        Сбросить фильтры статистики
      </button>
    </div>
  );
};

export default Statistic;
