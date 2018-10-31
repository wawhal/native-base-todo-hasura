import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Container, Header, Left,
  Body, Title, Right, Content,
  InputGroup, Input, List, Button,
  Icon, Spinner
} from 'native-base';
import gql from 'graphql-tag';
import TodoItem from './TodoItem';
import { Text, View } from 'react-native';

export const fetchTodos= gql`
query {
  todo {
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
  >
    {
      ({ loading, data, error}) => {
        if (loading) {
          return (
            <Container>
              <Header />
              <Content>
                <Spinner color="#004A70"/>
              </Content>
            </Container>
          );
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
        if (filter === 'active') {
          return data.todo.filter(t => !t.is_completed).map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              filter={filter}
            />
          ));
        }
        if (filter === 'completed') {
          return data.todo.filter(t => t.is_completed).map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              filter={filter}
            />
          ));
        }
        return data.todo.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            filter={filter}
          />
        ));
        
      }
    }
  </Query>
)

export default TodoList;
