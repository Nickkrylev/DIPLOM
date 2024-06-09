import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import css from './intro.module.css';

function Intro() {
  return (
    <div className={css.container}>
      <Carousel
        showArrows={true}
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        className={css.carousel}
      >
        <div>
          <img src="../../../img/mainPage/intro3.webp" alt="Костюми" />
        </div>
        <div>
          <img src="../../../img/mainPage/intro1.jpg" alt="Друге зображення" />
        </div>
        <div>
          <img src="../../../img/mainPage/intro2.webp" alt="Третє зображення" />
        </div>
      </Carousel>
      <div className={css.description}>
        <h1>ForUtoU — МАРКЕТПЛЕЙС УКРАЇНСЬКИХ БРЕНДІВ</h1>
        <div className={css.buttons}>
          <button className={css.button}>ЖІНКАМ</button>
          <button className={css.button}>ЧОЛОВІКАМ</button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
