import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Page , Text , Card ,Button } from "tabler-react"; 
import { Answer } from "./Answer";
import { Result } from "./Result";
import {formatDate} from "../utils/helpers"



class Question extends Component{
    
    render(){
        const { question, authedUser,users } = this.props;
        const questionAnswered = Object.keys(users[authedUser].answers).includes(
            question.id
          );
        console.log(users[question.author].avatarURL)
        return(
            
                <Page.Content>
          <Card className="card card-profile">
            <div className="card-header bg-dark text-center">
              <Text className="h3 text-white mx-auto mb-5">
              {users[question.author].name}
              </Text>
            </div>
            <Card.Body className="card-body text-center">
              
              {questionAnswered ? (
                <Result
                  question={question}
                  author={users[question.author]}
                  authedUser={authedUser}
                />
              ) : (
                <Answer
                  question={question}
                  author={users[question.author]}
                />
              )}
              <div className="d-flex align-items-center pt-5 mt-auto">
                <div className="text-left">
                  <a href="./profile.html" className="text-default">
                    {users[question.author].name}
                  </a>{" "}
                  asked
                  <small className="d-block text-muted">
                    {formatDate(question.timestamp)}
                  </small>
                </div>

                {questionAnswered && (
                  <div className="ml-auto text-muted">
                    <Link to={"/"}>
                      <Button
                        color="primary"
                        size="md"
                        icon="arrow-left-circle"
                        outline
                      >
                        Return to Homepage
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card.Body>
            
            </Card>
            </Page.Content>
        )
    }
}
const mapStateToProps = ({ authedUser, users, questions }, props) => ({
    authedUser,
    users,
    question: questions[props.match.params.id]
  });

export default connect(mapStateToProps)(Question);