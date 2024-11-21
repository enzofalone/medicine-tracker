import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import AddMedicine from './AddMedicine/AddMedicine';
import { Medicine } from './Medicine';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const savedMedicines = JSON.parse(
      localStorage.getItem('medicines') || '[]'
    ) as Medicine[];
    setMedicines(savedMedicines);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const timer = setInterval(() => {
      setMedicines((meds) => [...meds]);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    medicines.forEach((med) => {
      const timeLeft = med.nextDoseTime - Date.now();

      if (timeLeft <= 0 && med.times > 0 && !med.notified) {
        showNotification(med);
        med.notified = true;
      }
    });

    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const showNotification = (medicine: Medicine) => {
    if (Notification.permission === 'granted') {
      new Notification(`Time to take your medicine: ${medicine.name}`, {
        body: `You have ${medicine.times} dose(s) left.`,
      });
    }
  };

  const handleDelete = (index: number) => {
    setMedicines((prevMedicines) => prevMedicines.splice(index, 1));
  };

  const handleAcknowledge = (index: number) => {
    setMedicines((prevMedicines) => {
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

      if (med.times <= 0) {
        updatedMedicines.splice(index, 1);
      }

      return updatedMedicines;
    });
  };

  const getIntervalInMs = (interval: number, unit: 'minutes' | 'hours') => {
    return unit === 'hours' ? interval * 60 * 60 * 1000 : interval * 60 * 1000;
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
    <>
      <BrowserRouter basename="/">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                medicines={medicines}
                getTimeLeft={getTimeLeft}
                handleDelete={handleDelete}
                handleAcknowledge={handleAcknowledge}
              />
            }
          />
          <Route
            path="/dashboard/add"
            element={
              <AddMedicine
                getIntervalInMs={getIntervalInMs}
                medicines={medicines}
                setMedicines={setMedicines}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
