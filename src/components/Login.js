import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Header, Dimmer, FormButton, FormDropdown, Grid, GridColumn, GridRow, HeaderContent, HeaderSubheader,Image, Loader, SegmentGroup, CardHeader, Form } from 'semantic-ui-react';
import { setAuthedUser} from '../actions/authedUser';


    class Login extends Component{
    state = {
        loading: false
        };
        handleLoading = () => {
        this.setState({ loading: true });
        };
    render(){
        return (
            <Fragment>
              <SegmentGroup>
                <Title />
                <TitleLayout image={<TitleImage/>} form={<ConneectedLogin onLoading={this.handleLoading}/>} loading={this.state.loading}/>
              </SegmentGroup>
            </Fragment>
          );
    }
}
export default Login

const Title = () => (
    <Header as="h4" block attached="top" textAlign="center">
        <HeaderContent>Welcome to the Would You Rather App!</HeaderContent>
        <HeaderSubheader>Please sign in to continue</HeaderSubheader>
    </Header>
    );
    const TitleLayout = ({ image, form, loading }) => (
        <div>
          <Grid padded textAlign="center">
            <Grid.Row className="login">
              <Grid.Column width={16}>
                {loading === true && (
                  <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                  </Dimmer>
                )}
                {image}
                <br />
                {form}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
      

    const TitleImage = () => (
        <Image src={process.env.PUBLIC_URL + '/images/avatar/1200px-React-icon.svg.png'} size="medium" centered />
      );

class LoginForm extends Component{
    state = {
        value: ''
      };
      onChange = (e, { value }) => {
        this.setState({ value });
      };
      handleSubmit = e => {
        e.preventDefault();
        const { onLoading, setAuthedUser } = this.props;
        const authUser = this.state.value;
    
        new Promise((res, req) => {
            onLoading();
            setTimeout(() => res(), 500);
        }).then(() => setAuthedUser(authUser));
        };
        generateDropdownData = () => {
        const { users } = this.props;
    
        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
        };
        render(){
            const { value } = this.state;
            const disabled = value === '' ? true : false;
            return(
                <Form onSubmit={this.handleSubmit}>
                    <Header as="h2" color="olive">
                        Sign IN
                    </Header>
                    <FormDropdown
                        placeholder="Select a User"
                        fluid
                        selection
                        scrolling
                        options={this.generateDropdownData()}
                        value={value}
                        onChange={this.onChange}
                        required
                    />
                    <FormButton content="Sign in" positive fluid disabled={disabled}/>

                </Form>
            );
        }
}

const ConneectedLogin = connect(mapStateToProps, {setAuthedUser})(LoginForm);

function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
  }