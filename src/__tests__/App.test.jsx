import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest'

describe('Weather App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  test('renders input and search button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  test('shows default message before search', () => {
    render(<App />);
    expect(screen.getByText(/enter a city and click search/i)).toBeInTheDocument();
  });

//   test('alerts when trying to search with empty input', () => {
//     window.alert = vi.fn(); // mock alert
//     render(<App />);
//     fireEvent.click(screen.getByText(/search/i));
//     expect(window.alert).toHaveBeenCalledWith('enter a city');
//   });
    test('alerts when trying to search with empty input', () => {
        render(<App />);
        fireEvent.click(screen.getByTestId('search-button'));
        expect(window.alert).toHaveBeenCalledWith('enter a city');
    });

  test('displays weather info after search : colombo', async () => {
    // Mock OpenWeatherMap API response
    const mockWeatherData = {
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { humidity: 42, temp: 23 },
      wind: { speed: 4.5 },
      name: 'Colombo',
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    render(<App />);

    // Simulate user typing and clicking search
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'Colombo' },
    });
    fireEvent.click(screen.getByTestId('search-button'));

    // Wait for weather description to appear
    await waitFor(() =>
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    );

    // Check that dynamic fields are rendered (but not exact numbers)
    expect(screen.getByText(/colombo/i)).toBeInTheDocument();
    expect(screen.getByText(/°c/i)).toBeInTheDocument();
    expect(screen.getByText(/wind/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity/i)).toBeInTheDocument();
  });

  test('displays weather info after search : ratnapura', async () => {
    // Mock OpenWeatherMap API response
    const mockWeatherData = {
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { humidity: 42, temp: 23 },
      wind: { speed: 4.5 },
      name: 'ratnapura',
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    render(<App />);

    // Simulate user typing and clicking search
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'ratnapura' },
    });
    fireEvent.click(screen.getByTestId('search-button'));

    // Wait for weather description to appear
    await waitFor(() =>
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    );

    // Check that dynamic fields are rendered (but not exact numbers)
    expect(screen.getByText(/ratnapura/i)).toBeInTheDocument();
    expect(screen.getByText(/°c/i)).toBeInTheDocument();
    expect(screen.getByText(/wind/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity/i)).toBeInTheDocument();
  });
});
