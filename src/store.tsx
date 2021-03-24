import { makeAutoObservable } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { createContext, FC, useContext } from 'react'

export interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

export class TodoListStore {
  list: ITodo[] = [
    { id: 'name', title: 'test', done: false }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  add(title: string) {
    this.list.push({
      id: nanoid(), title, done: false
    })
  }
  remove(todo: ITodo) {
    const index = this.list.indexOf(todo)
    this.list.splice(index, 1)
  }
  update(todo: ITodo, title: string) {
    todo.title = title
  }
  toggle(todo: ITodo) {
    todo.done = !todo.done
  }
  get numOfAll() {
    return this.list.length
  }
  get numOfUndone() {
    return this.list.filter(todo => !todo.done).length
  }
}

const StoreContext = createContext<TodoListStore>(undefined!)

export const StoreProvider: FC = ({ children }) => {
  const store = useLocalObservable(() => new TodoListStore())
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  return useContext(StoreContext)
}
