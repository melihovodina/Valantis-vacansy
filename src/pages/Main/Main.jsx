import React, { useState, useEffect} from 'react'
import { getIds, getItems, getFields, filter } from '../../api/api'

const Main = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const idsResponse = await getIds({ offset: 0, limit: 10 });
      if (idsResponse && idsResponse.result) {
        const itemsResponse = await getItems(idsResponse.result);
        if (itemsResponse && itemsResponse.result) {
          setItems(itemsResponse.result);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h2>{item.property1}</h2>
          <p>{item.property2}</p>
        </div>
      ))}
    </div>
  );
}

export default Main