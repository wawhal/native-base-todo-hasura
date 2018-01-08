import {storeSession} from './action';

var authUrl = "https://auth.buns47.hasura-app.io/v1/";
var dataUrl = "https://data.buns47.hasura-app.io/v1/query"

var requestOptions = {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
};

export function tryAuth(username, password, task) {
  var url = authUrl + task;
  var body = {
    "provider": "username",
    "data": {
      "username": username,
      "password": password
    }
  };

  requestOptions["body"] = JSON.stringify(body);

  return fetch(url, requestOptions)
  .then((response) => {
  	return response.json().then((resp) => {
    })
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}

export function insertTodo(todo, userId, token) {
  var body = {
    "type": "insert",
    "args": {
      "table": "todos",
      "objects": [
        {
          "todo": todo,
          "completed": false,
          "user_id": userId
        }
      ]
    }
  }
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log("Todo Added");
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}

export function fetchTodos(userId, token) {
  var body = {
    "type": "select",
    "args": {
      "table": "todos",
      "columns": [
        "todo",
        "completed",
        "id"
      ],
      "where": {
        "user_id": userId
      }
    }
  }
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log("Todo Added");
    return result;
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}

export function updateCompletion(id, complete, token) {
  var body = {
    "type": "update",
    "args": {
      "table": "todos",
      "where": {
        "id": id
      },
      "$set": {
        "completed": complete
      }
    }
  }
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log("Todo Updated");
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}

export function deleteTodo(id, token) {
  var body = {
    "type": "delete",
    "args": {
      "table": "todos",
      "where": {
        "id": id
      }
    }
  }
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log("Todo Deleted");
  })
  .catch(function(error) {
  	console.log('Request Failed:' + error);
  });
}
