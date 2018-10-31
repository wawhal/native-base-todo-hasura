import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Icon } from 'native-base';
import gql from 'graphql-tag';
import { fetchTodos } from './TodoList';

const deleteTodo = gql`
mutation ($id: Int) {
  delete_todo (
    where: {
      id: {
        _eq: $id
      }
    }
  ) {
    returning {
      id
    }
  }
}
`;

const DeleteButton = ({todo}) => (
  <Mutation
    mutation={deleteTodo}
    variables={{
      id: todo.id
    }}
    update={(cache, {data: {delete_todo}}) => {
      const data = cache.readQuery({ query: fetchTodos });
      const deletedTodoId = delete_todo.returning[0].id;
      const newData = {
        todo: data.todo.filter(t => t.id !== deletedTodoId)
      }
      cache.writeQuery({
        query: fetchTodos,
        variables: {
          filter: {}
        },
        data: newData
      });
    }}
  >
    {
      (mutate, { loading, data, error}) => {
        const submit = () => {
          if (loading) { return; }
          mutate();
        }
        return (
          <Icon
            name="md-trash"
            style={{ color: loading ? 'gray' : '#EE001C' }}
            onPress={submit}
            disabled={loading}
          />
        );
      }
    }
  </Mutation>
)

export default DeleteButton;
