import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Table , Card , Badge , Text ,Avatar } from "tabler-react";
import './leader.css'

class LeaderBoard extends Component{
    render(){
        const {users} = this.props
        console.log(this.props)
        return(
           
            <Card className="card">
                <Card.Header>
                    <Card.Title>
                        LeaderBoard
                    </Card.Title>
                </Card.Header>
                <Table  cards={true}
                        striped={true}
                        responsive={true}
                        className="table-vcenter">
                            <Table.Header>
                                <Table.Row>
                                <Table.ColHeader alignContent="center">Score</Table.ColHeader>
                                <Table.ColHeader colSpan={2}>User</Table.ColHeader>
                                <Table.ColHeader alignContent="center">
                                Answered Questions
                                </Table.ColHeader>
                                <Table.ColHeader alignContent="center">
                                Created Questions
                                </Table.ColHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map(user=>(
                                    <Table.Row key={user.id}>
                                        <Table.Col alignContent="center">
                                            <Badge color="warning">
                                            <Text className="h4 my-0 mx-1">{user.score}</Text>
                                            </Badge>
                                        </Table.Col>
                                        <Table.Col className="w-1">
                  <img className="leader-img"  src={user.avatarURL} />
                </Table.Col>
                <Table.Col>{user.name}</Table.Col>
                <Table.Col alignContent="center">
                  {Object.keys(user.answers).length}
                </Table.Col>
                <Table.Col alignContent="center">
                  {user.questions.length}
                </Table.Col>
                                        </Table.Row>
                                ))}
                            </Table.Body>
                </Table>
            </Card>
        )

    }
}
function mapStateToProps({ users, authedUser }) {
    let userObj = Object.assign({}, users);
    Object.values(users).map(
      user =>
        (userObj[user.id]["score"] =
          Object.keys(user.answers).length + user.questions.length)
    );
    return {
      users: Object.values(userObj).sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else if (a.score > b.score) {
          return -1;
        } else {
          return 0;
        }
      }),
      authedUser
    };
  }

export default connect(mapStateToProps)(LeaderBoard);