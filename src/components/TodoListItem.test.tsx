import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TodoListItem from './TodoListItem';
import { StoreContext, TodoListStore } from '../store';

const store = new TodoListStore();
store.list = [
  { id: '1', title: 'Apple', done: false },
  { id: '2', title: 'Banana', done: false },
];

// test('renders input form', () => {
//   render(
//     <StoreProvider>
//       <App />
//     </StoreProvider>
//   );
//   const linkElement = screen.getByText(/needs to be done/i);
//   expect(linkElement).toBeInTheDocument();
// });

afterEach(cleanup);

test('render todo item', () => {
  const {getByDisplayValue} = render(
    <StoreContext.Provider value={store}>
      <TodoListItem todo={store.list[0]} />
    </StoreContext.Provider>
  );
  expect(getByDisplayValue(/Apple/)).toBeInTheDocument();
  expect(getByDisplayValue(/Banana/)).toBeInTheDocument();
});

test('delete todo should work', () => {
  render(
    <StoreContext.Provider value={store}>
      <TodoListItem todo={store.list[0]} />
    </StoreContext.Provider>
  );
  fireEvent.click(screen.getByTestId('delete-todo'));
  expect(store.list.length).toBe(1)
  screen.debug()
});

test('todo title should be updated', () => {
  render(
    <StoreContext.Provider value={store}>
      <TodoListItem todo={store.list[0]} />
    </StoreContext.Provider>
  );
})
