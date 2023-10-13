import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productsSlice';
import productDetailsReducer from './products/productDetailsSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
