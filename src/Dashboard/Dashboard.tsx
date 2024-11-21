import './Dashboard.css';
import { Medicine } from '../Medicine';
import { useNavigate } from 'react-router-dom';

function Dashboard({
  getTimeLeft,
  handleAcknowledge,
  handleDelete,
  medicines,
}: any) {
  const n = useNavigate();

  return (
    <div className="main">
      <div>
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={() => n('/dashboard/add')}>Add Medicine</button>
        </div>
        <div className="list-section">
          {medicines.length ? (
            medicines.map((med: Medicine, index: number) => (
              <div className="card" key={index}>
                <div>
                  <strong>{med.name}</strong> - Every {med.interval} {med.unit},{' '}
                  {med.times} more times
                </div>
                <div>Next dose in: {getTimeLeft(med.nextDoseTime)}</div>
                <div className="section-action">
                  {med.times > 0 && med.nextDoseTime - Date.now() <= 0 && (
                    <button
                      className="button-take"
                      onClick={() => handleAcknowledge(index)}
                    >
                      Take Medicine
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
                    className="button-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3 className="no-pending">No medicines pending to take! 🎉</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
