import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const n = useNavigate();
  return (
    <header>
      <div className="content">
        <div>
          <img
            src={'/icon.jpg'}
            width={32}
            height={32}
            alt={'Medicine Tracker Logo'}
          />
        </div>
        <div className="link-section">
          <h3 className={'header-button'} onClick={() => n('/')}>
            Home
          </h3>
          <h3 className={'header-button'} onClick={() => n('/prototype')}>
            Prototype
          </h3>
          {isLoggedIn ? (
            <h3 className={'header-button'} onClick={() => n('/dashboard')}>
              Dashboard
            </h3>
          ) : (
            <h3 className={'header-button'} onClick={() => n('/login')}>
              Log In
            </h3>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
