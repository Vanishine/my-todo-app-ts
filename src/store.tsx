import { makeAutoObservable, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { createContext, FC, useContext, useEffect } from 'react';

export interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

export class TodoListStore {
  list: ITodo[];
  constructor() {
    makeAutoObservable(this);
    const storage = localStorage.getItem('todoStore');
    this.list = (storage ? JSON.parse(storage) : []) as ITodo[];
  }
  add(title: string) {
    this.list.push({
      id: nanoid(),
      title,
      done: false,
    });
  }
  remove(todo: ITodo) {
    const index = this.list.indexOf(todo);
    this.list.splice(index, 1);
  }
  update(todo: ITodo, title: string) {
    todo.title = title;
  }
  toggle(todo: ITodo) {
    todo.done = !todo.done;
  }
  get numOfAll() {
    return this.list.length;
  }
  get numOfUndone() {
    return this.list.filter((todo) => !todo.done).length;
  }
}

export const StoreContext = createContext<TodoListStore>(undefined!);

export const StoreProvider: FC = ({ children }) => {
  const store = useLocalObservable(() => new TodoListStore());
  useEffect(() => {
    return reaction(
      () => JSON.stringify(store.list),
      (json) => localStorage.setItem('todoStore', json),
      { delay: 500 }
    );
  }, [store]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
