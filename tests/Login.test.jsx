import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/pages/Login';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<Login />);

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows error message on failed login', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects on successful login', async () => {
    delete window.location;
    window.location = { href: '' };

    axios.post.mockResolvedValueOnce({
      data: {
        token: 'mock-token',
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'correctpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mock-token');
      expect(localStorage.getItem('email')).toBe('test@example.com');
      expect(window.location.href).toBe('/home');
    });
  });

  it('displays loading bar during submission', async () => {
    let resolveRequest;
    const mockPromise = new Promise((resolve) => {
      resolveRequest = resolve;
    });

    axios.post.mockImplementation(() => mockPromise);

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Resolve the mock promise
    resolveRequest({ data: { token: 'token123' } });

    // Wait for the progress bar to disappear
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });
});
