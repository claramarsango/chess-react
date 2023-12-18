import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Given a web page, when there is a title, then it should appear on the screen', () => {
  render(<App />);

  const title = screen.getByRole('heading', { name: 'Hello World!' });

  expect(title).toBeInTheDocument();
});
