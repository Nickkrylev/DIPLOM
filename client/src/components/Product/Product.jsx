import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './Product.module.css';
import ProductItem from '../ProductItem/ProductItem';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Product({products}) {
  const query = useQuery();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState(36);

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
      
    }
  }, [id]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleProducts(36); // Reset the visible products when category changes
  };

  const handleLoadMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 36);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory || product.forState === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <button onClick={() => handleCategoryChange('all')}>Всі</button>
        <button onClick={() => handleCategoryChange('clothes')}>Одяг</button>
        <button onClick={() => handleCategoryChange('shoes')}>Взуття</button>
        <button onClick={() => handleCategoryChange('accessories')}>Аксесуари</button>
     
      </div>
      <div className={styles.productList}>
        {filteredProducts.slice(0, visibleProducts).map((product, index) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className={styles.loadMore}>
          <button onClick={handleLoadMore}>Загрузити більше</button>
        </div>
      )}
    </div>
  );
}

export default Product;
