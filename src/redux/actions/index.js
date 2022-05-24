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
