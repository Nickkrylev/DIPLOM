import React from 'react';
import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.left}>
        УСІ ПРАВА ЗАХИЩЕНІ ©2024 ForUtoU.UA
      </div>
      <div className={css.right}>
        РОЗРОБКА ТА ПІДТРИМКА: Denis Khorunzhyi
      </div>
    </footer>
  );
}

export default Footer;
