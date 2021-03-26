import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { Layout } from 'antd';
import TodoListForm from './TodoListForm';
import TodoListItems from './TodoListItems';
import { useStore } from '../store';

const TodoList: FC = () => {
  return (
    <Layout.Content style={{ maxWidth: 800, margin: 'auto' }}>
      <TodoListForm />
      <TodoListItems />
      <Counter />
    </Layout.Content>
  );
};

const Counter: FC = observer(() => {
  const store = useStore();
  return <div>Total: {store.numOfAll}</div>;
});

export default TodoList;
