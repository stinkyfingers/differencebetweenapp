import React, { useState } from 'react';
import { player } from '../storage';
import UserContext from '../UserContext';

const Name = ({ nameCallback }) => {
	const [name, setName] = useState(player.get());
	 const userState = React.useContext(UserContext);

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'name':
				setName(e.target.value);
				break;
			default:
		}
	}

	const handleClick = async () => {
    player.set(name);
		userState.setUser(name);
	}

	return (
		<div className="name">
			<label htmlFor="name">
				<input name="name" placeholder="...enter your name" defaultValue={name} onChange={handleChange} />
			</label>
			<button className="btn saveName" onClick={handleClick}>Save Name</button>
		</div>
	);
}

export default Name;
