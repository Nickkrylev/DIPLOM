import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './ChangePassword.module.css';

const ChangePasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Обов\'язкове поле'),
      newPassword: Yup.string()
        .min(8, 'Пароль повинен бути не менше 8 символів')
        .required('Обов\'язкове поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Паролі повинні співпадати')
        .required('Обов\'язкове поле'),
    }),
    onSubmit: values => {
      alert('Пароль змінено!');
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="oldPassword">Старий пароль</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.oldPassword && formik.errors.oldPassword ? (
          <div className={styles.error}>{formik.errors.oldPassword}</div>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="newPassword">Пароль</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className={styles.error}>{formik.errors.newPassword}</div>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Підтвердження паролю</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={styles.error}>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <div className={styles.forgotPassword}>
        <a href="#">Не пам'ятаю пароль</a>
      </div>
      <button type="submit" className={styles.submitButton}>
        ЗБЕРЕГТИ
      </button>
    </form>
  );
};

export default ChangePasswordForm;
