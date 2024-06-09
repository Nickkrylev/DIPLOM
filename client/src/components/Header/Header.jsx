import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { BasketContext } from '../BasketContent/BasketContent';
import { searchProducts } from '../../services/productServices';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { items } = useContext(BasketContext);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleProductClick = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          const results = await searchProducts(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const { full_name: fullName, isLoggedIn, id: userId } = user;

  return (
    <div className={style.mainContainer}>
      <header className={style.header}>
        <div className={style.container}>
          <a href="mailto:support@suport.ua" className={style.email}>support@suport.ua</a>
          <Link to="/">
            <div className={style.logo}>ForUtoU</div>
          </Link>
          <div className={style.rightSection}>
            <div className={style.userInfo}>
              {isLoggedIn ? (
                <Link to={`/account/${userId}`} className={style.userLink}>
                  <img src="../../../img/avatar.png" className={style.icon} alt="User" />
                  <span className={style.userFullName}>{fullName}</span>
                </Link>
              ) : (
                <Link to="/login">
                  <img src="../../../img/avatar.png" className={style.icon} alt="User" />
                </Link>
              )}
              <img
                src="../../../img/search.png"
                className={style.icon}
                alt="Search"
                onClick={handleSearchClick}
                style={{ cursor: 'pointer' }}
              />
              <Link to="/favorite">
                <img src="../../../img/heart.png" className={style.icon} alt="Favorites" />
              </Link>
              <Link to="/basket" className={style.basketLink}>
                <img src="../../../img/basket.png" className={style.icon} alt="Cart" />
                <span className={style.itemCount}>{itemCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <nav className={style.nav}>
        <ul className={style.navList}>
          <li className={style.navItem}><Link to="/product/women" className={style.navLink}>ЖІНКАМ</Link></li>
          <li className={style.navItem}><Link to="/product/men" className={style.navLink}>ЧОЛОВІКАМ</Link></li>
          <li className={style.navItem}><Link to="/product/decor" className={style.navLink}>ДІМ ТА ДЕКОР</Link></li>
          <li className={style.navItem}><Link to="/product/cosmetic" className={style.navLink}>КОСМЕТИКА</Link></li>
          <li className={style.navItem}><Link to="/product/gifs" className={style.navLink}>ПОДАРУНКИ</Link></li>
          <li className={style.navItem}><Link to="/product/animal" className={style.navLink}>ТВАРИНИ</Link></li>
        </ul>
      </nav>
      {showSearch && (
        <div className={style.searchContainer}>
          <input
            type="text"
            className={style.searchInput}
            placeholder="Пошук..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={style.searchResults}>
            {searchResults.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} onClick={handleProductClick}>
                <div className={style.searchResultItem}>
                  <img src={product.img} alt={product.name} className={style.searchResultImage} />
                  <div className={style.searchResultDetails}>
                    <h2>{product.name}</h2>
                    <p>{product.price} ₴</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
