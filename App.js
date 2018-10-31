import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Index from './src/components/Index';

export default class App extends Component { // eslint-disable-line
  render() { // eslint-disable-line
    return (
      <ApolloProvider client={client}>
        <Index />
      </ApolloProvider>
    );
  }
}
