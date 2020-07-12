import React from 'react';
import './App.css';
import Play from './components/Play';
import Game from './components/Game';
import Header from './components/Header';
import { player } from './storage';
import UserContext from './UserContext';

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
  const useUser = () => {
    const [user, setUser] = React.useState(player.get());
    return {user, setUser};
  };
  const userState = useUser();

  return (
    <div className="App">
     <UserContext.Provider value={userState}>
      <Header />
      <div className="main">
        {getRoute()}
      </div>
       </UserContext.Provider>
    </div>
  );
};

export default App;
