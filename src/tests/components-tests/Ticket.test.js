import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Ticket from '../../components/Ticket/Ticket';
import fetchLatestResults from '../../api/api';

// Mock the fetchLatestResults function
jest.mock('../../api/api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Ticket Component', () => {
  const possibleTicketNumbers = { primary: 35, secondary: 20 };
  const possibleDrawNumbers = { primary: 7, secondary: 1 };

  beforeEach(() => {
    fetchLatestResults.mockClear();
  });

  test('renders correctly with given props', () => {
    render(<Ticket type="PowerBall" possibleTicketNumbers={possibleTicketNumbers} possibleDrawNumbers={possibleDrawNumbers} />);

    expect(screen.getByText(/SELECT YOUR POWER BALL/i)).toBeInTheDocument();

    // Select all elements with class 'number' to count them
    const numberElements = document.querySelectorAll('.number');
    expect(numberElements.length).toBe(possibleTicketNumbers.primary + possibleTicketNumbers.secondary + possibleDrawNumbers.primary + possibleDrawNumbers.secondary);
    expect(screen.getByAltText(/AutoFill icon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Clear icon/i)).toBeInTheDocument();
  });

  test('fetches and displays draw numbers on AutoFill button click', async () => {
    const mockData = {
      DrawResults: [
        {
          PrimaryNumbers: [1, 2, 3, 4, 5, 6, 7],
          SecondaryNumbers: [8],
        },
      ],
    };
    fetchLatestResults.mockResolvedValueOnce(mockData);

    render(<Ticket type="PowerBall" possibleTicketNumbers={possibleTicketNumbers} possibleDrawNumbers={possibleDrawNumbers} />);

    fireEvent.click(screen.getByAltText(/AutoFill icon/i));

    // Check if draw numbers are displayed as expected
    for (const num of mockData.DrawResults[0].PrimaryNumbers) {
      const element = await screen.findByTestId(`container-primary-${num}`);
      console.log(`Element found for primary number ${num}:`, element);
      expect(element).toHaveClass('number');
    }

    const secondaryElement = await screen.findByTestId(`container-secondary-${mockData.DrawResults[0].SecondaryNumbers[0]}`);
    console.log(`Element found for secondary number ${mockData.DrawResults[0].SecondaryNumbers[0]}:`, secondaryElement);
    expect(secondaryElement).toHaveClass('number');
  });

  

});
