import React, { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = sessionStorage.getItem('basketItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('basketItems', JSON.stringify(items));
  }, [items]);

  const handleIncrease = (id, size, stock) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size && item.quantity < stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id, size) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id, size) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));
  };

  const handleQuantityChange = (id, size, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getItemCount = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };

  const addItem = (newItem) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id && item.size === newItem.size);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  return (
    <BasketContext.Provider value={{ items, handleIncrease, handleDecrease, handleDelete, handleQuantityChange, getItemCount, addItem }}>
      {children}
    </BasketContext.Provider>
  );
};
