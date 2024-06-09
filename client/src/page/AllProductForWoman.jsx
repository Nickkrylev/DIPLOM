import React, { useState } from 'react';
import Product from "../components/Product/Product";

const products = [
    {
        id: "1",
        image: '../../../public/img/product1.webp',
        title: 'ANNA YAKOVENKO',
        description: 'Сукня максі синьо-біла смугаста',
        category: 'accessories',
        price: 2300,
        forState: 'girl'
    },
    {
        id: "2",
        image: '../../../public/img/product2.webp',
        title: 'MOVA',
        description: 'Сукня міні чорна',
        category: 'clothes',
        price: 2550,
        forState: 'girl'
    },
    {
        id: "3",
        image: '../../../public/img/product3.webp',
        title: 'KASANDRA',
        description: 'Кросівки бежеві шкіряні',
        category: 'shoes',
        price: 2800,
        forState: 'girl'
    },
    {
        id: "4",
        image: '../../../public/img/product4.webp',
        title: 'KASANDRA',
        description: 'Шльопанці чорні шкіряні',
        category: 'shoes',
        price: 1900,
        forState: 'girl'
    }
];

function AllProductForWoman() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const handleMinPriceChange = (e) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(Number(e.target.value));
    };

    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

    return (
        <div>
            <div>
                <label>
                    Мінімальна ціна:
                    <input type="number" value={minPrice} onChange={handleMinPriceChange} />
                </label>
                <label>
                    Максимальна ціна:
                    <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
                </label>
            </div>
            <Product products={filteredProducts} />
        </div>
    );
}

export default AllProductForWoman;
