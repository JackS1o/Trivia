import { QUESTIONS, USER_LOGIN, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return {
      ...state,
      api: action.api,
    };
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload.Username,
      gravatarEmail: action.payload.email,
    };
  case USER_TOKEN:
    return {
      ...state,
      APII: action.payload,
    };
  default:
    return state;
  }
};

export default player;
