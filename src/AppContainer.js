import { connect } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, setVisibilityFilter } from './action';
import Index from './components/Index';


function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(Index);
