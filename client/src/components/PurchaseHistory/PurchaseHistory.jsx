import React, { useState } from 'react';
import styles from './PurchaseHistory.module.css';

const PurchaseHistory = ({ orders }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.history}>
      <h2>ІСТОРІЯ ПОКУПОК</h2>
      <ul className={styles.orderList}>
        {orders.map((order, index) => (
          <li key={index} className={styles.orderItem}>
            <div className={styles.header} onClick={() => toggleExpand(index)}>
              <span>Дата: {order.date}</span>
              <span className={styles.status}>{order.status}</span>
            </div>
            {expandedIndex === index && (
              <ul className={styles.productList}>
                {order.products.map((product, prodIndex) => (
                  <li key={prodIndex} className={styles.productItem}>
                    <div className={styles.productImage}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.productDetails}>
                      <h3>{product.name}</h3>
                      <p>Ціна: {product.price} грн</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
