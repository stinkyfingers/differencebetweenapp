import React from 'react';
import '../css/Header.css';
import Name from './Name';

const Header  = ({ nameCallback }) => {
  const handleClick = () => {
    window.location.replace(`/`);
  }
  const id = window.location.pathname.replace('/', '');

  return (
    <div className="header">
        <img className="logo" src={require("../logos/logo.png")} alt="The Difference Between" onClick={handleClick} />
        <div className='info'>
          <Name nameCallback={nameCallback} />
          <span className='id'>{id ? `Game Number: ${id}` : ''}</span>
        </div>
    </div>
  );
};

export default Header;
