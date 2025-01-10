import "./MarkerPanel.css";

const MarkerPanel = ({
  points = []
}) => {

  return (
    <div className="marker-panel">
      <div className="marker-header">
        <h3>Метки</h3>
      </div>
      <div className="marker-content">
        {points.length > 0 ? (
          <ul className="marker-list mt-3">
            {points.map((point, index) => (
              <li key={index} className="marker-list-item">
                <strong>{point.title}</strong>
                <p>{point.location}</p>
                <small>
                  {point.coords[0].toFixed(6)}, {point.coords[1].toFixed(6)}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">Нет добавленных меток.</p>
        )}
      </div>
    </div>
  );
};

export default MarkerPanel;