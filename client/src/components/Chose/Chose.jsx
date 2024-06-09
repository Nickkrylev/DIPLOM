import React, { useState } from 'react';
import style from './Chose.module.css';

const ChoseItem = ({ item, onView, onDelete }) => (
  <div className={style.choseItem}>
    <img src={item.image} alt={item.name} className={style.itemImage} />
    <div className={style.itemDetails}>
      <button className={style.deleteBtn} onClick={() => onDelete(item.id)}>✕</button>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Ціна: {item.price} ₴</p>
      <p>Розмір: {item.size}</p>
      <p>Колір: <span className={style.color} style={{ backgroundColor: item.colorCode }}></span> {item.color}</p>
      <button className={style.viewBtn} onClick={() => onView(item.id)}>ПЕРЕГЛЯНУТИ ТОВАР</button>
    </div>
  </div>
);

const Chose = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'LIMASO',
      description: 'Рушник у великодній кошик',
      price: 234,
      size: 'One size',
      color: 'білий',
      colorCode: '#ffffff',
      image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
    },
    {
      id: 2,
      name: 'ARTI',
      description: 'Піджак Wear him чорний',
      price: 6100,
      size: 'XS / S',
      color: 'чорний',
      colorCode: '#000000',
      image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
    },
    {
      id: 3,
      name: 'KERAMIKA-DEKOR',
      description: 'Ваза',
      price: 1600,
      size: 'One size',
      color: 'бежевий',
      colorCode: '#d3b383',
      image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
    },
    {
        id: 4,
        name: 'LIMASO',
        description: 'Рушник у великодній кошик',
        price: 234,
        size: 'One size',
        color: 'білий',
        colorCode: '#ffffff',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
      },
      {
        id: 5,
        name: 'ARTI',
        description: 'Піджак Wear him чорний',
        price: 6100,
        size: 'XS / S',
        color: 'чорний',
        colorCode: '#000000',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
      },
      {
        id: 6,
        name: 'KERAMIKA-DEKOR',
        description: 'Ваза',
        price: 1600,
        size: 'One size',
        color: 'бежевий',
        colorCode: '#d3b383',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/hoossa7ico3z1-UA/image;s=1416x1062'
      }
  ]);

  const handleView = (id) => {
    // Handle view item logic here
    console.log(`View item ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete item logic here
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className={style.choseContainer}>
      <h2>ОБРАНІ ТОВАРИ</h2>
      <div className={style.itemsContainer}>
        {items.map((item) => (
          <ChoseItem
            key={item.id}
            item={item}
            onView={handleView}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Chose;
