import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { AiOutlineHome } from 'react-icons/ai';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userImage: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { playerHeaderEmail } = this.props;
    const emailHash = md5(playerHeaderEmail).toString();
    this.setState({
      userImage: emailHash,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { playerHeaderName, playerHeaderScore } = this.props;
    const { userImage, redirect } = this.state;
    return (
      <div className="div-header">
        <header>
          <img
            className="userImg"
            src={ `https://www.gravatar.com/avatar/${userImage}` }
            alt={ playerHeaderName }
            data-testid="header-profile-picture"
          />
          <h3 className="question" data-testid="header-player-name">
            { playerHeaderName }
          </h3>
          <p className="question" data-testid="header-score">
            { playerHeaderScore }
          </p>
        </header>
        <form>
          <button
            className="home-btn"
            data-testid="btn-go-home"
            id="btn-go-home"
            type="submit"
            onClick={ this.handleSubmit }
          >
            <AiOutlineHome />
            <br />
            Home
          </button>
          { redirect && <Redirect to="/" /> }

        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  playerHeaderName: globalState.player.name,
  playerHeaderScore: globalState.player.score,
  playerHeaderEmail: globalState.player.gravatarEmail,
});

Header.propTypes = {
  playerHeaderName: PropTypes.string.isRequired,
  playerHeaderScore: PropTypes.number.isRequired,
  playerHeaderEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
