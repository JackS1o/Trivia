import { USER_LOGIN, USER_SCORE, USER_TOKEN,
  TRUE_TIMER, VALUE_TIMER, USER_ASSERTIONS, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: false,
  valueTime: 0,
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
      score: action.payload,
    };
  case TRUE_TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  case VALUE_TIMER:
    return {
      ...state,
      valueTime: action.payload,
    };
  case USER_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case RESET_SCORE:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      timer: false,
      valueTime: 0,
    };
  default:
    return state;
  }
};

export default player;
