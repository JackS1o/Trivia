/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="ranking-title">test</h3>
      </div>

    );
  }
}
Ranking.propTypes = {

};

export default Ranking;
