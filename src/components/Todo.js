import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Title, Right, Content, InputGroup, Input, List, Button, Icon } from 'native-base';
import { addTodo, toggleTodo, removeTodo, setVisibilityFilter } from '../action';
import { View, Text, Dimensions } from 'react-native';

import TodoItem from './TodoItem';

const { width } = Dimensions.get('window');

class Todo extends Component {

  static propTypes = {
    removeTodo: PropTypes.func,
    setVisibilityFilter: PropTypes.func,
    toggleTodo: PropTypes.func,
    todos: PropTypes.array,
    session: PropTypes.object,
    displayType: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { inputText: '', displayType: 'all' };
  }

  onSubmit () {
    if (this.state.inputText.length > 0) {
      this.props.addTodo(this.state.inputText);//eslint-disable-line
      this.setState({
        inputText: ''
      });
      console.log(this.props.todos);
    }
  }

  remove (id) {
    this.props.removeTodo(id);
  }

  toggle (id) {
    this.props.toggleTodo(id);
  }

  renderTodoList() {
    if ((this.props.displayType === 'all')) {
      return this.props.todos.map((item, index) =>
        <TodoItem
          toggle={() => this.toggle(index)}
          remove={() => this.remove(index)}
          item={item}
          key={index}
        />
      );
    } else if (this.props.displayType === 'completed') {
      const completed = this.props.todos.filter(item => item.completed).length;
      if (completed > 0) {
        return this.props.todos.map((item, index) => {
          if (item.completed === true) {
            return (<TodoItem
              toggle={() => this.toggle(index)}
              remove={() => this.remove(index)}
              item={item}
              key={index}
            />);
          }

          return null;
        });
      }
      return (<View style={{ alignItems: 'center', paddingTop: 10 }}><Text>No Completed Data</Text></View>);
    }

    return this.props.todos.map((item, index) => {
      if (item.completed === false) {
        return (
          <TodoItem
            toggle={() => this.toggle(index)}
            remove={() => this.remove(index)}
            item={item}
            key={index}
          />
        );
      }
      return null;
    });
  }

  render() {
    return (
      <Container>
        <Header >
          <Left>
            <Button transparent onPress={() => {
              this.props.dispatch({type: "SET_SESSION"})
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body> <Title> NativeBase To-do App </Title> </Body>
          <Right />
        </Header>

        <Content contentContainerStyle={{ justifyContent: 'space-between' }} >
          <View >
            <List>
              {this.renderTodoList()}
            </List>

            {!!this.props.todos.length > 0 && <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-around',
                width,
                marginTop: 50 }}
            >
              <Button
                transparent
                bordered={this.props.displayType === 'all'}
                onPress={() => this.props.setVisibilityFilter('all')}
              >
                <Text> All </Text>
              </Button>

              <Button
                transparent
                bordered={this.props.displayType === 'completed'}
                onPress={() => this.props.setVisibilityFilter('completed')}
              >
                <Text> Completed </Text>
              </Button>

              <Button
                transparent
                bordered={this.props.displayType === 'active'}
                onPress={() => this.props.setVisibilityFilter('active')}
              >
                <Text> Active </Text>
              </Button>

            </View>}
          </View>
        </Content>

        <View
          style={{
            alignSelf: 'flex-end',
            flex: 0,
            padding: 5,
            flexDirection: 'row'
          }}
        >
          <InputGroup
            borderType="underline"
            style={{ flex: 0.9 }}
          >
            <Input
              placeholder="Type Your Text Here"
              value={this.state.inputText}
              onChangeText={inputText => this.setState({ inputText })}
              onSubmitEditing={() => this.onSubmit()}
              maxLength={35}
            />
          </InputGroup>
          <Button
            style={{ flex: 0.1, marginLeft: 15 }}
            onPress={() => this.onSubmit()}
            title="Add"
          >
            <Text> Add </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    displayType: state.displayType,
    session: state.session,
    loading: false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: payload => dispatch(addTodo(payload)),
    toggleTodo: index => dispatch(toggleTodo(index)),
    removeTodo: index => dispatch(removeTodo(index)),
    setVisibilityFilter: displayType => dispatch(setVisibilityFilter(displayType)),
    storeSession: session => dispatch(storeSession(session))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
