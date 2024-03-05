import React, { useState, useEffect } from 'react'
import { getIds, getItems } from '../../api/api'
import './content.css'

const Content = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const idsResponse = await getIds({ offset: 0, limit: 10 });
      if (idsResponse && idsResponse.result) {
        const itemsResponse = await getItems({ ids: idsResponse.result });
        if (itemsResponse && itemsResponse.result) {
          // Создаем Set для хранения уникальных идентификаторов
          const uniqueIds = new Set();
          const uniqueItems = itemsResponse.result.filter(item => {
            if (!uniqueIds.has(item.id)) {
              uniqueIds.add(item.id);
              return true;
            }
            return false;
          });
          setItems(uniqueItems);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className='content-main'>
      {items.map(item => (
        <div className='content-item' key={item.id}>
          <div className='content-item-name'>
            <h2>{item.product}</h2>
          </div>
          <div className='content-item-brand'>
            <p>Бренд: {item.brand ? item.brand : 'нет'}</p>
          </div>
          <div className='content-bottom'>
            <div className='content-item-id'>
              <p>ID: {item.id}</p>
            </div>
            <div className='content-item-price'>
              <p>Цена: {item.price}₽</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content
