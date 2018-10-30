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
    update={(cache, {data: {insert_todo}}) => {
      const data = cache.readQuery({
        query: fetchTodos,
        variables: { filter: {} }
      });
      const newTodo = insert_todo.returning[0];
      const newData = {
        todo: [ newTodo, ...data.todo]
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
          mutate();
        }
        return (
          <Icon
            name="md-trash"
            style={{ color: '#000000' }}
            onPress={submit}
            disabled={loading}
          />
        );
      }
    }
  </Mutation>
)

export default DeleteButton;
