const initialState = {
  todos: [], // Array of objects of type {text: 'my task', completed: false}
  displayType: 'all', // expected values: 'all', 'completed', 'active'
  session: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state,
        todos: [...state.todos, { text: action.payload, completed: false, id: action.id }],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: [...state.todos.slice(0, action.index), ...state.todos.slice(action.index + 1)],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        }),
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state, displayType: action.displayType,
      };
    case 'SET_SESSION':
      return {
        ...state, session: action.session
      }
    case 'SET_FETCHED_TODOS':
      console.log('Reaching fetched todos');
      return {
        ...state, todos: action.todos
      }
    default:
  }
  return state;
}
