import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TriviaQuestions extends React.Component {
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
    console.log(apiData);
    return (
      <section>
        { apiData
        && (
          <div>
            <h4
              data-testid="question-category"
            >
              {apiData[counter].category}

            </h4>
            <p data-testid="question-text">{apiData[counter].question}</p>
            <div data-testid="answer-options">
              {/* {apiData.map((question, index) => (
                <button
                  key={ index }
                  onClick={ this.answerClick }
                  type="button"
                  // data-testid="correct-answer"
                  data-testid={ question}
                >
                  {question[counter].correct_answer}
                </button>
              ))} */}
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
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.player.API,
});

TriviaQuestions.propTypes = {
  apiData: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(TriviaQuestions);
