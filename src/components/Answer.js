import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import {Form , Button, FormCard} from 'tabler-react'
import './answer.css'
import { Result } from "./Result";
import { handleAddQuestion } from "../actions/question";

export class Answer extends Component{
    state = {
        selectedAnswer: '',
        option: "none",
        showAlert: false,
        optionOne: '',
		optionTwo: '',
		toHome: false
    }
    handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		e.preventDefault();

		this.setState(
			{
				optionOne: '',
				optionTwo: '',
				toHome: true
			},
			() => dispatch(handleAddQuestion(optionOne, optionTwo))
		);
	};
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return {selectedAnswer: answer}
        })
    }
    render(){
        const { question, author, answered, answer, votesOptionOne, votesOptionTwo, totalVotes, percentageOptionOne, percentageOptionTwo } = this.props;
        const { selectedAnswer } = this.state;
        const { optionOne, optionTwo, toHome } = this.state;
        console.log(this.state)

        console.log(this.props)
                return(
                    <div className={answered ? 'tile-item question-detail' : 'tile-item'}>
                    {answered ? (
                            <h2 className="tile-header">Asked by {author.name}</h2>
                        ) : (
                            <h3 className="tile-header">{author.name} asks</h3>
                        )}
                        <div className="tile-body">
                            <div className="tile-left">
                                <img   alt="avatar" className="avatar " src={`/${author.avatarURL}`}/>
                            </div>
                            
                            {!answered ? (
                                <div className="question-body">
                                    <h1 className="would-you">Would you rather</h1>
                                    <form onSubmit={(e) => {this.handleSubmit}}
                                    >
                                        <Form.Group control="optionOne">
                                        <Form.Label>Choice One</Form.Label>
                                        
                                    <Form.Switch
                                    label={question.optionOne.text}
                                    name="choice"
                                    type="radio"
                                    value="optionOne"
                                    className={selectedAnswer === 'optionOne' ? 'option option-selected' : 'option'}
                                    onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <Form.Switch
                                    label={question.optionTwo.text}
                                    name="choice"
                                    type="radio"
                                    value="optionTwo"
                                    onChange={this.handleInputChange}
                                    />
                                    </Form.Group>
                                    <br />
                                    <Button
                                    value="Submit Answer"
                                    type="submit"
                                    className="btn-primary btn-block"
        >
          Submit Answer
        </Button>
        </form>
      
                                </div>
                            ): (
                                
                                <div className="question-body">
                                    <Result/>
                                    
                                    <div className="would-you">Results: </div>
                                    <div className={answer === 'optionOne' ? 'option-container selected': 'option-container'}>
                                        <div className="option-one">{question.optionOne.text}</div>
        
                                        <div className="poll-container">
                                            <div>{votesOptionOne} out of {totalVotes} votes</div>
                                            <div>Percentage votes: {percentageOptionOne}%</div>
                                        </div>
                                        <div className="your-vote">Your pick</div>
                                    </div>
        
                                    <div className={answer === 'optionTwo' ? 'option-container selected': 'option-container'}>
                                        <div className="option-two">{question.optionTwo.text}</div>
        
                                        <div className="poll-container">
                                            <div>{votesOptionTwo} out of {totalVotes} votes</div>
                                            <div>Percentage votes: {percentageOptionTwo}%</div>
                                        </div>
                                        <div className="your-vote">Your pick</div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                )
            }
        }
        function mapStateToProps ({authedUser, users, questions}, { match }) {
            const { id } = match.params
            const question = questions[id]
            const author = question ? users[question.author] : null
            const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
            const votesOptionOne = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
            const votesOptionTwo = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
            const totalVotes = votesOptionOne + votesOptionTwo
            const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
            const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)
        
            const answer = users[authedUser].answers[id]
          
            return {
                id,
                authedUser,
                question,
                author,
                answered,
                answer,
                votesOptionOne,
                votesOptionTwo,
                totalVotes,
                percentageOptionOne,
                percentageOptionTwo,
                question: question ? question : null,
		        author: question ? users[question.author] : null
            }
        }
export default connect(mapStateToProps)(Answer);