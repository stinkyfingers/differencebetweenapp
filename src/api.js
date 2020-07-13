import { api, ws } from './config';

const createGame = async ({ player, rounds }) => {
  try {
    const resp = await fetch(`${api}/game`, {
      method: 'POST',
      body: JSON.stringify({ player, rounds }),
      headers: {'Content-Type': 'application/json'}
    });
    const u = await resp.json();
    if (u.error) return {error: u.error};
    return u;
  } catch (err) {
    return { error: err };
  }
};

const joinGame = async ({ player, id }) => {
  try {
    const resp = await fetch(`${api}/player`, {
      method: 'POST',
      body: JSON.stringify({ player, id }),
      headers: {'Content-Type': 'application/json'}
    });
    const u = await resp.json();
    if (u.error) return {error: u.error};
    return u;
  } catch (err) {
    return { error: err };
  }
};

const playGame = async ({ id, onmessage, onerror }) => {
  const socket = new WebSocket(`${ws}/play/${id}`);
  socket.onmessage = onmessage;
  socket.onerror = onerror;
  const connection = {
    send: (msg) => {
      socket.send(JSON.stringify(msg))
    }
  }
  return connection;
}

const getStatus = async () => {
  try {
    const resp = await fetch(`${api}/status`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });
    const u = await resp.text();
    if (u.error) return {error: u.error};
    return u;
  } catch (err) {
    return { error: err };
  }
}


export { createGame, playGame, joinGame, getStatus };
