import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Title, Right, Content, InputGroup, Input, List, Button, Icon, Spinner } from 'native-base';
import { addTodo, toggleTodo, removeTodo, setVisibilityFilter, logout, setFetchedTodos } from '../action';
import { insertTodo, deleteTodo, updateTodo, fetchTodos } from '../hasuraApi';
import { View, Text, Dimensions, Alert } from 'react-native';

const Filters = ({filter, setFilter}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width,
        marginTop: 20 }}
    >
      <Button
        transparent
        bordered={filter === 'all'}
        onPress={() => setFilter('all')}
        >
          <Text> All </Text>
        </Button>

      <Button
        transparent
        bordered={filter === 'completed'}
        onPress={() => setFilter('completed')}
        >
          <Text> Completed </Text>
        </Button>

      <Button
        transparent
        bordered={filter === 'active'}
        onPress={() => setFilter('active')}
        >
          <Text> Active </Text>
        </Button>
    </View>
  )
}

export default Filters;