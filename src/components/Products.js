import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BsArrowRightCircle } from 'react-icons/bs';
import { setProducts } from '../redux/products/productsSlice';
import Search from './Search';

const Products = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.products);
  const fetchProducts = useCallback(async () => {
    const res = await axios
      .get('https://api.escuelajs.co/api/v1/products')
      .catch((err) => {
        console.log(err);
      });
    setFilter(res.data);
    setLoading(false);
    dispatch(setProducts(res.data));
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (query) => {
    const filteredData = products.filter((product) => {
      if (product.title && typeof product.title === 'string') {
        return product.title.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
    setFilter(filteredData);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="card-container">
        {filter.map((product, index) => (
          <Link to={`product/${product.id}`} key={product.id} className="link">
            <div className="product-card">
              <ul className="product-list">
                <li className={`product ${index % 2 === 1 ? 'odd' : 'even'}`}>
                  <BsArrowRightCircle className="arrow-right" />
                  <img src={product.images} className="card-img" alt={product.title} />
                  <p className="product-title">{product.title}</p>
                  <p className="price">
                    Price:
                    {' '}
                    {
              product.price
            }
                    {' '}
                    Af
                  </p>
                  <p className="product-description">{product.description}</p>
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Products;
