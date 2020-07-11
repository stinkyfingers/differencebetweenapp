import React, { useState } from 'react';
import FindGame from './FindGame';
import CreateGame from './CreateGame';

const Game = () => {
	const [component, setComponent] = useState('find')

	const handleClick = async () => {
    if (component === 'find') {
      setComponent('create');
    } else {
      setComponent('find');
    }
	}


	return (
		<div className="game">
		  <button className='btn game' onClick={handleClick}>{component === 'find' ? 'Create New Game' : 'Find Game'}</button>
      {component === 'find' ? <FindGame /> : <CreateGame />}
		</div>
	);

}

export default Game;
