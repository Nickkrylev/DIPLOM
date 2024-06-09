import React from 'react';

function SortOptions({ onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div>
      <label>Sort by: </label>
      <select onChange={handleSortChange}>
        <option value="">Select</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortOptions;
