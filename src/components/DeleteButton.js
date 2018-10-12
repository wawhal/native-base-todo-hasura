import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Icon } from 'native-base';
import gql from 'graphql-tag';

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

const DeleteButton = ({item}) => {
  <Mutation
    mutation: {deleteTodo}
    variables: {{
      id: item.id
    }}
  >
    {
      (deleteTodo, { loading, data, error}) => {
        return (
          <Icon
            name="md-trash"
            style={{ color: '#000000' }}
            onPress={deleteTodo}
            disabled={loading}
          />
        );
      }
    }
  </Mutation>
}

export default DeleteButton;