import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './AddProduct.module.css';
import axios from 'axios';

const AddProduct = ({ setView }) => {
  const { id: manufactionId } = useParams();
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    img: '',
    category_id: '',
    forState: '',
    color: '',
  });
  const [photos, setPhotos] = useState(['']);
  const [sizes, setSizes] = useState([{ size: '', quantity: '' }]);
  const [productId, setProductId] = useState(null);
  const [productImageId, setProductImageId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, '']);
  };

  const handlePhotoChange = (index, value) => {
    const newPhotos = [...photos];
    newPhotos[index] = value;
    setPhotos(newPhotos);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: '', quantity: '' }]);
  };

  const handleSizeChange = (index, name, value) => {
    const newSizes = [...sizes];
    newSizes[index][name] = value;
    setSizes(newSizes);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = { ...newProduct, manufaction: manufactionId };
      const response = await axios.post('http://localhost:5050/api/products', productData);
      setProductId(response.data.id);
      alert('Product created successfully, proceed to add sizes and photos');
      
      const productImageResponse = await axios.post('http://localhost:5050/api/product-images', {
        product_id: response.data.id,
        photo_description: newProduct.name
      });
      setProductImageId(productImageResponse.data.id);
      alert('Product image created successfully, proceed to add sizes and photos');
    } catch (error) {
      console.error('Error creating product or product image:', error);
      alert('Failed to create product or product image');
    }
  };

  const handleAddSizes = async () => {
    try {
      for (const size of sizes) {
        await axios.post('http://localhost:5050/api/product_items', { ...size, product_id: productId });
      }
      alert('Sizes added successfully');
    } catch (error) {
      console.error('Error adding sizes:', error);
      alert('Failed to add sizes');
    }
  };

  const handleAddPhotos = async () => {
    try {
      for (const photo of photos) {
        await axios.post('http://localhost:5050/api/product-image-items', {
          img: photo,
          product_image_id: productImageId
        });
      }
      alert('Photos added successfully');
      setView('viewProducts'); // Refresh product list
    } catch (error) {
      console.error('Error adding photos:', error);
      alert('Failed to add photos');
    }
  };

  return (
    <div>
      <h2>Добавити товар</h2>
      <form onSubmit={handleCreateProduct}>
        <div className={style.formGroup}>
          <label>Артикул товару</label>
          <input type="text" name="id" value={newProduct.id} onChange={handleInputChange} />
        </div>
        <div className={style.formGroup}>
          <label>Назва</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
        </div>
        <div className={style.formGroup}>
          <label>Опис</label>
          <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
        </div>
        <div className={style.formGroup}>
          <label>Ціна</label>
          <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleInputChange} />
        </div>
        <div className={style.formGroup}>
          <label>Зображення (URL)</label>
          <input type="text" name="img" value={newProduct.img} onChange={handleInputChange} />
        </div>
        <div className={style.formGroup}>
          <label>Категорія</label>
          <select name="category_id" value={newProduct.category_id} onChange={handleInputChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <label>Для кого</label>
          <select name="forState" value={newProduct.forState} onChange={handleInputChange}>
            <option value="man">Чоловіки</option>
            <option value="women">Жінки</option>
            <option value="unisex">Унісекс</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label>Колір</label>
          <input type="text" name="color" value={newProduct.color} onChange={handleInputChange} />
        </div>
        <button type="submit" className={style.button}>Додати товар</button>
      </form>

      {productId && (
        <div>
          <h3>Додати розміри</h3>
          <div className={style.formGroup}>
            {sizes.map((size, index) => (
              <div key={index} className={style.sizeGroup}>
                <input
                  type="text"
                  placeholder="Розмір"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Кількість"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddSize} className={style.button}>Додати розмір</button>
            <button type="button" onClick={handleAddSizes} className={style.button}>Зберегти розміри</button>
          </div>

          <h3>Додати зображення</h3>
          <div className={style.formGroup}>
            {photos.map((photo, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => handlePhotoChange(index, e.target.value)}
                />
              </div>
            ))}
            {photos.length < 5 && (
              <button type="button" onClick={handleAddPhoto} className={style.button}>Додати фото</button>
            )}
            <button type="button" onClick={handleAddPhotos} className={style.button}>Зберегти фото</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
