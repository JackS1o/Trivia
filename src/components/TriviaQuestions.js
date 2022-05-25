import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setScore } from '../redux/actions';
import './TriviaQuestions.css';

class TriviaQuestions extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      answers: [],
      category: '',
      question: '',
      correct: '',
      redirect: false,
      score: 0,
      color: 'null',
      errorColor: 'null',
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const fetchQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseQuestions = await fetchQuestion.json();
    const LAST_QUESTION = 5;
    const { counter } = this.state;
    if (Number(counter) === Number(LAST_QUESTION)) {
      this.setState({ redirect: true });
    }
    this.setState({ color: 'null', errorColor: 'null' });
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = responseQuestions.results[counter];

    this.setState({
      category,
      question,
      correct: correctAnswer,
      answers: [...incorrectAnswers, correctAnswer] });
  }

  answerClick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }),
      () => this.componentDidMount());
  }

  handleScore = () => {
    this.setState((prev) => ({ score: prev.score + 1 }));
    const { score } = this.state;
    this.setState({ color: 'assert', errorColor: 'error' });
    const { asserts } = this.props;
    asserts(score);
  }

  handleError= () => {
    this.setState({ errorColor: 'error', color: 'assert' });
  }

  render() {
    const { apiData } = this.props;
    const { category, question, answers, correct, redirect, color,
      errorColor } = this.state;
    const RANDOMIZE_NUMBER = 0.5;
    return (
      <section>
        { apiData
        && (
          <div>
            <h4
              data-testid="question-category"
            >
              {category}

            </h4>
            <p data-testid="question-text">{question}</p>
            <div data-testid="answer-options" className="margin">
              {answers.map((item, index) => (
                <button
                  type="button"
                  key={ index }
                  onClick={ this.handleScore }
                  className={ correct === item ? color : errorColor }
                  data-testid={
                    correct === item ? 'correct-answer' : `wrong-answer-${index}`
                  }
                >
                  { item }
                </button>
              )).sort(() => Math.random() - RANDOMIZE_NUMBER)}
            </div>
            <button
              type="button"
              onClick={ this.answerClick }
              data-testid="btn-next"
            >
              Next
            </button>
            { redirect && <Redirect to="/feedback" /> }
          </div>)}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.player.API,
});

const mapDispatchToProps = (dispatch) => ({
  asserts: (asserts) => dispatch(setScore(asserts)),
});

TriviaQuestions.propTypes = {
  apiData: PropTypes.arrayOf(Object).isRequired,
  asserts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);
