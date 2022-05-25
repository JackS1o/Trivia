export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';

export const startPlay = (start) => ({
  type: USER_LOGIN,
  payload: start,
});

export const setToken = (token) => ({
  type: USER_TOKEN,
  payload: token,
});
export const errorToken = () => ({
  type: ERROR_TOKEN,
  payload: '/',
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    // console.log(result);
    // const error = 'token';
    localStorage.setItem('token', result.token);
    const result2 = await fetch(`https://opentdb.com/api.php?amount=5&token=${result.token}`);
    const questionList = await result2.json();
    const { results } = questionList;
    // if (results.length === 0) {
    //   dispatch(errorToken());
    // }
    dispatch(setToken(results));
  } catch (error) {
    // console.log(error)
  }
};
