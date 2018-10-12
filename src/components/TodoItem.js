import React from 'react';
import PropTypes from 'prop-types';
import { Text, ListItem, Body } from 'native-base';
import UpdateCheckbox from './UpdateCheckbox';
import DeleteButton from './DeleteButton';

const TodoItem = ({ item }) => (
  <ListItem style={{ flex: 1 }}>
    <UpdateCheckbox item={item} />
    <Body>
      <Text style={{ alignSelf: 'center' }}>
        {item.text}
      </Text>
    </Body>
    <DeleteButton item={item} />
  </ListItem>
);

export default TodoItem;
