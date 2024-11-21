import { useState } from 'react';
import './AddMedicine.css';
import { Medicine } from '../Medicine';
import { useNavigate } from 'react-router-dom';

function AddMedicine({ setMedicines, medicines, getIntervalInMs }: any) {
  const n = useNavigate();
  const [medicine, setMedicine] = useState('');
  const [interval, setMedicineInterval] = useState(1);
  const [unit, setUnit] = useState<'minutes' | 'hours'>('hours');
  const [times, setTimes] = useState(1);

  const handleAddMedicine = (event: React.FormEvent) => {
    event.preventDefault();
    const intervalInMs = getIntervalInMs(interval, unit);
    const nextDoseTime = Date.now() + intervalInMs;
    const newMedicine: Medicine = {
      name: medicine,
      interval,
      unit,
      times,
      nextDoseTime,
    };
    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);

    // Reset form
    setMedicine('');
    setMedicineInterval(1);
    setTimes(1);
    setUnit('hours');
    n('/dashboard');
  };

  return (
    <div className="main">
      <div className="container-add">
        <h2>Add Medicine</h2>
        <form onSubmit={handleAddMedicine}>
          <label>Medicine Name</label>
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            required
          />

          <label>Interval</label>
          <input
            type="number"
            value={interval}
            min="1"
            onChange={(e) => setMedicineInterval(Number(e.target.value))}
            required
          />
          <label>Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'minutes' | 'hours')}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>

          <label>Times</label>
          <input
            type="number"
            value={times}
            min="1"
            onChange={(e) => setTimes(Number(e.target.value))}
            required
          />
          <button type="submit">Add Medicine</button>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine;
