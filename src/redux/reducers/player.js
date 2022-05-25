import { USER_LOGIN, USER_SCORE, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload.Username,
      gravatarEmail: action.payload.email,
    };
  case USER_TOKEN:
    return {
      ...state,
      API: action.payload,
    };
  case USER_SCORE:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
