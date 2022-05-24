export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const QUESTIONS = 'QUESTIONS';

export const APIQuestions = (api) => ({
  type: QUESTIONS,
  api,
});

export function fetchApi() {
  return async (dispatch) => {
    const url = 'https://opentdb.com/api.php?amount=5';
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    return dispatch(APIQuestions(results));
  };
}

export const startPlay = (start) => ({
  type: USER_LOGIN,
  payload: start,
});

export const setToken = (token) => ({
  type: USER_TOKEN,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
    const questionList = await fetch(`https://opentdb.com/api.php?amount=5&token=${result.token}`);
    dispatch(setToken(questionList));
  } catch (error) {
    // console.log(error)
  }
};
