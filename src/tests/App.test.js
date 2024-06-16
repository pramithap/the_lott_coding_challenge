// App.test.js
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

test('renders the header', () => {
  // Render the App component
  render(<App />);

  // Check if the header text is in the document
  const headerElement = screen.getByText(/Latest Draw Numbers/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Ticket component with correct props', () => {
  // Render the App component
  render(<App />);

  // Check if the Ticket component is rendered with the correct props
  const ticketComponent = screen.getByText(/SELECT YOUR POWER BALL/i);
  expect(ticketComponent).toBeInTheDocument();
});
