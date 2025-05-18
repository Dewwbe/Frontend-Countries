import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FavoritesPage from '../pages/FavoritesPage';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock axios
jest.mock('axios');

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('email', 'test@example.com');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('FavoritesPage', () => {

  test('renders loading spinner initially', () => {
    render(<FavoritesPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders error message when user is not logged in', async () => {
    localStorage.removeItem('email');
    render(<FavoritesPage />);
    await waitFor(() => {
      expect(screen.getByText(/please log in to view favorites/i)).toBeInTheDocument();
    });
  });

  test('renders empty state when no favorites', async () => {
    axios.get.mockResolvedValueOnce({ data: { favorites: [] } });
    render(<FavoritesPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
    });
  });

  test('renders favorite countries when data is returned', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        favorites: [
          {
            country: {
              cca3: 'USA',
              name: { common: 'United States' },
              flags: { png: 'https://flagcdn.com/us.png' },
              capital: ['Washington D.C.'],
              region: 'Americas',
              population: 331000000,
            },
          },
        ],
      },
    });

    render(<FavoritesPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText(/Capital:/i)).toHaveTextContent('Capital: Washington D.C.');
    });
  });

  test('removes favorite when icon button is clicked', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        favorites: [
          {
            country: {
              cca3: 'USA',
              name: { common: 'United States' },
              flags: { png: 'https://flagcdn.com/us.png' },
              capital: ['Washington D.C.'],
              region: 'Americas',
              population: 331000000,
            },
          },
        ],
      },
    });

    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<FavoritesPage />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button', { name: /favorite/i });
    userEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText('United States')).not.toBeInTheDocument();
    });
  });

});
