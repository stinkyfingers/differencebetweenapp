import React from 'react';
import _ from 'lodash';
import '../css/scores.css';

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

    let winner = { value: 0 };
    Object.keys(totals).forEach((user) => {
      if (totals[user] > winner.value) {
        winner.value = totals[user];
        winner.user = user
      }
    })

    return _.map(totals, (total, name) => {
      return <div className='total' key={name}>
        {`${name} received ${total} votes ${ winner.user === name ? "!!!WINNER!!!" : ''}`}
      </div>
    })
  };

  const showAll = () => {
    return _.map(game.rounds, (round, i) => {
      const cards = round.setup;
      return <div className='setup' key={`round-${i}`}>The difference between
        <span className='setup'> {cards[0]}</span> and
        <span className='setup'> {cards[1]}</span> is:
        { _.map(round.plays, (play, user) => (
          <div key={`play-${play}`} className='answers'>
            <span className='answer userAnswer'>{play}:</span>
            <span className='answer user'>{user}</span>
          </div>
        ))
        }
      </div>
    });
  }
  

  return (
    <div className='scores'>
      <h3 className='pageHeader'>Scores</h3>
      <div className='scoreBoard'>{tabulate()}</div>
      <div>
        <h6>Here's what you played:</h6>
        {showAll()}
      </div>
    </div>
  )
};

export default Scores;
