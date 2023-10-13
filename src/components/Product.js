import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { setProductDetails } from '../redux/products/productDetailsSlice';

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const {
    id, title, price, description, images,
  } = productDetails;

  const fetchProductDetails = useCallback(async () => {
    const res = await axios
      .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .catch((err) => {
        console.log(err);
      });
    dispatch(setProductDetails(res.data));
  }, [dispatch, productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails, productId]);
  return (
    <div>
      <p>{id}</p>
      <p>{title}</p>
      <p>{price}</p>
      <p>{description}</p>
      <img src={images} alt={title} />

    </div>
  );
};

export default Product;
