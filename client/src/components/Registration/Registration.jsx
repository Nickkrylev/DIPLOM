import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addClient } from '../../services/clientServices';
import style from './Registration.module.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Поле не може бути пустим'),
  lastName: Yup.string().required('Поле не може бути пустим'),
  phoneNumber: Yup.string().required('Поле не може бути пустим'),
  email: Yup.string().email('Невірний емейл').required('Поле не може бути пустим'),
  password: Yup.string().min(6, 'Пароль має бути більше 6 символів').required('Поле не може бути пустим'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролі мають співпадати').required('Поле не може бути пустим'),
  terms: Yup.bool().oneOf([true], 'Потрібно погодитись з правилами '),
});

function Registration() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await addClient({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        hashed_password: values.password,
        phoneNumber: values.phoneNumber,
      });
      alert('Реєстрація успішна');
    } catch (error) {
      console.error('Error adding client:', error);
     
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={style.formBackground}>
      <div className={style.formContainer}>
        <h2 className={style.title}>РЕЄСТРАЦІЯ</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            newsletter: false,
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={style.form}>
              <div className={style.row}>
                <div className={style.inputGroup}>
                  <Field name="firstName" type="text" placeholder="Ім'я" className={style.input} />
                  <ErrorMessage name="firstName" component="div" className={style.error} />
                </div>
                <div className={style.inputGroup}>
                  <Field name="lastName" type="text" placeholder="Прізвище" className={style.input} />
                  <ErrorMessage name="lastName" component="div" className={style.error} />
                </div>
              </div>
              <div className={style.row}>
                <div className={style.inputGroup}>
                  <Field name="phoneNumber" type="text" placeholder="Номер телефону" className={style.input} />
                  <ErrorMessage name="phoneNumber" component="div" className={style.error} />
                </div>
                <div className={style.inputGroup}>
                  <Field name="email" type="email" placeholder="Email" className={style.input} />
                  <ErrorMessage name="email" component="div" className={style.error} />
                </div>
              </div>
            
              <div className={style.row}>
                <div className={style.inputGroup}>
                  <Field name="password" type="password" placeholder="Пароль" className={style.input} />
                  <ErrorMessage name="password" component="div" className={style.error} />
                </div>
                <div className={style.inputGroup}>
                  <Field name="confirmPassword" type="password" placeholder="Підтвердження паролю" className={style.input} />
                  <ErrorMessage name="confirmPassword" component="div" className={style.error} />
                </div>
              </div>
              <div className={style.checkboxGroup}>
                <div>
                  <Field type="checkbox" name="newsletter" />
                  <label className={style.checkboxLabel}>Підписатись на розсилку</label>
                </div>
                <div>
                  <Field type="checkbox" name="terms" />
                  <label className={style.checkboxLabel}>Я погоджуюсь з <a href="#privacy">політикою конфіденційності</a> сайту </label>
                  <ErrorMessage name="terms" component="div" className={style.error} />
                </div>
              </div>
              <button type="submit" className={style.submitButton} disabled={isSubmitting}>РЕЄСТРАЦІЯ</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
