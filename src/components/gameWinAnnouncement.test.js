import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board';
import Game from './connection/Game';
jest.mock('../components/context/ChatContext', () => ({
    useChatContext: () => ({
      client: {
        queryUsers: jest.fn().mockResolvedValue({
          users: [{ id: 'user-id' }],
        }),
        channel: jest.fn().mockReturnValue({
          watch: jest.fn(),
          sendMessage: jest.fn(),
        }),
        userID: 'user-id',
      },
    }),
  }));
  
  jest.mock('../components/context/Channel', () => ({
    __esModule: true,
    namedExport: jest.fn().mockReturnValue(jest.fn()),
  }));
  
  test('Announces game win when a player is mated', () => {
    // Render the Game component
    render(<Game />);
  
    // Simulate the game flow leading to checkmate
    fireEvent.click(screen.getByPlaceholderText('Username of rival...'));
    fireEvent.change(screen.getByPlaceholderText('Username of rival...'), {
      target: { value: 'rival-username' },
    });
    fireEvent.click(screen.getByText('Join/Start Game'));
  
    // Perform moves that lead to checkmate
    // Assuming "white" player is checkmated
    // Example moves that lead to checkmate
    fireEvent.click(screen.getByTestId('52')); // Select a white piece
    fireEvent.click(screen.getByTestId('44')); // Move to a valid position

    fireEvent.click(screen.getByTestId('8')); // Select a black piece
    fireEvent.click(screen.getByTestId('24')); // Move to a valid position

    fireEvent.click(screen.getByTestId('59')); // Select a white piece
    fireEvent.click(screen.getByTestId('45')); // Move to a valid position

    fireEvent.click(screen.getByTestId('15')); // Select a black piece
    fireEvent.click(screen.getByTestId('23')); // Move to a valid position

    fireEvent.click(screen.getByTestId('61')); // Select a white piece
    fireEvent.click(screen.getByTestId('34')); // Move to a valid position

    fireEvent.click(screen.getByTestId('24')); // Select a black piece
    fireEvent.click(screen.getByTestId('32')); // Move to a valid position

    fireEvent.click(screen.getByTestId('34')); // Select a white piece
    fireEvent.click(screen.getByTestId('13')); // Move to a valid position
    // ... continue with the moves that lead to checkmate
  
    // Check that the game win is announced
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText('Black won')).toBeInTheDocument();
  });