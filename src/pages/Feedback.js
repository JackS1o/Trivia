import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('playerRanking')) || [];
    this.setState({ ranking });
  }

  handleClickToLogin = () => {
    const { history, resetAll } = this.props;
    history.push('/');
    resetAll();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { resetAll, playerName, playerFinalsScore, playerGravatar } = this.props;
    const { ranking } = this.state;
    const obj = {
      playerName,
      playerFinalsScore,
      playerGravatar,
    };
    this.setState({ ranking: [...ranking, obj] }, () => {
      const { ranking: newRanking } = this.state;
      localStorage.setItem('playerRanking', JSON.stringify(newRanking));
    });

    this.setState({
      redirect: true,
    });
    resetAll();
  }

  render() {
    const { playerTotalAssertions, playerFinalsScore } = this.props;
    const ASSERTIONS_NUMBER = 3;
    const { redirect } = this.state;
    return (
      <div className="main-div-feedback">
        <div className="div-feedback">
          <Header />
          <div data-testid="feedback-text">
            {(playerTotalAssertions >= ASSERTIONS_NUMBER
              ? <h2>Well Done!</h2>
              : <h2>Could be better...</h2>)}
          </div>
          <div>
            <p data-testid="feedback-total-score">
              {playerFinalsScore}
            </p>
            <p data-testid="feedback-total-question">
              { playerTotalAssertions }
            </p>

          </div>

          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClickToLogin }
          >
            Play Again
          </button>

          <button
            data-testid="btn-ranking"
            type="submit"
            onClick={ this.handleSubmit }
          >
            Ranking
          </button>
          { redirect && <Redirect to="/ranking" /> }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetAll: () => (dispatch(resetScore())),
});

const mapStateToProps = (globalState) => ({
  playerTotalAssertions: globalState.player.assertions,
  playerFinalsScore: globalState.player.score,
  playerName: globalState.player.name,
  playerGravatar: globalState.player.gravatarEmail,
});

Feedback.propTypes = {
  playerTotalAssertions: PropTypes.number.isRequired,
  playerFinalsScore: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  resetAll: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
