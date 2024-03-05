import React, { useState } from 'react';
import { filter, getItems } from '../../api/api';
import './filter.css'

const Filter = () => {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    const brandIds = brand ? (await filter({ brand })).result : [];
    const nameIds = name ? (await filter({ name })).result : [];
    const priceIds = price ? (await filter({ price })).result : [];
    const idIds = id ? (await filter({ id })).result : [];
    const ids = [...new Set([].concat(brandIds, nameIds, priceIds, idIds))];
  
    if (ids.length > 0) {
      const itemsResponse = await getItems({ ids: ids.flat() });
      setItems(itemsResponse);
    }
  };  

  return (
    <div className="filter-main">
      <h3 className='filter-header'>Поиск</h3>
      <div className='filter-box'>
        <p className='filter-text'>Бренд</p>
        <input className='filter-input' placeholder='Найти по бренду' value={brand} onChange={e => setBrand(e.target.value)} />
        <p className='filter-text'>Название</p>
        <input className='filter-input' placeholder='Найти по названию' value={name} onChange={e => setName(e.target.value)} />
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
