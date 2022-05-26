import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  handleClickToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { playerTotalAssertions, playerFinalsScore } = this.props;
    const ASSERTIONS_NUMBER = 3;
    const { redirect } = this.state;
    return (
      <div>
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
    );
  }
}

const mapStateToProps = (globalState) => ({
  playerTotalAssertions: globalState.player.assertions,
  playerFinalsScore: globalState.player.score,
});

Feedback.propTypes = {
  playerTotalAssertions: PropTypes.number.isRequired,
  playerFinalsScore: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
