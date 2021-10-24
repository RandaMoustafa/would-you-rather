import { saveQuestion, saveQuestionsAnswer } from "../utils/api";
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { addQuestionToAuthedUser } from "./users";


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function saveQuestionAnswer(id, answer, authedUser) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    answer,
    authedUser
  };
}
export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToAuthedUser(question));
      }
    );
  };
}
function addAnswer({ qid, answer, authedUser }) {
	return {
		type: ADD_ANSWER,
		answerInfo: {
			qid,
			answer,
			authedUser
		}
	};
}
export function addQuestionAnswer(answer)
{
  return{
    type : ADD_QUESTION_ANSWER,
    answer
  }
}
export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}
export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestionsAnswer({
			qid,
			answer,
			authedUser
		})
			.then(() =>
				dispatch(
					addAnswer({
						qid,
						answer,
						authedUser
					})
				)
			)
			.then(() => dispatch(hideLoading()));
	};
}