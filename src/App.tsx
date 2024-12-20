import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import AddMedicine from './AddMedicine/AddMedicine';
import { Medicine } from './Medicine';
import Prototype from './Prototype/Prototype';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const getIntervalInMs = (interval: number, unit: 'minutes' | 'hours') => {
    return unit === 'hours' ? interval * 60 * 60 * 1000 : interval * 60 * 1000;
  };

  useEffect(() => {
    const savedMedicines = JSON.parse(
      localStorage.getItem('medicines') || '[]'
    ) as Medicine[];

    setMedicines(savedMedicines);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const timer = setInterval(() => {
      setMedicines((meds: Medicine[]) => [...meds]);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    medicines.forEach((med: Medicine) => {
      const timeLeft = med.nextDoseTime - Date.now();

      if (timeLeft <= 0 && med.times > 0 && !med.notified) {
        showNotification(med);
        med.notified = true;
      }
    });

    localStorage.setItem('medicines', JSON.stringify(medicines));
    console.log('Medicine change detected');
  }, [medicines]);

  const showNotification = (medicine: Medicine) => {
    if (Notification.permission === 'granted') {
      new Notification(`Time to take your medicine: ${medicine.name}`, {
        body: `You have ${medicine.times} dose(s) left.`,
      });
    }
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
          <Route path="/prototype" element={<Prototype />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                medicines={medicines}
                setMedicines={setMedicines}
                getIntervalInMs={getIntervalInMs}
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
