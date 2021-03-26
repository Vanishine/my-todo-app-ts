import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useStore } from '../store';

import { List } from 'antd';
import TodoListItem from './TodoListItem';

const TodoListItems: FC = observer(() => {
  debugger;
  const store = useStore();
  return (
    <List bordered header={<h1>TODOs</h1>}>
      {store.list.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
});

export default TodoListItems;
