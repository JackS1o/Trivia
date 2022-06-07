import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import PropTypes from 'prop-types';
import style from './Ranking.module.css';

class Ranking extends React.Component {
  render() {
    const local = JSON.parse(localStorage.getItem('playerRanking')) || [];
    const localOrder = local.sort((a, b) => b.playerFinalsScore - a.playerFinalsScore);
    const { history } = this.props;
    return (
      <div className="main_div"> 
        <div className={ style.main_div_ranking }>
          <div className={ style.div_ranking }>
            <div className={ style.feedback_header }>
              <button
                className={ style.home_btn }
                data-testid="btn-go-home"
                id="btn-go-home"
                type="submit"
                onClick={ () => history.push('/') }
              >
                <AiOutlineHome />
                <br />
                Home
              </button>
              <h1 data-testid="ranking-title">
                <strong>Ranking</strong>
              </h1>
            </div>
            {localOrder.map((ranking, index) => (
              <div
                className={ style.placar }
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
