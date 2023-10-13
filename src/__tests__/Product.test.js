import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Product from '../components/Product';
import mockStore from '../__mocks__/reduxMock';

const initialState = {
  productDetails: {
    title: 'Mock Product',
    price: 10,
    description: 'Mock Description',
    images: 'mock-image.jpg',
  },
};

const store = mockStore(initialState);

describe('renders Product component and handles loading and data', () => {
  test('renders Product component and handles loading and data', async () => {
    // Mock axios.get to return your desired data
    axios.get.mockResolvedValue({
      data: {
        title: 'Mock Product',
        price: 10,
        description: 'Mock Description',
        images: 'mock-image.jpg',
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </Provider>,
    );

    // Wait for the loading message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    // Now, you can assert that the product details are rendered
    expect(screen.getByText('Mock Product')).toBeInTheDocument();
    expect(screen.getByText('Price: 10 Af')).toBeInTheDocument();
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
  });
});
