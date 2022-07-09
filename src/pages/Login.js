import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, startPlay } from '../redux/actions';
import style from './Login.module.css';
import TriviaLogo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      Username: '',
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, Username } = this.state;
      const VALIDADE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      this.setState({
        isDisable: !(VALIDADE_EMAIL
          .test(email) && Username.length > 0),
      });
    });
  };

  handleSubmit = async () => {
    const { history, userLogin, tokenAPI } = this.props;
    const { email, Username } = this.state;
    const info = {
      email,
      Username,
    };
    userLogin(info);
    await tokenAPI();
    history.push('/play');
  }

  handleConfig = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  }

  render() {
    const { Username, email, isDisable } = this.state;
    return (
      <div className={ style.Login_container }>

        <div className={ style.Form_container }>
          <img src={ TriviaLogo } alt="Logo" className={ style.Trivia_logo } />
          <form className={ style.form }>
            <label htmlFor="email">
              Email:
              <input
                data-testid="input-gravatar-email"
                id="email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                className={ style.input }
              />
            </label>
            <label htmlFor="Username">
              Nome:
              <input
                data-testid="input-player-name"
                id="Username"
                type="text"
                name="Username"
                value={ Username }
                onChange={ this.handleChange }
                className={ style.input }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisable }
              onClick={ this.handleSubmit }
              className={ style.Login_btn }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleConfig }
              className={ style.Login_btn }
            >
              Configurações
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (info) => dispatch(startPlay(info)),
  tokenAPI: () => dispatch(fetchToken()),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  tokenAPI: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
