import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSession } from '../action';
import {Text } from 'native-base';
import AuthScreen from './AuthScreen';
import Todo from './Todo';

export class Index extends React.Component {

  compenentDidMount () {
    fetchSession()
    .then((session) => {
      console.log("Session found. Logging in.")
      this.props.dispatch({type: SET_SESSION, session});
    })
  }

  render() {
    if (Object.keys(this.props.session).length === 0) {
      return (
        <AuthScreen />
      )
    }
    else {
      return (<Text> Yo yo </Text>)
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
  };
}

export default connect(mapStateToProps)(Index);
