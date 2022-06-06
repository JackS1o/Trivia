import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions } from '../redux/actions';
import Header from '../components/Header';
import TriviaQuestions from '../components/TriviaQuestions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      redirect: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const result2 = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await result2.json();
    const { response_code: code } = await response;
    const VALUE_RESPONSE = 3;
    if (code === VALUE_RESPONSE) {
      localStorage.setItem('token', '');
      this.setState({ redirect: true });
    } else {
      const { questionAPI } = this.props;
      questionAPI();
    }
  }

  answerClick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  }

  render() {
    const { redirect } = this.state;
    return (
      <div className="main-div">
        <div className="game">
          <Header />
          { redirect ? <Redirect to="/" />
            : (<TriviaQuestions />)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionAPI: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  questionAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
