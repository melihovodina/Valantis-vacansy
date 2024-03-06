import React, { useState } from 'react';
import { filter, getItems } from '../../api/api';
import './filter.css'

const Filter = ({ setItems }) => {
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');

  const handleSearch = async () => {
    const filters = {
      brand,
      product,
      price: price ? Number(price) : null,
      id
    };

    let ids = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === 'id') {
          const item = (await getItems({ ids: [value] })).result;
          if (item.length > 0) {
            setItems(item);
            return;
          }
        } else {
          const filterIds = (await filter({ [key]: value })).result;
          ids = ids.concat(filterIds);
        }
      }
    }
    ids = [...new Set(ids)];

    if (ids.length > 0) {
      const itemsResponse = await getItems({ ids });
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
        <input className='filter-input' type='number' style={{appearance: 'textfield'}} 
        placeholder='Найти по цене' value={price} onChange={e => setPrice(e.target.value)}/>
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
