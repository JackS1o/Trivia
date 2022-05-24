import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  answerClick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  }

  render() {
    const { apiData } = this.props;
    const { counter } = this.state;
    if (apiData) {
      console.log(apiData);
    }
    return (
      <div>
        <div>
          <Header />
          { apiData
        && (
          <div>
            <h4>{apiData[counter].category}</h4>
            <p data-testid="question-text">{apiData[counter].question}</p>
            <div>
              <button
                onClick={ this.answerClick }
                type="button"
                data-testid="correct-answer"
              >
                {apiData[counter].correct_answer}
              </button>
              <button
                onClick={ this.answerClick }
                type="button"
                data-testid={ `wrong-answer-${0}` }
              >
                {apiData[counter].incorrect_answers[0]}
              </button>
              <button
                onClick={ this.answerClick }
                type="button"
                data-testid={ `wrong-answer-${1}` }
              >
                {apiData[counter].incorrect_answers[1]}
              </button>
              <button
                onClick={ this.answerClick }
                type="button"
                data-testid={ `wrong-answer-${2}` }
              >
                {apiData[counter].incorrect_answers[2]}
              </button>
            </div>
          </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.player.APII,
});

Game.propTypes = {
  apiData: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Game);
