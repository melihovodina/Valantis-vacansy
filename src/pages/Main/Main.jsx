import React, { useState, useEffect } from 'react'
import { getIds, getItems } from '../../api/api'
import Filter from '../../components/Filter/Filter';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import { CgSpinner } from 'react-icons/cg';
import './main.css'

const Main = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFounded, setNotFounded] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const idsResponse = await getIds({ offset: 0, limit: 10 });
      if (idsResponse && idsResponse.result) {
        const itemsResponse = await getItems({ ids: idsResponse.result });
        if (itemsResponse && itemsResponse.result) {
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
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='main'>
      <Header/>
      <div className='notFounded-box'>
        <div className='notFounded'>
          {notFounded}
        </div>
      </div>
      <div className='content'>
        <div className='filter'>
        <Filter setItems={setItems} setLoading={setLoading} setNotFounded={setNotFounded}/>
        </div>
        {loading ? (
          <CgSpinner className="spinner" size={45}/>
        ) : notFounded ? (
          ''
        ) : (
           <Content items={items} setItems={setItems}/>
        )}
      </div>
    </div>
  );
}

export default Main;