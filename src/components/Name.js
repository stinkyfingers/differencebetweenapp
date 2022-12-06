import React from 'react';
import UserContext from '../UserContext';

const Name = () => {
	const userState = React.useContext(UserContext);

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'name':
				userState.setUser(e.target.value);

				break;
			default:
		}
	}


	return (
		<div className="name">
			<label htmlFor="name">
				<input name="name" placeholder="...enter your name" defaultValue={userState.user} onChange={handleChange} />
			</label>
		</div>
	);
}

export default Name;
