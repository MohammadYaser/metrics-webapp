import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { setProductDetails } from '../redux/products/productDetailsSlice';

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productDetails = useSelector((state) => state.productDetails);
  const {
    title, price, description, images,
  } = productDetails;

  const fetchProductDetails = useCallback(async () => {
    const res = await axios
      .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .catch((err) => {
        console.log(err);
      });
    dispatch(setProductDetails(res.data));
    setLoading(false);
  }, [dispatch, productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails, productId]);
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="product-details">
      <Link to="/" className="back-link">
        <FaAngleLeft className="back-icon" />
      </Link>
      <ul className="list">
        <li>
          <img src={images} alt={title} className="image" />
        </li>
        <li className="product-info">
          <p className="title">{title}</p>
        </li>
        <li className="product-info">
          <p className="price">
            Price:
            {' '}
            {
              price
            }
            {' '}
            Af
          </p>
        </li>
        <li className="product-info">
          <p className="description">{description}</p>
        </li>
      </ul>
    </div>

  );
};

export default Product;
