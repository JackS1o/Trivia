import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { playerTotalAssertions, playerFinalsScore } = this.props;
    const ASSERTIONS_NUMBER = 3;
    return (
      <div>
        <div data-testid="feedback-text">
          {(playerTotalAssertions < ASSERTIONS_NUMBER
            ? <h2>Could be better...</h2>
            : <h2>Well Done!</h2>)}
        </div>
        <div>
          <p data-testid="feedback-total-score">
            {playerFinalsScore}
          </p>
          <p data-testid="feedback-total-question">
            {playerTotalAssertions}
          </p>
        </div>
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
};

export default connect(mapStateToProps)(Feedback);
