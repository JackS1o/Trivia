import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setScore, setTimer, setAssertions } from '../redux/actions';
import Countdown from './Countdown';
import './TriviaQuestions.css';

class TriviaQuestions extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      answers: [],
      next: 0,
      category: '',
      question: '',
      correct: '',
      redirect: false,
      score: 0,
      color: 'null',
      errorColor: 'null',
      isDisabled: false,
      difficulty: '',
      assertions: 0,
      api: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const fetchQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseQuestions = await fetchQuestion.json();
    this.setState({ api: responseQuestions });
    const SECONDS_COUNTDOWN = 31000;
    this.updateQuestions();
    setTimeout(() => this.handleError(), SECONDS_COUNTDOWN); // https://felixgerschau.com/react-hooks-settimeout/
  }

  updateQuestions = () => {
    const { counter, api } = this.state;
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = api.results[counter];
    this.setState({
      category,
      question,
      correct: correctAnswer,
      difficulty,
      answers: [...incorrectAnswers, correctAnswer] });
  }

  answerClick = () => {
    const { trueTimer } = this.props;
    trueTimer(true);
    const { counter } = this.state;
    const LAST_QUESTION = 4;
    if (counter >= LAST_QUESTION) {
      this.setState({ redirect: true });
    }
    this.setState((prev) => ({ counter: prev.counter + 1, isDisabled: false }), () => {
      if (counter < LAST_QUESTION) {
        this.updateQuestions();
      }
    });

    this.setState({ color: 'null', errorColor: 'null' });
  }

  handleScore = () => {
    const { setScoreValue, valueTimer, setAssertionsValue } = this.props;
    // console.log(valueTimer);
    const VALUE_TEN = 10;
    const { score } = this.state;
    let VALUE_SCORE = 0;
    this.setState((prev) => ({ assertions: prev.assertions + 1 }), () => {
      const { assertions } = this.state;
      setAssertionsValue(assertions);
    });
    const { difficulty } = this.state;
    if (difficulty === 'easy') {
      VALUE_SCORE = Number(score + VALUE_TEN + (valueTimer * 1));
      this.setState(() => ({ score: VALUE_SCORE }));
    }
    if (difficulty === 'medium') {
      VALUE_SCORE = Number(score + VALUE_TEN + (valueTimer * 2));
      this.setState(() => ({ score: VALUE_SCORE }));
    }
    if (difficulty === 'hard') {
      VALUE_SCORE = Number(score + VALUE_TEN + (valueTimer * (1 + 1 + 1)));
      this.setState(() => ({ score: VALUE_SCORE }));
    }
    setScoreValue(VALUE_SCORE);
    this.setState({ color: 'assert', errorColor: 'error', isDisabled: true, next: 1 });
  }

  handleError= () => {
    this.setState({ errorColor: 'error', color: 'assert', isDisabled: true, next: 1 });
  }

  render() {
    const { apiData } = this.props;
    const { category, question, answers, correct, redirect, color,
      errorColor, isDisabled, next } = this.state;
    const RANDOMIZE_NUMBER = 0.5;
    return (
      <section className="section-game">
        { apiData
        && (
          <div className="div-trivia">
            <h3
              className="category"
              data-testid="question-category"
            >
              {category}

            </h3>
            { isDisabled === false && <Countdown isDisabled={ isDisabled } /> }
            <p className="question" data-testid="question-text">{question}</p>
            <div
              className="options divload"
              data-testid="answer-options"
            >
              {answers.map((item, index) => (
                <button
                  style={
                    { width: 200,
                      height: 30,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      marginBottom: 5,
                      fontWeight: 700 }
                  }
                  type="button"
                  disabled={ isDisabled }
                  key={ index }
                  onClick={ correct === item ? this.handleScore : this.handleError }
                  className={ correct === item ? color : errorColor }
                  data-testid={
                    correct === item ? 'correct-answer' : `wrong-answer-${index}`
                  }
                >
                  { item }
                </button>
              )).sort(() => Math.random() - RANDOMIZE_NUMBER)}
            </div>
            { next !== 0 && (
              <button
                className="next-btn"
                type="button"
                onClick={ this.answerClick }
                data-testid="btn-next"
              >
                Next
              </button>
            )}
            { redirect && <Redirect to="/feedback" /> }
          </div>)}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.player.API,
  valueTimer: state.player.valueTime,
  playerName: state.player.name,
  playerScore: state.player.score,
  playerGravatar: state.player.gravatarEmail,

});

const mapDispatchToProps = (dispatch) => ({
  setScoreValue: (score) => dispatch(setScore(score)),
  setAssertionsValue: (assertions) => dispatch(setAssertions(assertions)),
  trueTimer: (bool) => dispatch(setTimer(bool)),
});

TriviaQuestions.propTypes = {
  apiData: PropTypes.arrayOf(Object).isRequired,
  setScoreValue: PropTypes.func.isRequired,
  setAssertionsValue: PropTypes.func.isRequired,
  trueTimer: PropTypes.func.isRequired,
  valueTimer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);
