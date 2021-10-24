import { RECEIVE_USERS , SAVE_QUESTION_ANSWER_TO_AUTHED_USER,ADD_QUESTION_TO_AUTHED_USER } from '../actions/users'

function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_QUESTION_TO_AUTHED_USER:
      const { authedUser, id } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat(id)
        }
      };
    case SAVE_QUESTION_ANSWER_TO_AUTHED_USER:
      const { answer } = action;
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.id]: answer
          }
        }
      };
    default:
      return state;
  }
}

export default users;