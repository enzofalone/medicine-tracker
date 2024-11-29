import './Dashboard.css';
import { Medicine } from '../Medicine';
import { useNavigate } from 'react-router-dom';

function Dashboard({ medicines, setMedicines, getIntervalInMs }: any) {
  const navigate = useNavigate();

  const handleDelete = (index: number) => {
    setMedicines((prevMedicines: Medicine[]) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines.splice(index, 1);
      return updatedMedicines;
    });
  };

  const handleAcknowledge = (index: number) => {
    setMedicines((prevMedicines: Medicine[]) => {
      const updatedMedicines = [...prevMedicines];
      const med = updatedMedicines[index];

      if (med.notified && med.times > 0) {
        med.times -= 1;
        med.notified = false;

        // If there are doses left, set the next dose time
        if (med.times > 0) {
          med.nextDoseTime =
            Date.now() + getIntervalInMs(med.interval, med.unit);
        }
      }

      // delete if last dose
      if (med.times <= 0) {
        updatedMedicines.splice(index, 1);
      }

      return updatedMedicines;
    });
  };

  const getTimeLeft = (nextDoseTime: number) => {
    const timeLeft = nextDoseTime - Date.now();
    if (timeLeft <= 0) {
      return 'Due now!';
    }
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <div className="main">
      <div>
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={() => navigate('/dashboard/add')}>
            Add Medicine
          </button>
        </div>
        <div className="list-section">
          {medicines?.length ? (
            medicines?.map((med: Medicine, index: number) => (
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
