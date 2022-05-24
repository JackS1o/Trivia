import React from 'react';

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

  handleSubmit = () => {
    // const { history } = this.props;
    // history.push('/carteira');
  }

  render() {
    const { Username, email, isDisable } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
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
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
