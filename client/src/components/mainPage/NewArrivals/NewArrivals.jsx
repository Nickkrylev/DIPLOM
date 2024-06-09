import React from 'react';
import css from './NewArrivals.module.css'; // Ensure you have the appropriate CSS for styling

function NewArrivals() {
  return (
    <div className={css.container}>
      <h1>КАТЕГОРІЇ ТОВАРУ</h1>
      <p>Обирайте товари від українських брендів, аби потішити себе та рідних</p>
      <div className={css.products}>
        <div className={css.product}>
          <img src="../../../img/mainPage/pForGirl.webp" alt="ЖІНКАМ" />
          <p>ЖІНКАМ</p>
        </div>
        <div className={css.product}>
          <img src="../../../img/mainPage/pForMen.webp" alt="ЧОЛОВІКАМ" />
          <p>ЧОЛОВІКАМ</p>
        </div>
        <div className={css.product}>
          <img src="../../../img/mainPage/pForDecor.webp" alt="ДІМ ТА ДЕКОР" />
          <p>ДІМ ТА ДЕКОР</p>
        </div>
        <div className={css.product}>
          <img src="../../../img/mainPage/pForCosmetics.webp" alt="КОСМЕТИКА" />
          <p>КОСМЕТИКА</p>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
