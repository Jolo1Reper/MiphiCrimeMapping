import "./MarkerPanel.css";

const MarkerPanel = ({ points = [], onMarkerSelect }) => {

  const handleMarkerClick = (point) => {
    onMarkerSelect(point); // Передаем выбранную метку в родительский компонент
  };

  return (
    <div className="marker-panel">
      <div className="marker-header">
        <h3 className="marker-title">Метки</h3>
      </div>
      <div className="marker-content">
        {points.length > 0 ? (
          <ul className="marker-list">
            {points.map((point, index) => (
              <li
                key={index}
                className="marker-list-item"
                onClick={() => handleMarkerClick(point)} // Вызываем при клике
              >
                <strong className="marker-item-title">{point.title}</strong>
                <p className="marker-item-detail">
                  <span>Местонахождение:</span> {point.location}
                </p>
                <p className="marker-item-detail">
                  <span>Дата:</span> {point.crimeDate.split("T")[0]}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="marker-empty">Нет добавленных меток.</p>
        )}
      </div>
    </div>
  );
};


export default MarkerPanel;
