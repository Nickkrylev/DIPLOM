import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { sellerLogEmail } from '../../services/sellerServices.js'; // Ensure this is correctly imported
import style from './LoginSeller.module.css'; // Ensure you have a corresponding CSS file

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Поле не може бути пустим'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Поле не може бути пустим'),
});

function LoginSeller() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (values) => {
    try {
      const seller = await sellerLogEmail(values);
      if (seller) {
        alert('Login successful');
        console.log(seller);
        // Save data to session storage
        sessionStorage.setItem('seller', JSON.stringify({
          id: seller.id,
          full_name: seller.first_name + " " + seller.last_name,
          email: seller.email,
          isLoggedIn: true,
        }));
        navigate(`/seller/${seller.id}`);
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
        <h2 className={style.title}>Вхід Продавець</h2>
        <p className={style.subtitle}>Увійти до панелі продавця</p>
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

export default LoginSeller;
