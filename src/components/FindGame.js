import React, { useState } from 'react';
import { joinGame } from '../api';
import Error from './Error';
import { player } from '../storage';


const FindGame = () => {
	const [id, setId] = useState();
	const [error, setError] = useState();

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'id':
				setId(parseInt(e.target.value, 10));
				break;
			default:
		}
	}

	const handleClick = async () => {
		const name = player.get();
		const game = await joinGame({ player: name, id });
		if (game.message) {
			setError(game.message);
			return;
		}
		if (game) {
			window.location.replace(`/${game.id}`);
		}
	}

	const handleRedirect = () => {
		window.location.replace(`/${id}`);
	}

	return (
		<div className="findGame">
			<h3 className='pageHeader'>Find & Join Game</h3>
			{ error ? <Error message={error} /> : null }
			<label htmlFor="id">
				<input name="id" placeholder="Enter Game number..." onChange={handleChange} type="number" />
			</label>
			<button className="btn findGame" onClick={handleClick}  disabled={error || !player.get() ? 'disabled' : null}>Search</button>
			{!player.get() ? <div className='warning'>Username required</div> : null}
			{error === 'player name already exists' ? <button className='btn goToGame' onClick={handleRedirect}>Go To Game</button> : null}
		</div>
	);
}

export default FindGame;
