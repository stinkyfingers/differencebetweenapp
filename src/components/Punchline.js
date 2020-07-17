import React from 'react';
import _ from 'lodash';
import Waiting from './Waiting';

const Punchline = ({ game, player, onClick }) => {
  const [custom, setCustom] = React.useState();
  const [selected, setSelected] = React.useState();

  const handleClick = (e) => {
    if (selected) return;
    onClick(e.target.innerHTML);
    setSelected(e.target.innerHTML);
  }

  const handleChange = (e) => {
    setCustom(e.target.value);
  };

  const getLines = () => {
    const punchlines = _.get(_.find(game.players, (p) => p.name === player), 'punchlines');
    const customCard = custom ? <div key='customPunchline' className={selected === custom ? 'selected punchline customPunchline' : 'punchline customPunchline'} onClick={handleClick}>{custom}</div> : null;
    const cards = _.map(punchlines, (p) => {
      return (<div key={p} className={selected === p ? 'selected punchline' : 'punchline'} onClick={handleClick}>{p}</div>);
    });
    return _.union([customCard], cards);
  };

  const isWaiting = () => {
    const play = _.get(game, ['rounds', [game.roundsRemaining - 1], 'plays', player])
    if (play) return true;
    return false;
  }

  return (
    <div className='punchlinePage'>
      <div className='directions'>Select best answer:</div>
      <input type='text' onChange={handleChange} name='custom' className='customInput' placeholder='enter a custom punchline here...'/>
      <div className='cards'>
        {isWaiting() ? <Waiting /> : getLines()}
      </div>
    </div>
  )
};

export default Punchline;
