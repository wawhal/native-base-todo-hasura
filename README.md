# React Native Todo App with NativeBase UI

This is a fully working React Native application which uses NativeBase for UI, Hasura for backend and redux for state management.

[!App Gif](https://media.giphy.com/media/xULW8oWoTfaAOQ4dsA/giphy.gif)

Follow the steps below to get the app running quickly.

## Get the app running

### Get the project

```
$ hasura quickstart hasura/native-base-todo-hasura
```

1. This clones the project to a directory `native-base-todo-hasura`. The react-native code lies in `native-base-todo-hasura/react-native` directory.
2. It creates a free [hasura cluster](https://docs.hasura.io/0.15/manual/cluster/index.html) for you.

### Configure the project

1. Install `node_modules`. Run `npm install` from the `react-native` direcotry.

```
$ cd react-native && npm install
```

2. Get your cluster name. Run `hasura cluster status`. Copy the cluster name.

3. Add your cluster name to the project. Go to `react-native/src/hasuraAPi.js`. Add your cluster name to this file.

~~~~
clusterName = "buns47" //here "buns47" is the cluster name. Add your own.
~~~~

### Deploy the project with git push

```
$ git add .
$ git commit -m "First commit"
$ git push hasura master
```
