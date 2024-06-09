import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLogEmail } from '../../services/AdminServices';
import style from './AdminEnter.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Поле не може бути пустим'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Поле не може бути пустим'),
});

function AdminEnter() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (values) => {
    try {
      const admin = await adminLogEmail(values);
      if (admin) {
        alert(admin);
        console.log(admin);
        // Save data to session storage
        sessionStorage.setItem('admin', JSON.stringify({
          id: admin.id,
          full_name: admin.first_name + " " + admin.last_name,
          email: admin.email,
          isLoggedIn: true,
        }));
        navigate(`/admin/`);
      }
    } catch (error) {
      alert('Невірний email або пароль');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.formBackground}>
      <div className={style.formContainer}>
        <h2 className={style.title}>Вхід Aдмін</h2>
        <p className={style.subtitle}>Увійти до адмінськогої панелі </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={style.form}>
              <div className={style.inputGroup}>
                <Field name="email" type="email" placeholder="Email" className={style.input} />
                <ErrorMessage name="email" component="div" className={style.error} />
              </div>
              <div className={style.inputGroup}>
                <Field name="password" type="password" placeholder="Пароль" className={style.input} />
                <ErrorMessage name="password" component="div" className={style.error} />
              </div>
            
              <button type="submit" className={style.submitButton}>Увійти</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminEnter;
