import React from 'react';
import _ from 'lodash';
import Waiting from './Waiting';


const Vote = ({ game, player, onClick }) => {
  const [selected, setSelected] = React.useState();

  const handleClick = (value) => {
    onClick(value);
    setSelected(value);
  }

  const getLines = () => {

    const votes = _.get(game.rounds, [game.roundsRemaining - 1, 'plays'])
    return _.map(votes, (v, i) => {
      return (<div key={v} className={selected === v ? 'selected vote' : 'vote'} onClick={() => handleClick(v)}>{v}<div className='playerName'>{`(${i})`}</div></div>)
    });
  };

  const isWaiting = () => {
    const play = _.get(game, ['rounds', [game.roundsRemaining - 1], 'votes', player])
    if (play) return true;
    return false;
  }


  return (
    <div className='votePage'>
      <div className='directions'>Vote for your favorite punchline from the hilarious options below:</div>
      <div className='cards'>
        {isWaiting() ? <Waiting /> : getLines()}
      </div>
    </div>
  )
};

export default Vote;
