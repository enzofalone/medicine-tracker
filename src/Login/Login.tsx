import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsLoggedIn }: any) {
  const n = useNavigate();

  return (
    <div className="login">
      <div>
        <h2>Login</h2>
        <h4>(Mock login)</h4>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoggedIn(true);
          n('/dashboard');
        }}
      >
        <label>Username</label>
        <input type="text" required />
        <label>Password</label>
        <input type="password" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
