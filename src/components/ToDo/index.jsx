import { useContext } from 'react';

// Context
import Context from 'context';

// Styles
import { DeleteItem, ItemText, ItemTodo } from './styled';

// Icons
import { ReactComponent as IconClose } from 'assets/icons/timesSolid.svg';

const ToDo = ({ todo }) => {
  const { handleUpdateTask, handleRemoveTask } = useContext(Context);
  return (
    <ItemTodo key={todo.id}>
      <ItemText primary={todo.completed} onClick={() => handleUpdateTask(todo.id)}
      >
        {todo.text}
      </ItemText>
      <DeleteItem onClick={() => handleRemoveTask(todo.id)}>
        <IconClose />
      </DeleteItem>
    </ItemTodo>
  );
};

export default ToDo;
