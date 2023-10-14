import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        data-testid="search-text"
      />
      <button type="button">
        <RiSearchLine className="i" />
      </button>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
