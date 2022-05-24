import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userImage: '',
    };
  }

  componentDidMount() {
    const { playerHeaderEmail } = this.props;
    const emailHash = md5(playerHeaderEmail).toString();
    this.setState({
      userImage: emailHash,
    });
  }

  render() {
    const { playerHeaderName, playerHeaderScore } = this.props;
    const { userImage } = this.state;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${userImage}` }
            alt={ playerHeaderName }
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">
            { playerHeaderName }
          </h3>
          <p data-testid="header-score">
            { playerHeaderScore }
          </p>
        </header>
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
  playerHeaderScore: PropTypes.string.isRequired,
  playerHeaderEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
