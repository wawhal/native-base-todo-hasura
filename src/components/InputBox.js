import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CheckBox } from 'native-base';
import gql from 'graphql-tag';

const insertTodo = gql`
mutation ($text: String!) {
  insert_todo (
    objects: [
      {
        text: $text
      }
    ]
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
`

class InputBox extends React.Component {
  state = {
    text: ''
  };

  render() {
    const { text } = this.state;
    return (
      <Mutation
        mutation={addTodo}
        variables={{
          text
        }}
      >
        {
          (insertTodo, {data, loading, error}) => {
            const onSubmit = () => {
              this.setState({ text: ''});
              insertTodo();
            }
            return (
              <View
                style={{
                  alignSelf: 'flex-end',
                  flex: 0,
                  padding: 5,
                  flexDirection: 'row',
                }}
              >
                <InputGroup
                  borderType="underline"
                  style={{ flex: 0.9 }}
                >
                  <Input
                    placeholder="Type Your Text Here"
                    value={text}
                    onChangeText={inputText => this.setState({ text: inputText })}
                    onSubmitEditing={onSubmit}
                    maxLength={35}
                  />
                </InputGroup>
                <Button
                  style={{ flex: 0.1, mar ginLeft: 15 }}
                  onPress={onSubmit}
                >
                  <Text> Add </Text>
                </Button>
              </View> 
            );
          }
        }
      </Mutation>
    )
  }
}

export default InputBox;