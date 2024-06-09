import React, { useState, useEffect } from 'react';
import Product from "../components/Product/Product";
import SortOptions from "../components/SortOptions/SortOptions";

function AllProductForAnimal() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    // Fetch products from your API or data source
    const fetchProducts = async () => {
      // Replace with actual data fetching logic
      const fetchedProducts = [
        // Example products
        { id: 1, name: 'Product 1', price: 10, size: 'M' },
        { id: 2, name: 'Product 2', price: 20, size: 'L' },
        { id: 3, name: 'Product 3', price: 5, size: 'S' },
      ];
      setProducts(fetchedProducts);
      setSortedProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedArray = [...products];
    switch (sortCriteria) {
      case 'price-asc':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case 'size-asc':
        sortedArray.sort((a, b) => a.size.localeCompare(b.size));
        break;
      case 'size-desc':
        sortedArray.sort((a, b) => b.size.localeCompare(a.size));
        break;
      default:
        sortedArray = products;
    }
    setSortedProducts(sortedArray);
  }, [sortCriteria, products]);

  return (
    <div>
      <SortOptions onSortChange={setSortCriteria} />
      {sortedProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default AllProductForAnimal;
