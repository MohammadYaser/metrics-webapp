import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setProductDetails: ((state, action) => action.payload),
  },

});

export const { setProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
