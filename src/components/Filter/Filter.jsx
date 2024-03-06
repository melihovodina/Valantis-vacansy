import React, { useState } from 'react';
import { filter, getItems } from '../../api/api';
import './filter.css'

const Filter = ({ setItems }) => {
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');

  const handleSearch = async () => {
    const brandIds = brand ? (await filter({ brand })).result : [];
    const productIds = product ? (await filter({ product })).result : [];
    const priceIds = price ? (await filter({ price })).result : [];
    const idIds = id ? (await filter({ id })).result : [];
    const ids = [...new Set([].concat(brandIds, productIds, priceIds, idIds))];

    if (ids.length > 0) {
      const itemsResponse = await getItems({ ids: ids.flat() });
      console.log('Items from getItems in Filter:', itemsResponse.result);
      setItems(itemsResponse.result);
    }
  }; 

  return (
    <div className="filter-main">
      <h3 className='filter-header'>Поиск</h3>
      <div className='filter-box'>
        <p className='filter-text'>Бренд</p>
        <input className='filter-input' placeholder='Найти по бренду' value={brand} onChange={e => setBrand(e.target.value)} />
        <p className='filter-text'>Название</p>
        <input className='filter-input' placeholder='Найти по названию' value={product} onChange={e => setProduct(e.target.value)} />
        <p className='filter-text'>Цена</p>
        <input className='filter-input' placeholder='Найти по цене' value={price} onChange={e => setPrice(e.target.value)} />
        <p className='filter-text'>ID</p>
        <input className='filter-input' placeholder='Найти по ID' value={id} onChange={e => setId(e.target.value)} />
        <div className='filter-button-box'>
          <button className='filter-button' onClick={handleSearch}>Найти</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
