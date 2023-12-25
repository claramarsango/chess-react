import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Given a web page,', () => {
  test('when there is a title, then it should appear on the screen', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: 'Chess' });

    expect(title).toBeInTheDocument();
  });

  test('when there is a user feedback message, then it should appear on the screen', () => {
    render(<App />);

    const userFeedback = screen.getByRole('heading', {
      name: '🚧 ...Under construction... 🚧',
    });

    expect(userFeedback).toBeInTheDocument();
  });
});
