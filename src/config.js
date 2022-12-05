const api = process.env.NODE_ENV === 'production' ? 'https://web-production-694c.up.railway.app' : 'http://localhost:7777';
const ws = process.env.NODE_ENV === 'production' ? 'wss://web-production-694c.up.railway.app' : 'ws://localhost:7777';

export {
	api,
	ws
}
