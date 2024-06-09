import React, { useState, useEffect } from 'react';
import style from './BuyerPanel.module.css';
import axios from 'axios';
import AddProduct from '../AddProduct/AddProduc';

function BuyerPanel() {
  const [view, setView] = useState('home');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    if (view === 'viewOrders') {
      fetchOrders();
    } else if (view === 'viewProducts') {
      fetchProducts();
    }
  }, [view]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  const handleOrderStatusChange = (e) => {
    const { name, value } = e.target;
    setEditOrder({ ...editOrder, [name]: value });
  };

  const handleEditOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5050/api/orders/${editOrder.id}`, editOrder);
      alert('Order status updated successfully');
      setEditOrder(null);
      setView('viewOrders'); // Refresh order list
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/orders/${id}`);
      alert('Order deleted successfully');
      setView('viewOrders'); // Refresh order list
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
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

  const handleEditClick = (order) => {
    setEditOrder(order);
    setView('editOrder');
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <ul>
          <li><a href="#home" onClick={() => setView('home')}>Головна</a></li>
          <li><a href="#viewOrders" onClick={() => setView('viewOrders')}>Переглянути всі замовлення</a></li>
          <li><a href="#viewProducts" onClick={() => setView('viewProducts')}>Перегляд товару</a></li>
          <li><a href="#addProduct" onClick={() => setView('addProduct')}>Добавити товар</a></li>
        </ul>
      </div>
      <div className={style.content}>
        {view === 'home' && <h2>Вітаємо в панелі продавця</h2>}

        {view === 'editOrder' && (
          <div>
            <h2>Редагувати замовлення</h2>
            <form onSubmit={handleEditOrder}>
              <div className={style.formGroup}>
                <label>Статус</label>
                <select name="status" value={editOrder.status} onChange={handleOrderStatusChange}>
                  <option value="cancel">Cancel</option>
                  <option value="confirm">Confirm</option>
                  <option value="wait">Wait</option>
                  <option value="wait delivery">Wait Delivery</option>
                </select>
              </div>
              <button type="submit" className={style.button}>Оновити замовлення</button>
            </form>
          </div>
        )}

        {view === 'viewOrders' && (
          <div>
            <h2>Переглянути всі замовлення</h2>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID покупця</th>
                  <th>Дата замовлення</th>
                  <th>Статус</th>
                  <th>Опис доставки</th>
                  <th>Загальна сума</th>
                  <th>Товари</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.client_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.status}</td>
                    <td>{order.description_delivery}</td>
                    <td>{order.total_amount} ₴</td>
                    <td>
                      <ul>
                        {order.items && order.items.map(item => (
                          <li key={item.id}>{item.product_name} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(order)}>
                        <img src="../../../public/img/edit.png" alt="Edit" />
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
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
                  
                  <th>Для кого</th>
               
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
              
                    <td>{product.forState}</td>
               
                    <td>{product.created_at}</td>
                    <td>
                      <button onClick={() => handleDeleteProduct(product.id)}>
                        <img src="../../../public/img/trash.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'addProduct' && <AddProduct setView={setView} />}
      </div>
    </div>
  );
}

export default BuyerPanel;
