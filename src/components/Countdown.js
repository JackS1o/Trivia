import React, { Component } from 'react';
import PropTypes from 'prop-types';

let timerCounter;

class Countdown extends Component {
  constructor() {
    super();

    this.state = {
      secondsLeft: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;

    timerCounter = setInterval(() => {
      this.setState((prevState) => ({
        secondsLeft: prevState.secondsLeft - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { secondsLeft } = this.state;
    const { isDisable } = this.props;
    if (secondsLeft === 0 || isDisable === true) {
      clearInterval(timerCounter);
    }
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

Countdown.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};

// quando a página montar, exibir o timer no estado inicial
// quando a página atualizar, diminuir 01 segundo da aplicação

export default Countdown;
