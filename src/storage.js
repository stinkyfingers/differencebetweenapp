const player = {
  get: () => localStorage.getItem('name'),
  set: (player) => localStorage.setItem('name', player)
};

export {
  player
};
