import React from 'react';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = ({ orderDetails }) => {
  return (
    <div className={styles.orderConfirmation}>
      <h2>Order Confirmation</h2>
      <div>
        <strong>Email:</strong> {orderDetails.email}
      </div>
      <div>
        <strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}
      </div>
      <div>
        <strong>Items:</strong>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>{item.name} - {item.price}₴</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Total:</strong> {orderDetails.total}₴
      </div>
    </div>
  );
};

export default OrderConfirmation;
