import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchQuestions } from '../redux/actions';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <p>salve</p>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   questionAPI: () => dispatch(fetchQuestions()),
// });

// Game.propTypes = {
//   questionAPI: PropTypes.func.isRequired,
// };

// export default connect(null, mapDispatchToProps)(Feedback);
export default Feedback;
