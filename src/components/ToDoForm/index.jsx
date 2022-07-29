import { useContext } from 'react';

// Context
import Context from 'context';

// Styles
import { Button, Input, Form } from './styled';

const ToDoForm = () => {
  const { 
    inputValue, 
    handleSubmit, 
    handleChange, 
    handleKeyPress 
  } = useContext(Context);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={inputValue}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter value..."
      />
      <Button>Save</Button>
    </Form>
  );
};

export default ToDoForm;
