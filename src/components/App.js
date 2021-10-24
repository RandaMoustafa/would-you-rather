import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Login from './Login'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Switch } from 'react-router'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import New from './New';
import Question from './Question'


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <div className="App">
          {authedUser === null ?(
            <Route render={
              ()=>(
                <Content>
                  <Login/>
                  
                  </Content>
              )
            }/>
          ):(
        
        <Fragment>
          
          <div className='container'>
            <Nav />
            <Content>
              <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/' exact component={Home} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
              <Route path='/question/:id' exact component={Question}/>
              <Route path='/add' exact component={New}/>

              </Switch>
            </Content>
            {/* {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>} */}
          </div>
        </Fragment>
          )}
        </div>
      </Router>
    )
  }
}
const Content = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <GridRow>
      <GridColumn style={{ maxWidth: 550 }}>{children}</GridColumn>
    </GridRow>
  </Grid>
);

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps,{handleInitialData})(App);

