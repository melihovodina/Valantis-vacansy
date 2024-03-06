import React, { useState, useEffect } from 'react'
import Filter from '../../components/Filter/Filter';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import './main.css'
import { getIds, getItems } from '../../api/api'

const Main = () => {
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
          console.log('Items state in Main after setItems:', items);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className='main'>
      <Header/>
      <div className='content'>
        <div className='filter'>
          <Filter setItems={setItems}/>
        </div>
        <Content items={items} setItems={setItems}/>
      </div>
    </div>
  );
}

export default Main;