import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Ticket from '../../components/Ticket/Ticket';
import getLatestDrawResults from '../../api/api';

// Mock the fetchLatestResults function
jest.mock('../../api/api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Ticket Component', () => {

  beforeEach(() => {
    getLatestDrawResults.mockClear();
  });

  //test data
  const possibleTicketNumbers = { primary: 35, secondary: 20 };
  const possibleDrawNumbers = { primary: 7, secondary: 1 };


  test('Render the Ticket component with given props', () => {

    render(<Ticket type="PowerBall" possibleTicketNumbers={possibleTicketNumbers} possibleDrawNumbers={possibleDrawNumbers} />);

    expect(screen.getByText(/SELECT YOUR POWER BALL/i)).toBeInTheDocument();

    // There should be a specific count of number components.
    const numberElements = document.querySelectorAll('.number');

    expect(numberElements.length).toBe(possibleTicketNumbers.primary + possibleTicketNumbers.secondary + possibleDrawNumbers.primary + possibleDrawNumbers.secondary);
    
    expect(screen.getByAltText(/AutoFill icon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Clear icon/i)).toBeInTheDocument();
  });

  test('Gets and displays draw numbers when the AutoFill button is clicked', async () => {
    
    //mock data
    const mockData = {
      DrawResults: [
        {
          PrimaryNumbers: [1, 2, 3, 4, 5, 6, 7],
          SecondaryNumbers: [8],
        },
      ],
    };


    getLatestDrawResults.mockResolvedValueOnce(mockData);

    render(<Ticket type="PowerBall" possibleTicketNumbers={possibleTicketNumbers} possibleDrawNumbers={possibleDrawNumbers} />);

    fireEvent.click(screen.getByAltText(/AutoFill icon/i));

    // test the draw numbers are displayed as expected
    for (const num of mockData.DrawResults[0].PrimaryNumbers) {

      const element = await screen.findByTestId(`container-primary-${num}`);
     
      expect(element).toHaveClass('number');
    }

    const secondaryElement = await screen.findByTestId(`container-secondary-${mockData.DrawResults[0].SecondaryNumbers[0]}`);
    
    expect(secondaryElement).toHaveClass('number');
  });

  

});
