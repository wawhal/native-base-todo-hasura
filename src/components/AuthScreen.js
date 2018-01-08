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
	  	usernameTextBox : '',
	  	passwordTextBox : ''
	  }
  }

  handleLoginPressed = () => {
    tryAuth(this.state.usernameTextBox, this.state.passwordTextBox, "login")
    .then((resp) => {
      return resp.json();
    })
    .then((sess) => {
      console.log(JSON.stringify(sess))
    })
  }

  handleSignupPressed = () => {
    const sess = () => {
      tryAuth(this.state.usernameTextBox, this.state.passwordTextBox, "signup")
      .then((session) => {
        return session;
        console.log("==============");
        console.log(session);
        console.log("==============");
      })
    }
    console.log(sess());
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
