import React from 'react';
import './StatsModal.css';

const StatsModal = ({ onClose, statsData = [] }) => {
  return (
    <div className="stats-modal">
      <h3 className="stats-title">Статистика по меткам</h3>
      <div className="stats-content">
        {statsData.length > 0 ? (
          <ul>
            {statsData.map((stat, index) => (
              <li key={index}>
                <strong>{stat.title}:</strong> {stat.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для отображения статистики.</p>
        )}
      </div>
      <button className="stats-close-button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export default StatsModal;
