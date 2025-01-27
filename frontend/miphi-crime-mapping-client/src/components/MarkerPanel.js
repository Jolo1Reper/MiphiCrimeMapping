import "./MarkerPanel.css";

const MarkerPanel = ({ points = [], onMarkerSelect }) => {

  const handleMarkerClick = (point) => {
    onMarkerSelect(point);
  };

  return (
    <div className="marker-panel">
      <div className="marker-header">
        <h3 className="marker-title">Метки преступлений</h3>
      </div>
      <div className="marker-content">
        {points.length > 0 ? (
          <ul className="marker-list">
            {points.map((point, index) => (
              <li
                key={index}
                className="marker-list-item"
                onClick={() => handleMarkerClick(point)}
              >
                <strong className="marker-item-title">{point.title}</strong>
                <p className="marker-item-detail">
                  <span>Описание:</span> {point.description || "-"}
                </p>
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
          <p className="marker-empty">Преступлений нет.</p>
        )}
      </div>
    </div>
  );
};


export default MarkerPanel;
