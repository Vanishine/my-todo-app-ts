import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store';

render(
  <StoreProvider>
    <App />
  </StoreProvider>
);

test('renders input form', () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
  const linkElement = screen.getByText(/needs to be done/i);
  expect(linkElement).toBeInTheDocument();
});
