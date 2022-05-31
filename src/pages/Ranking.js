import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const local = JSON.parse(localStorage.getItem('playerRanking')) || [];
    const localOrder = local.sort((a, b) => b.playerFinalsScore - a.playerFinalsScore);
    const { history } = this.props;
    return (
      <div>
        <button
          data-testid="btn-go-home"
          id="btn-go-home"
          type="submit"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <h2 data-testid="ranking-title">Ranking</h2>
        {localOrder.map((ranking, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{ranking.playerName}</p>
            <p data-testid={ `player-score-${index}` }>{ranking.playerFinalsScore}</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
