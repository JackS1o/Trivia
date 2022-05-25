import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    console.log(response);
    if (code === VALUE_RESPONSE) {
      // const { history } = this.props;
      localStorage.setItem('token', '');
      // <Redirect to="/" />;
      this.setState({ redirect: true });
    }
  }

  answerClick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  }

  render() {
    // const { apiData } = this.props;
    const { redirect } = this.state;
    return (
      <div>
        <div>
          <Header />
          { redirect ? <Redirect to="/" />
            : (<TriviaQuestions />)}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   apiData: state.player.API,
// });

// Game.propTypes = {
//   apiData: PropTypes.arrayOf(Object).isRequired,
//   // history: PropTypes.shape().isRequired,
// };

// export default connect(mapStateToProps)(Game);
export default Game;
