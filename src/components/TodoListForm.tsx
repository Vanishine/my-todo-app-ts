import React, { FC, useState } from 'react';
import { useStore } from '../store';

import { Button, Input, Form } from 'antd';

const TodoListForm: FC = () => {
  const store = useStore();
  const [title, setTitle] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    store.add(title);
    setTitle('');
  };

  return (
    <Form onFinish={onSubmit} layout="horizontal">
      <Form.Item name="title">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="What needs to be done?"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  );
};

export default TodoListForm;
