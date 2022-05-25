/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends React.Component {
    handleSubmit = (event) => {
      const { history } = this.props;
      event.preventDefault();
      history.push('/');
    }

    render() {
      return (
        <div>
          <Header />
          <form>
            <button
              data-testid="btn-go-home"
              id="btn-go-home"
              type="submit"
              onClick={ this.handleSubmit }
            >
              Home
            </button>

          </form>
        </div>

      );
    }
}
Ranking.propTypes = {
  history: PropTypes.isRequired,
};

export default Ranking;
