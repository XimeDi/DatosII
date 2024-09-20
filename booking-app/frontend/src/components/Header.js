import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      {/* Agregar más enlaces según sea necesario */}
    </nav>
  );
};

export default Header;
