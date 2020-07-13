const api = process.env.NODE_ENV === 'production' ? 'https://differencebetween.herokuapp.com' : 'http://localhost:7000';
const ws = process.env.NODE_ENV === 'production' ? 'ws://differencebetween.herokuapp.com' : 'ws://localhost:7000';

export {
	api,
	ws
}
