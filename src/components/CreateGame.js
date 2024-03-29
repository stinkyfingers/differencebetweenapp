import React, { useState } from 'react';
import { createGame } from '../api';
import Error from './Error';
import UserContext from '../UserContext';
import '../css/creategame.css'

const CreateGame = () => {
  const userState = React.useContext(UserContext);

  const defaultRounds = 6;
	const [rounds, setRounds] = useState(defaultRounds);
  const [clean, setClean] = useState(false);
  const [error, setError] = useState();
  

	const handleChange = (e) => {
    setError(null);
    const rounds = parseInt(e.target.value, 10);
    switch (e.target.name) {
      case 'rounds':
        if (rounds < 1 || rounds > 10) {
          setError('rounds must be between 1 and 10');
          return;
        }
        setRounds(rounds);
        break;
      default:
    }
	};

	const handleClick = async() => {
    const game = await createGame({ player: userState.user, rounds, clean });
    if (game.error) {
      setError(JSON.stringify(game));
      return;
    }
    if (game.message) {
      setError(JSON.stringify(game.message));
      return;
    }
    window.location.replace(`/${game.id}`);
	};

  const handleCheck = (e) => {
    setClean(e.target.checked);
  }

	return (
		<div className="createGame">
      <h3 className='pageHeader'>Create New Game</h3>
      {error ? <Error message={error} /> : null}
      <label htmlFor="rounds">Rounds:
				<input name="rounds" type='number' defaultValue={defaultRounds} min='1' max='10' onChange={handleChange} className="createGameRounds"/>
			</label>
      <label htmlFor="clean">Keep it clean...mostly:
        <input type='checkbox' onClick={handleCheck} name='clean' />
      </label>
			<button className="createGame" onClick={handleClick} disabled={error || !userState.user ? 'disabled' : null}>Create</button>
      {!userState.user ? <div className='warning'>Username required</div> : null}
		</div>
	);
}

export default CreateGame;
