import {saveQuestionAnswer} from "../actions/question";
import {saveQuestionsAnswer} from "../utils/api"


export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_AUTHED_USER = 'ADD_QUESTION_TO_AUTHED_USER';
export const SAVE_QUESTION_ANSWER_TO_AUTHED_USER = 'SAVE_QUESTION_ANSWER_TO_AUTHED_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestionToAuthedUser(authedUser, id) {
  return {
    type: ADD_QUESTION_TO_AUTHED_USER,
    authedUser,
    id
  };
}

export function saveQuestionAnswerToAuthedUser(authedUser, id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER_TO_AUTHED_USER,
    authedUser,
    id,
    answer
  };
}
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

function addAnswerToUser(authedUser, id, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    id,
    answer
  };
}
export function handleSaveQuestionAnswer(authedUser, id, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authedUser, id, answer));
    dispatch(saveQuestionAnswer(authedUser, id, answer));

    return saveQuestionsAnswer(authedUser, id, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}
export default handleSaveQuestionAnswer;

