import React, { Component } from 'react'
import { connect } from 'react-redux'


import { NavLink } from 'react-router-dom'
import { Image, Menu } from 'semantic-ui-react';
import { logOut } from '../actions/authedUser';


class  Nav extends Component {
  handleLogout = (e, { name }) =>{
    const {history} = useHistory();
    e.preventDefault()
    if(name==='logOut'){
        this.props.dispatch(logOut())
        history.push('/login')
    }
}
 
  render(){
   
    const {authedUser,users} = this.props
        const user = users[authedUser]
        return (
          <div>
            <div className='nav-desktop'>
                <Menu stackable pointing secondary>
                    <Menu.Item as={NavLink} name='home' exact to='/' color='red' >
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} name='newQuestion' exact to='/add' color='teal'>
                        New Question
                    </Menu.Item>
                    <Menu.Item as={NavLink} name='leaderBoard' exact to='/leaderboard' color='teal'>
                        Leader Board
                    </Menu.Item>
                    {authedUser ?
                    <Menu.Menu position='right'>
                        <Menu.Item name='username' >
                            Hello, {user.name}
                        </Menu.Item>
                        <Image style={{marginTop:'0.35em'}} avatar src={user!== 'undefined' ? user.avatarURL : logo}/>
                        <Menu.Item as={NavLink} name='logOut' exact to='/login' color='teal' onClick={this.handleLogout}>
                            Log Out
                        </Menu.Item>
                   </Menu.Menu>: <div></div>}
                </Menu>
            </div>
            </div>
        )
  }
 

}

function mapStateToProps ({authedUser,users}) {
  return {
      authedUser,
      users
  }
}
  export default connect(mapStateToProps)(Nav)
