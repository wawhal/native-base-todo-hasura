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
      is_completed: $is_completed
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

const UpdateCheckbox = ({item}) => (
  <Mutation
    mutation: {updateTodo}
    variables: {{
      id: item.id,
      is_completed: !item.is_completed
    }}
  >
    {
      (updateTodo, { loading, data, error}) => {
        return (
          <CheckBox
            onPress={updateTodo}
            checked={item.is_completed}
            disabled={loading}
          /> 
        )     
      }
    }
  </Mutation>
)

export default UpdateCheckbox;