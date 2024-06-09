import React from 'react';
import styles from './ProductItem.module.css';
import { Link, useLocation } from 'react-router-dom';

function ProductItem({ id,image, title, description, price }) {
  const location = useLocation();
  return (
    <Link to={`/product/women/${id}`} state={{ from: location }}>
    <div className={styles.productItem}>
      <img src={image} alt={title} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h2 className={styles.productTitle}>{title}</h2>
        <p className={styles.productDescription}>{description}</p>
        <p className={styles.productPrice}>{price} ₴</p>
      </div>
    </div>
    </Link>
  );
}

export default ProductItem;
