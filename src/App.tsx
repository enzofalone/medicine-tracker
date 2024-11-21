import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import { useState } from 'react';
import AddMedicine from './AddMedicine/AddMedicine';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const getIntervalInMs = (interval: number, unit: 'minutes' | 'hours') => {
    return unit === 'hours' ? interval * 60 * 60 * 1000 : interval * 60 * 1000;
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
