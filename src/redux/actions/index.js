export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_SCORE = 'USER_SCORE';
export const USER_ASSERTIONS = 'USER_ASSERTIONS';
export const ERROR_TOKEN = 'ERROR_TOKEN';
export const TRUE_TIMER = 'TRUE_TIMER';
export const VALUE_TIMER = 'VALUE_TIMER';
export const RESET_SCORE = 'RESET_SCORE';

export const startPlay = (start) => ({
  type: USER_LOGIN,
  payload: start,
});

export const setAPI = (token) => ({
  type: USER_TOKEN,
  payload: token,
});

export const setScore = (score) => ({
  type: USER_SCORE,
  payload: score,
});
export const setAssertions = (assertions) => ({
  type: USER_ASSERTIONS,
  payload: assertions,
});
export const setTimer = (bool) => ({
  type: TRUE_TIMER,
  payload: bool,
});

export const quantifyTimer = (time) => ({
  type: VALUE_TIMER,
  payload: time,
});

export const resetScore = (reset) => ({
  type: RESET_SCORE,
  reset,
});

export const fetchToken = () => async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
  } catch (error) {
    // console.log(error)
  }
};

export const fetchQuestions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const result2 = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionList = await result2.json();
    const { results } = questionList;
    dispatch(setAPI(results));
  } catch (error) {
    // console.log(error)
  }
};
