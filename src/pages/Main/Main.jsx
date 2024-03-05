import React, { useState } from 'react'
import Filter from '../../components/Filter/Filter';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import './main.css'

const Main = () => {
  const [items, setItems] = useState([]);

  return (
    <div className='main'>
      <Header/>
      <div className='content'>
        <div className='filter'>
          <Filter setItems={setItems}/>
        </div>
        <Content items={items}/>
      </div>
    </div>
  );
}

export default Main;