import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from '../page';


const mockUser = {
  name: 'test',
  email: 'test',
};

describe('UserProfile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders user data when fetch is successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId="123" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  it('shows error message when fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    render(<UserProfile userId="456" />);
    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch user data/i)).toBeInTheDocument();
    });
  });

  it('shows error message when fetch throws an exception', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    render(<UserProfile userId="789" />);
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });
});
