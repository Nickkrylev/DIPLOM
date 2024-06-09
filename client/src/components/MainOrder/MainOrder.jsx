import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './MainOrder.module.css';

const validationSchema = Yup.object({
  email: Yup.string().email('Неправильний формат email').required('Обов\'язкове поле'),
  firstName: Yup.string().required('Обов\'язкове поле'),
  lastName: Yup.string().required('Обов\'язкове поле'),
  phone: Yup.string().required('Обов\'язкове поле'),
  city: Yup.string().required('Обов\'язкове поле'),
  paymentMethod: Yup.string().required('Оберіть спосіб оплати'),
});

const OrderForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        paymentMethod: '',
        addCertificate: false,
        addPromoCode: false,
        receiverIsDifferent: false,
        callForDetails: false,
        total: 1500,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
    >
      {({ values }) => (
        <Form className={styles.formContainer}>
          <h2>КОНТАКТНА ІНФОРМАЦІЯ</h2>
          <div>
            <Field type="email" name="email" placeholder="Email" className={styles.inputField} />
            <ErrorMessage name="email" component="div" className={styles.errorMessage} />
          </div>
          <div>
            <Field type="text" name="firstName" placeholder="Ім'я" className={styles.inputField} />
            <ErrorMessage name="firstName" component="div" className={styles.errorMessage} />
          </div>
          <div>
            <Field type="text" name="lastName" placeholder="Прізвище" className={styles.inputField} />
            <ErrorMessage name="lastName" component="div" className={styles.errorMessage} />
          </div>
          <div>
            <Field type="tel" name="phone" placeholder="Телефон" className={styles.inputField} />
            <ErrorMessage name="phone" component="div" className={styles.errorMessage} />
          </div>
          <h2>ДОСТАВКА</h2>
          <div>
            <Field type="text" name="city" placeholder="Напишіть ваші Номер Нової пошти, та адресу" className={styles.inputField} />
            <ErrorMessage name="city" component="div" className={styles.errorMessage} />
          </div>
          <h2>СПОСІБ ОПЛАТИ</h2>
          <div>
            <label>
              <Field type="radio" name="paymentMethod" value="card" className={styles.radioInput} />
              Карткою на сайті
            </label>
          </div>
          <div>
            <label>
              <Field type="radio" name="paymentMethod" value="onDelivery" className={styles.radioInput} />
              При отриманні замовлення (вартість післяплати оплачується окремо, за тарифами перевізника)
            </label>
          </div>
          
          <div>
            <label>
              <Field type="checkbox" name="callForDetails" className={styles.checkboxInput} />
              Передзвонити мені для уточнення деталей
            </label>
          </div>
          <div>
            <p>Доставка: За тарифами перевізника</p>
            <p>Знижка: 0 ₴</p>
            <p>ЗАГАЛОМ: {values.total} ₴</p>
          </div>
          <button type="submit" className={styles.submitButton}>ЗАМОВИТИ</button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
