import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clientLogEmail } from '../../services/clientServices';
import style from './LogIn.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Поле не може бути пустим'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Поле не може бути пустим'),
});

function LogIn() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    const formContainer = document.querySelector(`.${style.formContainer}`);
    const formBackground = document.querySelector(`.${style.formBackground}`);
    formContainer.classList.add(style.hidden);
    formBackground.classList.add(style.hidden);

    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 500);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.className.includes('formBackground')) {
      closeModal();
    }
  };

  const handleSubmit = async (values) => {
    try {
      const client = await clientLogEmail(values);
      if (client) {
        alert(client);
        console.log(client);
        // Save data to local storage
        sessionStorage.setItem('user', JSON.stringify({
          id:client.id,
          full_name: client.first_name + " " + client.last_name,
          email: client.email,
          isLoggedIn: true,
        }));
        navigate(`/account/${client.id}`); 
      }
    } catch (error) {
      alert('Невірний email або пароль');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.formBackground} onClick={handleBackgroundClick}>
      <div className={style.formContainer}>
        <button className={style.closeButton} onClick={closeModal}>✖</button>
        <h2 className={style.title}>Вхід</h2>
        <p className={style.subtitle}>Увійти до свого акаунту за допомогою електронної пошти</p>
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
              <div className={style.linkGroup}>
                <a href="#forgot-password" className={style.link}>Не пам'ятаю пароль</a>
                <Link to="/registration">
                  <span className={style.link}>У мене ще немає акаунта</span>
                </Link>
              </div>
              <button type="submit" className={style.submitButton}>Увійти</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LogIn;
