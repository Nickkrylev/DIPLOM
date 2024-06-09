import React, { useState, useEffect } from 'react';
import style from './AdminPanel.module.css';
import axios from 'axios';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AdminPanel() {
  const [view, setView] = useState('home');
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [editSeller, setEditSeller] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);

  useEffect(() => {
    if (view === 'viewSellers') {
      fetchSellers();
    } else if (view === 'viewProducts') {
      fetchProducts();
    } else if (view === 'createAdmin' || view === 'viewAdmins') {
      fetchCompanies();
      fetchAdmins();
    }
  }, [view]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/sellers');
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/sellers');
      const options = response.data.map(company => ({
        value: company.id,
        label: company.name_company
      }));
      setCompanies(options);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/seller-admins');
      setAdmins(response.data);
      setFilteredAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleFilterChange = (selectedOption) => {
    if (selectedOption) {
      setFilteredAdmins(admins.filter(admin => admin.company_id === selectedOption.value));
    } else {
      setFilteredAdmins(admins);
    }
  };

  const handleCreateSeller = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:5050/api/sellers', values);
      alert('Seller created successfully');
      resetForm();
      setView('viewSellers'); // Refresh seller list
    } catch (error) {
      console.error('Error creating seller:', error);
      alert('Failed to create seller');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAdmin = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:5050/api/seller-admins', values);
      alert('Seller Admin created successfully');
      resetForm();
      setView('home'); // Go back to home or any other view you prefer
    } catch (error) {
      console.error('Error creating seller admin:', error);
      alert('Failed to create seller admin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSeller = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:5050/api/sellers/${values.id}`, values);
      alert('Seller updated successfully');
      setEditSeller(null);
      setView('viewSellers'); // Refresh seller list
    } catch (error) {
      console.error('Error updating seller:', error);
      alert('Failed to update seller');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSeller = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/sellers/${id}`);
      alert('Seller deleted successfully');
      setView('viewSellers'); // Refresh seller list
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert('Failed to delete seller');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/products/${id}`);
      alert('Product deleted successfully');
      setView('viewProducts'); // Refresh product list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleEditClick = (seller) => {
    setEditSeller(seller);
    setView('editSeller');
  };

  const handleEditAdminClick = (admin) => {
    setEditAdmin(admin);
    setView('editAdmin');
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/seller-admins/${id}`);
      alert('Admin deleted successfully');
      setView('viewAdmins'); // Refresh admin list
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Failed to delete admin');
    }
  };

  const handleEditAdmin = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:5050/api/seller-admins/${values.id}`, values);
      alert('Admin updated successfully');
      setEditAdmin(null);
      setView('viewAdmins'); // Refresh admin list
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Failed to update admin');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchemaSeller = Yup.object({
    name_company: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    telephone: Yup.string().required('Required')
  });

  const validationSchemaAdmin = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    hashed_password: Yup.string().required('Required'),
    company_id: Yup.string().required('Required')
  });

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <ul>
          <li><a href="#home" onClick={() => setView('home')}>Головна</a></li>
          <li><a href="#createSeller" onClick={() => setView('createSeller')}>Створити нового продавця</a></li>
          <li><a href="#createAdmin" onClick={() => setView('createAdmin')}>Створити адміністратора компанії</a></li>
          <li><a href="#viewSellers" onClick={() => setView('viewSellers')}>Переглянути всіх продавців</a></li>
          <li><a href="#viewProducts" onClick={() => setView('viewProducts')}>Перегляд товару</a></li>
          <li><a href="#viewAdmins" onClick={() => setView('viewAdmins')}>Переглянути всіх адміністраторів</a></li>
        </ul>
      </div>
      <div className={style.content}>
        {view === 'home' && <h2>Вітаємо в адмін-панелі</h2>}

        {view === 'createSeller' && (
          <div>
            <h2>Створити нового продавця</h2>
            <Formik
              initialValues={{ name_company: '', email: '', telephone: '' }}
              validationSchema={validationSchemaSeller}
              onSubmit={handleCreateSeller}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={style.formGroup}>
                    <label>Назва компанії</label>
                    <Field type="text" name="name_company" />
                    <ErrorMessage name="name_company" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Телефон</label>
                    <Field type="text" name="telephone" />
                    <ErrorMessage name="telephone" component="div" className={style.error} />
                  </div>
                  <button type="submit" className={style.button} disabled={isSubmitting}>Створити продавця</button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {view === 'createAdmin' && (
          <div>
            <h2>Створити адміністратора компанії</h2>
            <Formik
              initialValues={{ username: '', email: '', hashed_password: '', company_id: '' }}
              validationSchema={validationSchemaAdmin}
              onSubmit={handleCreateAdmin}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className={style.formGroup}>
                    <label>Ім'я користувача</label>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Пароль</label>
                    <Field type="password" name="hashed_password" />
                    <ErrorMessage name="hashed_password" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Компанія</label>
                    <Select
                      options={companies}
                      onChange={(option) => setFieldValue('company_id', option.value)}
                      placeholder="Виберіть компанію"
                    />
                    <ErrorMessage name="company_id" component="div" className={style.error} />
                  </div>
                  <button type="submit" className={style.button} disabled={isSubmitting}>Створити адміністратора</button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {view === 'editSeller' && (
          <div>
            <h2>Редагувати продавця</h2>
            <Formik
              initialValues={{ ...editSeller }}
              validationSchema={validationSchemaSeller}
              onSubmit={handleEditSeller}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={style.formGroup}>
                    <label>Назва компанії</label>
                    <Field type="text" name="name_company" />
                    <ErrorMessage name="name_company" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Телефон</label>
                    <Field type="text" name="telephone" />
                    <ErrorMessage name="telephone" component="div" className={style.error} />
                  </div>
                  <button type="submit" className={style.button} disabled={isSubmitting}>Оновити продавця</button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {view === 'editAdmin' && (
          <div>
            <h2>Редагувати адміністратора</h2>
            <Formik
              initialValues={{ ...editAdmin }}
              validationSchema={validationSchemaAdmin}
              onSubmit={handleEditAdmin}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className={style.formGroup}>
                    <label>Ім'я користувача</label>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Пароль</label>
                    <Field type="password" name="hashed_password" />
                    <ErrorMessage name="hashed_password" component="div" className={style.error} />
                  </div>
                  <div className={style.formGroup}>
                    <label>Компанія</label>
                    <Select
                      options={companies}
                      onChange={(option) => setFieldValue('company_id', option.value)}
                      value={companies.find(company => company.value === editAdmin.company_id)}
                      placeholder="Виберіть компанію"
                    />
                    <ErrorMessage name="company_id" component="div" className={style.error} />
                  </div>
                  <button type="submit" className={style.button} disabled={isSubmitting}>Оновити адміністратора</button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {view === 'viewSellers' && (
          <div>
            <h2>Переглянути всіх продавців</h2>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Назва компанії</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>{seller.name_company}</td>
                    <td>{seller.email}</td>
                    <td>{seller.telephone}</td>
                    <td>
                      <button onClick={() => handleEditClick(seller)}>
                        <img src="../../../public/img/edit" alt="Edit" />
                      </button>
                      <button onClick={() => handleDeleteSeller(seller.id)}>
                        <img src="../../../public/img/trash.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'viewProducts' && (
          <div>
            <h2>Перегляд товару</h2>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Назва</th>
                  <th>Опис</th>
                  <th>Ціна</th>
                  <th>Зображення</th>
                  <th>Продавець</th>
                  <th>Категорія</th>
                  <th>Для кого</th>
                  <th>Колір</th>
                  <th>Дата створення</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price} ₴</td>
                    <td><img src={product.img} alt={product.name} className={style.productImg} /></td>
                    <td>{product.sellerName}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.forState}</td>
                    <td>{product.color}</td>
                    <td>{product.created_at}</td>
                    <td>
                      <button onClick={() => handleDeleteProduct(product.id)}>
                        <img src="../../../img/delete.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'viewAdmins' && (
          <div>
            <h2>Переглянути всіх адміністраторів</h2>
            <Select
              options={companies}
              onChange={handleFilterChange}
              placeholder="Фільтрувати за компанією"
              isClearable
            />
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Ім'я користувача</th>
                  <th>Email</th>
                  <th>Компанія</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.companyName}</td>
                    <td>
                      <button onClick={() => handleEditAdminClick(admin)}>
                        <img src="../../../img/edit.png" alt="Edit" />
                      </button>
                      <button onClick={() => handleDeleteAdmin(admin.id)}>
                        <img src="../../../img/trash.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
