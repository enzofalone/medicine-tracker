import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing({ isLoggedIn }: any) {
  const n = useNavigate();

  return (
    <section className="main-info">
      <h1>Medicine Tracker</h1>
      <div className="body">
        <div className="text-content">
          <h2>We Are Here to Help</h2>
          <p>
            Manage your medication schedule effortlessly with Medicine Tracker.
            Keep track of dosage, timings, and progress, all in one place.
          </p>
          {!isLoggedIn ? (
            <button
              className="btn"
              onClick={() => {
                n('/login');
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                n('/dashboard');
              }}
            >
              Dashboard
            </button>
          )}
        </div>
        <img className="logo" src="icon.jpg" alt="app logo" />
      </div>
    </section>
  );
}

export default Landing;
