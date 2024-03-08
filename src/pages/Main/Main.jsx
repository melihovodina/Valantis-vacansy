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
  const [page, setPage] = useState(1);
  const [filteredIds, setFilteredIds] = useState([]);
  const [duplicates, setDuplicates] = useState([0]);
  console.log("create array: ", duplicates)

  const fetchData = async () => {
    setLoading(true);
    const offset = (page - 1) * 50 + duplicates.slice(0, page).reduce((a, b) => a + b, 0);;
    console.log("array + to offset: ", duplicates)
    console.log("create offset: ", offset)
    let ids = [];
    if (filteredIds.length > 0) {
      ids = filteredIds.slice(offset, offset + 50);
    } else {
      let dubOffset = offset;
      let dubLimit = 0;
      let idsResponse = await getIds({ offset: offset, limit: 50 });
      let newIds = Array.from(new Set(idsResponse.result));
      ids = [...new Set([...ids, ...newIds])];
      while (ids.length < 50) {
        dubOffset += ids.length + 1 + dubLimit;
        dubLimit = 50 - ids.length
        idsResponse = await getIds({ offset: dubOffset, limit: dubLimit });
        newIds = Array.from(new Set(idsResponse.result));
        ids = [...new Set([...ids, ...newIds])];
      }
      setDuplicates(prevDuplicates => {
        let newDuplicates = [...prevDuplicates];
        newDuplicates[page] = dubLimit;
        return newDuplicates;
      });
    }
    const itemsResponse = await getItems({ ids });
    const itemsMap = new Map();
    itemsResponse.result.forEach(item => {
      if (!itemsMap.has(item.id)) {
        itemsMap.set(item.id, item);
      }
    });
    const uniqueItems = Array.from(itemsMap.values());
    setItems(uniqueItems);
    setLoading(false);
  };  

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [page]);

  const back = () => {
    setPage(prevPage => prevPage - 1)
  }

  const forward = () => {
    setPage(prevPage => prevPage + 1)
  }

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
        <Filter setItems={setItems} 
        setLoading={setLoading} 
        setNotFounded={setNotFounded} 
        setFilteredIds={setFilteredIds} 
        setPage={setPage}
        fetchData={fetchData}
        />
        </div>
        {loading ? (
          <CgSpinner className="spinner" size={45}/>
        ) : notFounded ? (
          ''
        ) : (
           <Content items={items} setItems={setItems}/>
        )}
      </div>
      <button onClick={back}>Предыдущая страница</button>
      <button onClick={forward}>Следующая страница</button>
    </div>
  );
}

export default Main;