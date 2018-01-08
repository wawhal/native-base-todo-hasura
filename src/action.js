import {AsyncStorage, Alert} from 'react-native';

export function addTodo(payload, id) {
  return {
    type: 'ADD_TODO',
    payload,
    id
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
  try {
    AsyncStorage.setItem("@Todo:session", JSON.stringify(session)).then(() => {
      console.log('Session stored');
    })
  }
  catch (err) {
    console.error(err);
    Alert.alert("Unexpected", "Could not store token");
  }
}
