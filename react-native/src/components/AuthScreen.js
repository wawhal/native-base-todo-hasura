import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Left, Body, Text, Form, Item, Label, Input, Right, Spinner} from 'native-base';
import { View, Alert } from 'react-native';
import { tryAuth, fetchTodos } from '../hasuraApi';
import { storeSession } from '../action';

class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
	  	usernameTextBox : 'rishichandra',
	  	passwordTextBox : 'rishichandra'
	  }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  handleLoginPressed = async () => {
    var resp = await tryAuth(this.state.usernameTextBox, this.state.passwordTextBox, "login");
    if (resp.status !== 200){
      if (resp.status === 503){
        Alert.alert("Network Error", "Please check your internet connection");
      } else {
        Alert.alert("Unauthorized", "Invalid Credentials");
      }
    } else {
      var respBody = await resp.json();
      console.log(respBody);
      var session = {
        token: respBody.auth_token,
        userId: respBody.hasura_id
      }
      await storeSession(session);
      this.props.dispatch({type:'SET_SESSION', session});
    }
  }

  handleSignupPressed = async () => {
    var resp = await tryAuth(this.state.usernameTextBox, this.state.passwordTextBox, "signup");
    if (resp.status !== 200){
      if (resp.status === 503){
        Alert.alert("Network Error", "Please check your internet connection");
      } else {
        Alert.alert("Error", "Password too short/User already exists");
      }
    } else {
      var respBody = resp.json();
      var session = {
        token: respBody.auth_token,
        userId: respBody.hasura_id
      }
      await storeSession(session);
      this.props.dispatch({type:'SET_SESSION', session});
    }
  }

  handleUsernameChange = (usernameTextBox) => {
  	this.setState({
  		...this.state,
  		usernameTextBox: usernameTextBox
  	})
  }

  handlePasswordChange = (passwordTextBox) => {
  	this.setState({
  		...this.state,
  		passwordTextBox: passwordTextBox
  	})
  }

  render() {
    return(
      <Container>
        <Header>
          <Left />
          <Body>
            <Title> Login </Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{justifyContent:'center', margin: 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input value={this.state.usernameTextBox} onChangeText={this.handleUsernameChange}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input value={this.state.passwordTextbox} onChangeText={this.handlePasswordChange} secureTextEntry/>
            </Item>
          </Form>
          <View style = {{height:10}} />
          <Button block onPress={this.handleSignupPressed} >
            <Text> Sign up </Text>
          </Button>
          <View style = {{height:10}} />
          <Button block title="Log in" onPress={this.handleLoginPressed} >
            <Text> Log in </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(AuthScreen);
