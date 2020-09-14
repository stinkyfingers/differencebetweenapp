import React from 'react';
import _ from 'lodash';

const Scores = ({ game }) => {
  const tabulate = () => {
    const totals = {};
    _.map(game.rounds, (round) => {
      _.forEach(round.votes, (v) => {
        const player = _.findKey(round.plays, play => play === v);
        if (!totals[player]) {
          totals[player] = 0;
        }
        totals[player]++;
      });
    });

    return _.map(totals, (total, name) => {
      return <div className='total' key={name}>{name} - {total}</div>
    })
  };

  const showAll = () => {
    return _.map(game.rounds, (round, i) => {
      const cards = round.setup;
      return _.map(round.plays, (play, name) => {
        return (
          <div className='setup' key={`round-${i}-${name}`}>The difference between
            <span className='setup'> {cards[0]}</span> and
            <span className='setup'> {cards[1]}</span> is
            <span className='setup'> {play}</span> -
            <span className='player'> {name}</span>
          </div>);
      });
    });
  }

  return (
    <div className='scores'>
      <h3 className='pageHeader'>Scores</h3>
      <div className='scoreBoard'>{tabulate()}</div>
      {showAll()}
    </div>
  )
};

export default Scores;
