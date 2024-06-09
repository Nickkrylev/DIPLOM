// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./page/Admin"
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Registration from './components/Registration/Registration';
import Basket from './components/Basket/Basket';
import Chose from './components/Chose/Chose';
import MainPage from './page/mainPage/mainPage';
import Footer from './components/Footer/Footer';
import Product from './components/Product/Product';
import AllProductForAnimal from './page/AllProductForAnimal';
import AllProductForDecor from './page/AllProductForDecor';
import AllProductForMen from './page/AllProductForMen';
import AllProductForGifs from './page/AllProductForGifs';
import AllProductForWoman from './page/AllProductForWoman';
import AllProductForCosmetic from './page/AllProductForCosmetic';
import MainOrder from "./components/MainOrder/MainOrder"
import ProductElemPage from './components/ProductElemPage/ProductElemPage';
import { BasketProvider } from './components/BasketContent/BasketContent';
import AccountPage from './page/AccountPage';
import BuyerPanel from './components/BuyerPanel/BuyerPanel';

import './App.css';
import LoginSeller from './components/LoginSeller/LoginSeller';

function App() {
  return (
    <BasketProvider>
      <Router>
      <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin:id" element={<Admin />} />
          </Routes>
        <Header />
        <div className="App">
          <Routes>AccountPage

            <Route path="/" element={<MainPage />} />
            <Route path="/account/:id" element={<AccountPage />} />
            <Route path="/product/women" element={< AllProductForWoman/>} />
            <Route path="/product/women/:id" element={<ProductElemPage />} />
            <Route path="/product/:id" element={<ProductElemPage />} />
            <Route path="/favorite" element={<Chose />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/order" element={<MainOrder />} />
            <Route path="/seller/:id" element={<BuyerPanel />} />
            <Route path="/seller" element={<LoginSeller />} />
           
            
          </Routes>
          
        </div>
        <Footer />
        
      </Router>
    </BasketProvider>
  );
}

export default App;
