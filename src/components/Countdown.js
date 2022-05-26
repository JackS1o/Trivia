import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../redux/actions';

let timerCounter;

class Countdown extends Component {
  constructor() {
    super();

    this.state = {
      secondsLeft: 10,
    };
  }

  componentDidMount() {
    const { secondsLeft } = this.state;
    if (secondsLeft > 0) {
      this.handleTimer();
    }
  }

  componentDidUpdate() {
    const { secondsLeft } = this.state;
    const { isDisable, setTimerTrue, trueTimer } = this.props;
    const SET_TIMER = 30;
    if (setTimerTrue === true) {
      this.resetTimer();
      trueTimer(false);
    }
    if (secondsLeft < 1 || isDisable === true) {
      console.log('teste');
      this.resetTimer();
      clearInterval(timerCounter);
    } else if (secondsLeft === SET_TIMER) {
      this.handleTimer();
    }
  }

  handleTimer = () => {
    const ONE_SECOND = 1000;
    timerCounter = setInterval(() => {
      this.setState((prevState) => ({
        secondsLeft: prevState.secondsLeft - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer = () => {
    console.log('agora vai');
    this.setState({ secondsLeft: 30 });
  }

  render() {
    const { secondsLeft } = this.state;
    return (
      <div>
        <span>{ secondsLeft }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setTimerTrue: state.player.timer,
});

const mapDispatchToProps = (dispatch) => ({
  trueTimer: (bool) => dispatch(setTimer(bool)),
});

Countdown.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  setTimerTrue: PropTypes.bool.isRequired,
  trueTimer: PropTypes.func.isRequired,
};

// quando a página montar, exibir o timer no estado inicial
// quando a página atualizar, diminuir 01 segundo da aplicação

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
