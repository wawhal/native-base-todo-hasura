import {storeSession} from './action';

var clusterName = "adenoidal82"; //Add your own cluster name
var authUrl = "https://auth."+clusterName+".hasura-app.io/v1/";
var dataUrl = "https://data."+clusterName+".hasura-app.io/v1/query";


const networkErrorObj = {
  status: 503
}

export async function tryAuth(username, password, task, dispatch) {

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  var url = authUrl + task;
  console.log(url)
  var body = {
    "provider": "username",
    "data": {
      "username": username,
      "password": password
    }
  };

  requestOptions["body"] = JSON.stringify(body);

  try {
    var resp = await fetch(url, requestOptions);
    return resp;
  }
  catch (err) {
    console.log("Request Failed: " + err);
    return networkErrorObj;
  }
}

export async function insertTodo(todo, userId, token) {

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  var body = {
    "type": "insert",
    "args": {
      "table": "todos",
      "objects": [
        {
          "text": todo,
          "completed": false,
          "user_id": userId
        }
      ],
      "returning": [
        "id"
      ]
    }
  }
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  try {
    var resp = await fetch(dataUrl, requestOptions);
    return resp;
  }
  catch (err) {
    console.log("Request Failed: " + err);
    return networkErrorObj;
  }
}

export async function fetchTodos(userId, token) {

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  };
  var body = {
    "type": "select",
    "args": {
      "table": "todos",
      "columns": [
        "text",
        "completed",
        "id"
      ],
      "where": {
        "user_id": userId
      }
    }
  }
  console.log('User ID' + userId)
  requestOptions.headers["Authorization"] = "Bearer" + token
  requestOptions["body"] = JSON.stringify(body);

  try {
    var resp = await fetch(dataUrl, requestOptions);
    return resp;
  }
  catch (err) {
    console.log("Request Failed: " + err);
    return networkErrorObj;
  }
}

export async function updateTodo(id, complete, token) {

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  };
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

  try {
    var resp = await fetch(dataUrl, requestOptions);
    return resp;
  }
  catch (err) {
    console.log("Request Failed: " + err);
    return networkErrorObj;
  }
}

export async function deleteTodo(id, token) {

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  };
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

  try {
    var resp = await fetch(dataUrl, requestOptions);
    return resp;
  }
  catch (err) {
    console.log("Request Failed: " + err);
    return networkErrorObj;
  }
}
