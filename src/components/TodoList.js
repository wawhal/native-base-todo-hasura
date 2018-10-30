import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Left, Body, Title, Right, Content, InputGroup, Input, List, Button, Icon, Spinner } from 'native-base';
import gql from 'graphql-tag';
import TodoItem from './TodoItem';
import { Text, View } from 'react-native';

export const fetchTodos= gql`
query ($filter: todo_bool_exp) {
  todo (where: $filter, order_by: {  id: asc } ) {
    id
    text
    is_completed
    created_at
    updated_at
  }
}
`;

const TodoList = ({item, filter}) => (
  <Query
    query={fetchTodos}
    variables={{
      filter: filter === 'all' ? {} : {
        is_completed: { _eq: filter === 'active' ? false : true }
      }
    }}
  >
    {
      ({ loading, data, error}) => {
        if (loading) {
          return <Text>Loading</Text>;
          return (
            <Container>
              <Header />
              <Content>
                <Spinner />
              </Content>
            </Container>
          )
        }
        if (error) {
          return <Text>Error</Text>;
        }
        if (data.todo.length === 0) {
          return (
            <View style={{ alignItems: 'center', paddingTop: 10 }}>
              <Text>No {filter === 'all' ? '' : `${filter} `}todos</Text>
            </View>
          );
        }
        return data.todo.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ));
      }
    }
  </Query>
)

export default TodoList;
