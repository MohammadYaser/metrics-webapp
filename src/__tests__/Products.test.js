import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Products from '../components/Products';
import mockStore from '../__mocks__/reduxMock';

const initialState = {
  products: [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      images: 'image1.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      images: 'image2.jpg',
    },
  ],
};

const store = mockStore(initialState);

describe('renders Products component and handles loading and data', () => {
  test('renders Products component and handles loading and data', async () => {
    // Mock axios.get to return your desired data
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Product 1',
          price: 10,
          description: 'Description 1',
          images: 'image1.jpg',
        },
        {
          id: 2,
          title: 'Product 2',
          price: 20,
          description: 'Description 2',
          images: 'image2.jpg',
        },
      ],
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>,
    );

    // Wait for the loading message to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    // Now, you can assert that the product details are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Price: 10 Af')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Price: 20 Af')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });
});
