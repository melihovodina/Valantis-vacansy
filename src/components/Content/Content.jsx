import React from 'react'
import './content.css'

const Content = ({ items }) => {
  console.log('Items prop in Content:', items);
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