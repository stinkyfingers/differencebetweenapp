import React from 'react';
import './App.css';
import Play from './components/Play';
import Game from './components/Game';
import Header from './components/Header';
import { player } from './storage';
import UserContext from './UserContext';
import Error from './components/Error';
import { getStatus } from './api';

const getRoute = () => {
  const path = window.location.pathname;
    switch (path) {
      case (path.match(/\/([0-9]+)/) || {}).input:
        return <Play />;
      default:
        return <Game />;
    }
};

const App = () => {
  const [error, setError] = React.useState();
  const useUser = () => {
    const [user, setUser] = React.useState(player.get());
    return {user, setUser};
  };
  const userState = useUser();

  React.useEffect(() => {
    const fetchStatus = async() => {
      const s = await getStatus();
      if (s !== 'OK') setError('Error connecting to API');
    }
    fetchStatus()
  });

  return (
    <div className="App">
     <UserContext.Provider value={userState}>
      <Header />
      <Error message={error} />
      <div className="main">
        {getRoute()}
      </div>
       </UserContext.Provider>
    </div>
  );
};

export default App;
