import React, { useState, useEffect } from 'react';
import { playGame } from '../api';
import Error from './Error';
import Punchline from './Punchline';
import Vote from './Vote';
import Scores from './Scores';
import { player } from '../storage';
import '../css/main.css';

const Play = () => {
	const [game, setGame] = useState(null);
	const [error, setError] = useState();
	const [conn, setConn] = useState();
	const name = player.get();

	const onerror = (err) => {
		setError(JSON.stringify(err));
	}
	const onmessage = (msg) => {
		const data = JSON.parse(msg.data);
		if (data.message) setError(data.message);
		setGame(data);
	}

	const handlePunchline = (punchline) => {
		conn.send({ name, punchline });
	}

	const handleVote = (vote) => {
		conn.send({ name, vote });
	}

	const showAction = () => {
		if (!game || game.roundsRemaining < 1) return null;
		switch (game.currentAction) {
			case 'play':
				return <Punchline game={game} player={name} onClick={handlePunchline} />;
			case 'vote':
				return <Vote game={game} player={name} onClick={handleVote} />;
			default:
				return null;
		}
	};

	const getSetup = () => {
		if (!game || !game.rounds) return null;
		if (game.roundsRemaining < 1) {
			return <Scores game={game} />;
		}
		const cards = game.rounds[game.roundsRemaining - 1].setup
		return (<div className='setupPhrase'>The difference between <span className='setup'>{cards[0]}</span> and <span className='setup'>{cards[1]}</span> is...</div>)
	};

	useEffect(() => {
		const connect = async() => {
			const id = window.location.pathname.replace('/', '');
			const connection = await playGame({ id, onmessage, onerror });
			setConn(connection);
		}
		connect();
	}, []);

	return (
		<div className="play">
			{error ? <Error message={error} /> : null}
			{getSetup()}
			{showAction()}
		</div>
	);
}

export default Play;
