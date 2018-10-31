import React from 'react';
import PropTypes from 'prop-types';
import {AsyncStorage, Alert} from 'react-native';
import {Text } from 'native-base';
import Todo from './Todo';

export default class Index extends React.Component {
  render() {
    return <Todo />;
  }
}
