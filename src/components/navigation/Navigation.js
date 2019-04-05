import React from 'react';
import Logo from '../logo/Logo';

const Navigation = () => {
  return (
    <header>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    </header>
  );
};

export default Navigation;
