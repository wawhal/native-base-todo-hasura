import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CheckBox } from 'native-base';
import gql from 'graphql-tag';

const updateTodo = gql`
mutation ($id: Int, $is_completed: Boolean) {
  update_todo (
    where: {
      id: {
        _eq: $id
      }
    },
    _set: {
      is_completed: $is_completed,
      updated_at: "now()"
    }
  ) {
    returning {
      ...todoResp
    }
  }
}

fragment todoResp on todo {
  id
  text
  is_completed
  created_at
  updated_at
}
`;

const UpdateCheckbox = ({todo}) => (
  <Mutation
    mutation={updateTodo}
    variables={{
      id: todo.id,
      is_completed: !todo.is_completed
    }}
  >
    {
      (mutate, { loading, data, error}) => {
        const submit = () => {
          mutate();
        }
        return (
          <CheckBox
            onPress={submit}
            checked={todo.is_completed}
            disabled={loading}
          /> 
        )     
      }
    }
  </Mutation>
)

export default UpdateCheckbox;