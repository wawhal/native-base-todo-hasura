import {AsyncStorage, Alert} from 'react-native';

export function addTodo(payload) {
  console.log("Reached AddTodo");
  return {
    type: 'ADD_TODO',
    payload,
  };
}

export function toggleTodo(index) {
  return {
    type: 'TOGGLE_TODO',
    index,
  };
}

export function removeTodo(index) {
  return {
    type: 'REMOVE_TODO',
    index,
  };
}

export function setVisibilityFilter(displayType) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    displayType,
  };
}

export function storeSession(session) {
  AsyncStorage.setItem("@Todo:session", JSON.stringify(session)).then(() => {
    console.log('Session stored')
  })
  .catch(err => {
    Alert.alert('Unexpected', 'Could not store token to local storage');
    console.error(err);
  });
}

export function fetchSession() {
  AsyncStorage.getItem("@Todo:session")
  .then( value => JSON.parse(value))
  .then((session) => {
    return session;
  })
  .catch((err) => {
      Alert.alert('Unauthorized', 'Login again');
      console.error(err);
  });
}
