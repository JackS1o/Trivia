import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const local = JSON.parse(localStorage.getItem('playerRanking')) || [];
    const localOrder = local.sort((a, b) => b.playerFinalsScore - a.playerFinalsScore);
    const { history } = this.props;
    return (
      <div className="main-div-ranking">
        <div className="div-ranking">
          <button
            className="home-btn"
            data-testid="btn-go-home"
            id="btn-go-home"
            type="submit"
            onClick={ () => history.push('/') }
          >
            <AiOutlineHome />
            <br />
            Home
          </button>
          <h1 data-testid="ranking-title"><strong>Ranking</strong></h1>
          {localOrder.map((ranking, index) => (
            <div
              className="placar"
              key={ index }
            >
              <span>
                {index + 1}
                ° Lugar
              </span>
              <p data-testid={ `player-name-${index}` }>
                <strong>{ranking.playerName}</strong>
              </p>
              <p data-testid={ `player-score-${index}` }>
                <strong>{ranking.playerFinalsScore}</strong>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
