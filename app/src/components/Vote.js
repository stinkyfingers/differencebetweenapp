import React from 'react';
import _ from 'lodash';
import Waiting from './Waiting';


const Vote = ({ game, player, onClick }) => {
  const [selected, setSelected] = React.useState();

  const handleClick = (e) => {
    onClick(e.target.innerHTML);
    setSelected(e.target.innerHTML);
  }

  const getLines = () => {
    const votes = _.get(game.rounds, [game.roundsRemaining - 1, 'plays'])
    return _.map(votes, (v) => {
      return (<div key={v} className={selected === v ? 'selected vote' : 'vote'} onClick={handleClick}>{v}</div>)
    });
  };

  const isWaiting = () => {
    const play = _.get(game, ['rounds', [game.roundsRemaining - 1], 'votes', player])
    if (play) return true;
    return false;
  }


  return (
    <div className='votePage'>
      <div className='directions'>Vote for your favorite:</div>
      <div className='cards'>
        {isWaiting() ? <Waiting /> : getLines()}
      </div>
    </div>
  )
};

export default Vote;
