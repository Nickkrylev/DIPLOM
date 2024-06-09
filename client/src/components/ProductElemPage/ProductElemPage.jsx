import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './ProductElem.module.css';
import { BasketContext } from '../../components/BasketContent/BasketContent';
import { getProductById, getProductImagesByProductId } from '../../services/productServices';
import { getProductItemsByProductId } from "../../services/productItemServices";

function ProductElemPage() {
  const { id } = useParams();
  const { addItem, getItemCount } = useContext(BasketContext);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStock, setSelectedStock] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [openSection, setOpenSection] = useState(null);
  const [productImgs, setProductImgs] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);

        const sizesData = await getProductItemsByProductId(id);
        setSizes(sizesData);
        if (sizesData.length > 0) {
          setSelectedSize(sizesData[0].size);
          setSelectedStock(sizesData[0].count);
          setSelectedPrice(productData.price);
        }

        const imagesData = await getProductImagesByProductId(id);
        setProductImgs(Object.keys(imagesData)[0]); // Ensure imagesData is an array
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToBasket = () => {
    if (!product) return;

    const currentCount = getItemCount(product.id, selectedSize);
    if (currentCount < selectedStock) {
      alert('Товар успішно добавлений');
      addItem({ ...product, size: selectedSize, price: selectedPrice, quantity: 1 });
    } else {
      alert('Ви вже добавили максимальну кількість');
    }
  };

  const handleSizeSelect = (size, count) => {
    setSelectedSize(size);
    setSelectedStock(count);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.images}>
        <Carousel
          showArrows={true}
          autoPlay
          interval={3000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className={style.carousel}
        >
          {productImgs.map((img, index) => (
            <div key={index}>
              <img src={img.image_path} alt={`Product ${index}`} className={style.thumbnail} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={style.details}>
        <h1>{product.name}</h1>
        <p className={style.description}>{product.description}</p>
        <div className={style.price}>{selectedPrice} ₴</div>
        <div className={style.sizes}>
          <span>Розмір:</span>
          <div className={style.sizeOptions}>
            {sizes.map(size => (
              <button
                key={size.size}
                className={`${style.sizeButton} ${selectedSize === size.size ? style.selected : ''}`}
                onClick={() => handleSizeSelect(size.size, size.count)}
              >
                {size.size} {size.count === 1 ? "(Остання одиниця)" : ""}
              </button>
            ))}
          </div>
        </div>
        <button className={style.addButton} onClick={handleAddToBasket}>ДОДАТИ ДО КОШИКА</button>
        <div className={style.extraInfo}>
          <div onClick={() => toggleSection('description')}>ПОВНИЙ ОПИС ТОВАРУ <span>{openSection === 'description' ? '-' : '+'}</span></div>
          {openSection === 'description' && <span>{product.description}</span>}

          <div onClick={() => toggleSection('manufacturer')}>ПРО ПРОДАВЦЯ <span>{openSection === 'manufacturer' ? '-' : '+'}</span></div>
          {openSection === 'manufacturer' && <span>Продавець {product.manufacturer}</span>}

          <div onClick={() => toggleSection('delivery')}>ДОСТАВКА ТА ПОВЕРНЕННЯ <span>{openSection === 'delivery' ? '-' : '+'}</span></div>
          {openSection === 'delivery' && (
            <span>
              <strong>Доставка</strong>
              Самовивіз в магазині тільки за умови оплати карткою на сайті<br />
              <strong>Ціна</strong> безкоштовно<br />
              <strong>Термін доставки</strong> протягом 24-72 годин<br />
              <strong>Графік роботи магазину</strong> щодня з 10:00 до 21:00<br /><br />

              <strong>Кур'єром служби доставки</strong> тільки за умови оплати карткою на сайті<br />
              <strong>Ціна</strong> за тарифами перевізника<br />
              <strong>Відправка</strong> протягом 48-72 годин<br /><br />

              <strong>До відділення Нової Пошти</strong><br />
              <strong>Ціна</strong> за тарифами перевізника<br />
              <strong>Відправка</strong> протягом 48-72 годин<br /><br />

              <strong>До відділення Укрпошти</strong><br />
              <strong>Ціна</strong> за тарифами перевізника<br />
              <strong>Відправка</strong> протягом 48-72 годин<br /><br />

              <strong>Повернення</strong><br />
              Товар, що з будь-яких причин вам не підійшов, може буде повернений впродовж 14 днів з моменту покупки.
              Але за умови збереження його товарного вигляду, накладної, упаковки та етикеток.
              Звертаємо увагу, що відповідно до законодавства України поверненню не підлягають:
              корсетні товари, парфюмерно-косметичні вироби, пір'яно-пухові вироби, дитячі м'які та гумові іграшки,
              зубні щітки, гребінці, рукавички, ювелірні вироби з дорогоцінних металів та бурштину, білизна,
              панчішно-шкарпеткові вироби та товари в аерозольній упаковці.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductElemPage;
