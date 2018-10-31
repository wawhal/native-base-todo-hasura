import React from 'react';
import PropTypes from 'prop-types';
import { Text, ListItem, Body } from 'native-base';
import UpdateCheckbox from './UpdateCheckbox';
import DeleteButton from './DeleteButton';

const TodoItem = ({ todo, filter }) => (
  <ListItem style={{ flex: 1 }}>
    <UpdateCheckbox todo={todo} filter={filter}/>
    <Body>
      <Text style={{ alignSelf: 'center' }}>
        {todo.text}
      </Text>
    </Body>
    <DeleteButton todo={todo} />
  </ListItem>
);

export default TodoItem;
