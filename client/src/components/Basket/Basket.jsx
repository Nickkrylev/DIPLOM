import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Basket.module.css';
import { BasketContext } from '../BasketContent/BasketContent';

const BasketItem = ({ item, onIncrease, onDecrease, onDelete, onQuantityChange }) => (
  <div className={style.basketItem}>
    <div className={style.basketItemElem}>
      <img src={item.img} alt={item.name} className={style.itemImage} />
      <div className={style.itemDetails}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Ціна: {item.price} ₴</p>
        <p>Продавець: {item.seller}</p>
        <p>Розмір: {item.size}</p>
        <p>Колір: {item.color}</p>
      </div>
    </div>
    <div className={style.basketItemElemCount}>
      <div className={style.basketItemElem}>
        <div className={style.itemActions}>
          <button className={style.quantityBtn} onClick={() => onDecrease(item.id, item.size)} disabled={item.quantity === 1}>-</button>
          <input 
            type="number" 
            value={item.quantity} 
            className={style.quantityInput} 
            onChange={(e) => onQuantityChange(item.id, item.size, parseInt(e.target.value))} 
            min="1" 
            max={item.stock} 
          />
          <button className={style.quantityBtn} onClick={() => onIncrease(item.id, item.size, item.stock)} disabled={item.quantity >= item.stock}>+</button>
        </div>
        <div className={style.itemPrice}>
          {item.price * item.quantity} ₴
        </div>
      </div>
      <div className={style.itemOptions}>
        <button className={style.deleteBtn} onClick={() => onDelete(item.id, item.size)}>Видалити <img src="../../../public/img/trash.png" className={style.icon} alt="Delete" /></button>
        <button className={style.saveBtn}>Відклаcти <img src="../../../public/img/heart-black.png" className={style.icon} alt="Favorites" /></button>
      </div>
    </div>
  </div>
);

const Basket = () => {
  const { items, handleIncrease, handleDecrease, handleDelete, handleQuantityChange } = useContext(BasketContext);
  const navigate = useNavigate();
  console.log(items);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    const formContainer = document.querySelector(`.${style.formContainer}`);
    const formBackground = document.querySelector(`.${style.formBackground}`);
    formContainer.classList.add(style.hidden);
    formBackground.classList.add(style.hidden);

    setTimeout(() => {
      setIsOpen(false);
    }, 500); // Match the transition duration
  };

  const handleBackgroundClick = (e) => {
    if (e.target.className.includes('formBackground')) {
      closeModal();
    }
  };

  const handleCheckout = () => {
    navigate('/order');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.formBackground} onClick={handleBackgroundClick}>
      <div className={style.formContainer}>
        <button className={style.closeButton} onClick={closeModal}>✕</button>
        <div className={style.basket}>
          <h2 className={style.title}>ВАШ КОШИК</h2>
          <div className={style.basketItemElemContainer}>
            <div className={`${style.BasketItemContainer} ${items.length > 2 ? style.scrollable : ''}`}>
              {items.map((item, index) => (
                <BasketItem
                  key={index}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <div className={style.BasketItemContainer}>
              <div className={style.summary}>
                <p>Знижка: 0 ₴</p>
                <h3>ЗАГАЛОМ: {total} ₴</h3>
              </div>
              <div className={style.actions}>
                <Link to="/">
                  <button className={style.continueBtn}>ПРОДОВЖИТИ ПОКУПКИ</button>
                </Link>
                <button className={style.checkoutBtn} onClick={handleCheckout}>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
