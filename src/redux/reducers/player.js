import { QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return {
      ...state,
      api: action.api,
    };
  default:
    return state;
  }
};

export default player;
