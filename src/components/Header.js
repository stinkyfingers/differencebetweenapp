import React from 'react';
import '../css/Header.css';
import Name from './Name';
import { player } from '../storage';

const Header  = ({ nameCallback }) => {
  const handleClick = () => {
    window.location.replace(`/`);
  }
  const id = window.location.pathname.replace('/', '');

  return (
    <div className="header">
        <div className='logo'>
          <img className="logo" src={require("../logos/logo.png")} alt="The Difference Between" onClick={handleClick} />
        </div>
        <div className='welcome'>
          <div className='playerName'>{player.get() ? '': 'Please enter your name'}</div>
          <div className='id'>{id ? `Game Number: ${id}` : ''}</div>
          <div className='gameNumberInstructions'>Provide this number to your friends before starting</div>
        </div>
        <div className='info'>
          <Name nameCallback={nameCallback} />
        </div>
    </div>
  );
};

export default Header;
