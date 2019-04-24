import React from 'react';
import Logo from '../logo/Logo';

const Navigation = ({ isAuthenticated, onAuthChange, onRouteChange }) => {
  return (
    <header>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        {isAuthenticated ? (
          <p>
            <span
              onClick={() => {
                onRouteChange('signin');
                onAuthChange();
              }}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign Out
            </span>
          </p>
        ) : (
          <p>
            <span
              onClick={() => onRouteChange('signin')}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign In
            </span>
            <span
              onClick={() => onRouteChange('register')}
              className="f3 link dim black underline pa3 pointer"
            >
              Register
            </span>
          </p>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
