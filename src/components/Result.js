import React, { Component } from "react";
import { connect } from "react-redux";
import { Progress, Text } from "tabler-react";

 export class Result extends Component{
    render(){
        const { authedUser, question } = this.props;

        const { optionOne, optionTwo } = question;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const selected = optionOne.votes.includes(authedUser);
        return(
            <div className="question-results text-left">
                <div className={`question-result.mb-4 ${selected}`}>
                    <div className="clear">
                        <div className="float-left">
                            <strong>{((optionOne.votes.length / totalVotes) * 100).toFixed(0)}%</strong>
                        </div>
                        <div className="float-right">
                            <Text.Small muted>
                            {optionOne.votes.length} out of {totalVotes} votes
                            </Text.Small>
                        </div>
                    </div>
                    <Progress sizes="md">
                        <Progress.Bar color="yellow"
                         width={((optionOne.votes.length / totalVotes) * 100).toFixed(0)}/>

                    </Progress>
                    <h4>{optionOne.text}</h4>
                </div>
                <div className={`question-results mb-4 ${!selected}`}>
                    <div className="clear">
                        <div className="float-left">
                            <strong>{((optionTwo.votes.length / totalVotes) * 100).toFixed(0)}%</strong>
                        </div>
                        <div className="float-right">
                            <Text.small muted>
                            {optionTwo.votes.length} out of {totalVotes} votes
                            </Text.small>
                        </div>
                    </div>
                    <Progress sizes="md">
                        <Progress.Bar color="yellow"
              width={((optionTwo.votes.length / totalVotes) * 100).toFixed(0)}/>
                    </Progress>
                    <h4>{optionTwo.text}</h4>
                </div>

            </div>
        )
    }
}
export default connect(Result);