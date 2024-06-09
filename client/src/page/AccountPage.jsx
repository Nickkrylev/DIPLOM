import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PurchaseHistory from '../components/PurchaseHistory/PurchaseHistory';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import AccountForm from '../components/AcountForm/AcountForm';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('МОЇ ДАНІ');
  const [user, setUser] = useState({
    firstName: 'Микита',
    lastName: 'Крилев',
    phone: '',
    email: 'mikita.krylev@gmail.com'
  });
  const [orders, setOrders] = useState([
    {
      date: '2024-06-01',
      status: 'Доставлено',
      products: [
        {
          name: 'Продукт 1',
          price: 200,
          image: 'path/to/image1.jpg',
        },
        {
          name: 'Продукт 2',
          price: 300,
          image: 'path/to/image2.jpg',
        },
      ],
    },
    {
      date: '2024-05-20',
      status: 'В очікуванні',
      products: [
        {
          name: 'Продукт 3',
          price: 400,
          image: 'path/to/image3.jpg',
        },
      ],
    },
    // Add more orders here
  ]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'МОЇ ДАНІ':
        return <AccountForm user={user} setUser={setUser} />;
      case 'ІСТОРІЯ ПОКУПОК':
        return <PurchaseHistory orders={orders} />;
      case 'ЗМІНИТИ ПАРОЛЬ':
        return <ChangePassword />;
      case 'ВИХІД':
        handleLogout();
        break;
      default:
        return <div>Виберіть розділ</div>;
    }
  };

  return (
    <div className={styles.accountPage}>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setCurrentView('МОЇ ДАНІ')}>МОЇ ДАНІ</li>
          <li onClick={() => setCurrentView('ОБРАНІ ТОВАРИ')}>ОБРАНІ ТОВАРИ</li>
          <li onClick={() => setCurrentView('ІСТОРІЯ ПОКУПОК')}>ІСТОРІЯ ПОКУПОК</li>
          <li onClick={() => setCurrentView('ЗМІНИТИ ПАРОЛЬ')}>ЗМІНИТИ ПАРОЛЬ</li>
          <li onClick={() => setCurrentView('ВИХІД')}>ВИХІД</li>
        </ul>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountPage;
