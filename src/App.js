import React from 'react';
import './App.css';
import Play from './components/Play';
import Game from './components/Game';
import Header from './components/Header';
import UserContext from './UserContext';
import Error from './components/Error';
import { getStatus } from './api';
import { player } from './storage';

const getRoute = () => {
  const path = window.location.pathname;
    switch (path) {
      case (path.match(/\/([0-9]+)/) || {}).input:
        return <Play />;
      default:
        return <Game />;
    }
};

const useUser = () => {
  const [user, set] = React.useState(player.get() || '');
  const setUser = (input) => {
    player.set(input);
    set(input);
  };
    
  return { user, setUser };
};

const App = () => {
  const [error, setError] = React.useState();

  const userState = useUser();

  React.useEffect(() => {
    const fetchStatus = async() => {  
      const s = await getStatus();
      if (s !== 'OK') setError('Error connecting to API');
    }
    fetchStatus();
  }, []);

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
