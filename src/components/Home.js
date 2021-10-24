import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Grid, Page , Text, Card } from "tabler-react";
import {Button} from 'react-bootstrap'
import {formatDate} from '../utils/helpers'

const RESULTS = "results";
const POLL = "poll";
const UNANSWERED = "unanswered";
const ANSWERED = "answered";

class Home extends Component{
    state = {
        questionList: UNANSWERED
            };
    
        changeQuestionList = e => {
        if (!e.target.textContent.toLowerCase().includes(UNANSWERED)) {
            this.setState({ questionList: ANSWERED });
        } else {
            this.setState({ questionList: UNANSWERED });
        }
        };
        render(){
            const { questions, users, authedUser, answered, unanswered } = this.props;
            return(
                <Page.Content>
                    <Grid.Row>
                        <Grid.Col lg={6}>
                            <Button  className="text-dark  btn-primary btn-block mb-4"
                aria-selected={
                    this.state.questionList === UNANSWERED ? "true" : "false"
                }
                onClick={this.changeQuestionList}>
                                                Unanswered Questions
                            </Button>
                        </Grid.Col>
                        <Grid.Col lg={6}>
                            <Button className=" text-dark btn-success btn-block mb-4"
                aria-selected={
                    this.state.questionList === ANSWERED ? "true" : "false"
                }
                onClick={this.changeQuestionList}>
                    Answered Questions
                            </Button>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                    {(this.state.questionList === UNANSWERED
              ? unanswered
              : answered
            ).map(answer => (
                        <Grid.Col key={questions[answer].id}
                xs={12}
                sm={12}
                md={12}
                lg={12}>
                    
                    <Card className="card card-profile mt-2">
                        <div className="card-header bg-light text-center">
                            <Text className="h3  mx-auto mb-5">
                            {users[questions[answer].author].name}
                            </Text>
                        </div>
                        <Card.Body  className="card-body text-center">
                            <img alt="" className="card-profile-img"src={users[questions[answer].author].avatarURL}/>
                            <h3 className="mb-3 text-left">Would you rather...</h3>
                            <p className="mb-4 h5 text-center">
                            ...{questions[answer].optionOne.text}...
                            <br />
                            </p>
                    <p className="mb-4 text-center">
                        <span className="bg-dark text-white text-center p-2 mt-5">
                        OR
                        </span>
                    </p>
                    <div className="d-flex align-items-center pt-5 mt-auto">
                      <div className="text-left">
                        <a href="./profile.html" className="text-default">
                          {users[questions[answer].author].name}
                        </a>{" "}
                        asked
                        <small className="d-block text-muted">
                          {formatDate(questions[answer].timestamp)}
                        </small>
                      </div>
                      </div>
                      <div className="ml-auto text-muted">
                        <Link
                          to={{
                            pathname: `/question/${questions[answer].id}`,
                            state: {
                              type:
                                this.state.questionList === UNANSWERED
                                  ? POLL
                                  : RESULTS
                            }
                          }}
                        >
                          <Button className="text-dark" color="primary" size="md">
                            view Poll
                          </Button>
                        </Link>
                      </div>
                        </Card.Body>

                    </Card>
                    

                        </Grid.Col>
            ))}
                    </Grid.Row>

                </Page.Content>
            )

            

        }
}
function mapStateToProps({ authedUser, users, questions }) {
    let answered, unanswered;
    const sort = (a, b) => {
      return (
        new Date(questions[b].timestamp).getTime() -
        new Date(questions[a].timestamp).getTime()
      );
    };
    if (authedUser) {
      answered = Object.keys(users[authedUser].answers).sort(sort);
      unanswered = Object.keys(Object.assign({}, questions)).sort(sort);
      answered.map(
        answer =>
          (unanswered = unanswered.filter(unanswered => answer !== unanswered))
      );
    }
    return {
      authedUser,
      users,
      questions,
      answered,
      unanswered
    };
  }

  export default withRouter(connect(mapStateToProps)(Home));