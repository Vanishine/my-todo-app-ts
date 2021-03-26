import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ITodo, useStore } from '../store';

import { Button, Checkbox, Col, Input, List, Row } from 'antd';

const TodoListItem: FC<{ todo: ITodo }> = observer(({ todo }) => {
  const store = useStore();
  return (
    <List.Item>
      <Row align="middle">
        <Col>
          <Checkbox checked={todo.done} onChange={() => store.toggle(todo)} />
        </Col>
        <Col>
          <Input
            value={todo.title}
            bordered={false}
            onChange={(e) => store.update(todo, e.target.value)}
            style={{
              textDecoration: todo.done ? 'line-through' : 'unset',
              color: todo.done ? '#999' : '#333',
            }}
          />
        </Col>
        <Col>
          <Button data-testid='delete-todo' onClick={() => store.remove(todo)}>X</Button>
        </Col>
      </Row>
    </List.Item>
  );
});

export default TodoListItem;
