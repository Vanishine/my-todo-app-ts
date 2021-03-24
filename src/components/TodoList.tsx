import { trace } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { ITodo, useStore } from "../store";

const TodoList: FC = () => {
  return (
    <div>
      <TodoListForm />
      <TodoListItems />
    </div>
  )
}

const TodoListForm: FC = () => {
  const store = useStore()
  const [title, setTitle] = useState('')

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    store.add(title)
    setTitle('')
  }

  return <form onSubmit={onSubmit}>
    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
    <input type="submit" value="Add" />
  </form>
}

const TodoListItems: FC = observer(() => {
  const store = useStore()
  trace()
  return (
    <>
      {store.list.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
      Total: {store.numOfAll}
    </>
  )
})

const TodoListItem: FC<{ todo: ITodo }> = observer(({ todo }) => {
  const store = useStore()
  return (
    <div key={todo.id} style={{
      color: todo.done ? 'green' : '#000'
    }}>
      <input type="checkbox" checked={todo.done} onChange={() => store.toggle(todo)} />
      <input type="text" value={todo.title} onChange={
        e => store.update(todo, e.target.value)
      } />
      <button onClick={() => store.remove(todo)}>X</button>
    </div>
  )
})

export default TodoList
