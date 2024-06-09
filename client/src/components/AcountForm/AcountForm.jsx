import React from 'react';
import { useFormik } from 'formik';
import styles from './AcountForm.module.css';

const AccountForm = ({ user, setUser }) => {
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      email: user.email || ''
    },
    onSubmit: values => {
      setUser(values);
      alert('Профіль оновлено!');
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">Ім’я</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Прізвище</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className={styles.aboutSection}>
        <label>ДЕЩО ПРО МЕНЕ</label>
        <p>
          Розкажіть нам про себе, щоб ми могли підібрати для вас кращі товари та пропозиції.
        </p>
      </div>
      <button type="submit" className={styles.updateButton}>
        ОНОВИТИ ПРОФІЛЬ
      </button>
    </form>
  );
};

export default AccountForm;
