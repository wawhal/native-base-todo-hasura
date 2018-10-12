import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Left, Body, Title, Right, Content, InputGroup, Input, List, Button, Icon, Spinner } from 'native-base';
import gql from 'graphql-tag';

const fetchTodos= gql`
query ($filter: todo_bool_exp) {
  todo (where: $filter) {
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
    query: {fetchTodos}
    variables={{
      filter: filter === 'all' ? {} : {
        is_completed: filter === 'active' ? false : true
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
              <Text>No {filter === 'all' ? '' : `${filter} `)}todos</Text>
            </View>
          );
        }
        return data.todo.map((item) => {
          <TodoItem
            item={item}
          />
        });
      }
    }
  </Query>
)

export default CompletedCheckbox;