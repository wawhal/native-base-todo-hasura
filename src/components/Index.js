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
  render() {
    return <Todo />;
  }
}

Index.propTypes = {
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(Index);
