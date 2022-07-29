import { useReducer } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import Context from 'context';

// Components
import ToDo from 'components/ToDo';
import ToDoForm from 'components/ToDoForm';

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const H1 = styled.h1`
  background: -webkit-linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const initialState = {
  todos: [],
  inputValue: '',
};

const ADD = 'add';
const UPDATE_SEARCH = 'updateSearch';
const UPDATE = 'update';
const DELETE = 'delete';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        todos: [...state.todos, { id: nanoid(), text: action.text, completed: false }],
      };
    case UPDATE_SEARCH:
      return {
        ...state, inputValue: action.inputValue
      };
    case UPDATE: {
      const index = state.todos.findIndex((el) => el.id === action.id);
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index), 
          { ...state.todos[index], completed: !state.todos[index].completed }, 
          ...state.todos.slice(index + 1),
        ]
      };
    };
    case DELETE: 
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.id),
      };
    default:
      return state;
    }
  };

const App = () => {
  const [{ todos, inputValue }, dispatch] = useReducer(reducer, initialState);

  const handleChange = ({ target: { value: inputValue } }) => {
    dispatch({ type: 'updateSearch', inputValue });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length !== 0) {
      dispatch({ type: ADD, text: inputValue });
      dispatch({ type: UPDATE_SEARCH, inputValue: '' });
    };
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: DELETE, id });
  };

  const handleUpdateTask = (id) => {
    dispatch({ type: UPDATE, id });
  };

  return (
    <Context.Provider value={{
      inputValue,
      handleSubmit,
      handleRemoveTask,
      handleUpdateTask,
      handleChange,
      handleKeyPress,
    }}>
      <Wrapper>
        <header>
          <H1>Task list: {todos.length}</H1>
        </header>
        <ToDoForm handleSubmit={handleSubmit} />
        {todos.map((todo) => (
            <ToDo
              todo={todo}
              key={todo.id}
              handleUpdateTask={handleUpdateTask}
              handleRemoveTask={handleRemoveTask}
            />
          ))}
      </Wrapper>
    </Context.Provider>
  );
};

export default App;
