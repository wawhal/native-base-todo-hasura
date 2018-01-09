import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {AsyncStorage, Alert} from 'react-native';
import {Text } from 'native-base';
import { fetchSession } from '../action';
import { fetchTodos } from '../hasuraApi';
import AuthScreen from './AuthScreen';
import Todo from './Todo';

export class Index extends React.Component {
  async componentDidMount() {
    try {
      var sessionJson = await AsyncStorage.getItem("@Todo:session")
      var session = await JSON.parse(sessionJson)
      if (session !== null){
        console.log("Found Session")
        console.log(session);
        this.props.dispatch({type:'SET_SESSION', session})
      }
    }
    catch(err) {
      this.props.dispatch({type:'RESET_STATE'})
      console.log('Session not found');
      console.error(err);
    }
  }

  render() {
    console.log(JSON.stringify(this.props))
    if (Object.keys(this.props.session).length === 0) {
      return (
        <AuthScreen />
      )
    }
    else {
      return (<Todo />)
    }
  }

}

Index.propTypes = {
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    session: state.session,
    todos: state.todos
  };
}

export default connect(mapStateToProps)(Index);
