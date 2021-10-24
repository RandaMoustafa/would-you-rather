import { getInitialData, saveQuestionsAnswer } from '../utils/api'
import { addQuestionToAuthedUser, receiveUsers, saveQuestionAnswerToAuthedUser } from '../actions/users'
import {addQuestion, receiveQuestions} from '../actions/question'
import { hideLoading, showLoading } from 'react-redux-loading'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'


export function handleInitialData() {
  return async (dispatch) => {
      dispatch(showLoading())
      const { users, questions } = await getInitialData()
    dispatch(receiveUsers(users))
    dispatch(receiveQuestions(questions))
    dispatch(hideLoading())
  }
}



export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToAuthedUser(authedUser, question.id));
    });
  };
}

export function handleSaveQuestionAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid: id,
      answer
    })
      .then(dispatch(saveQuestionsAnswer(id, answer, authedUser)))
      .then(dispatch(saveQuestionAnswerToAuthedUser(authedUser, id, answer)));
  };
}