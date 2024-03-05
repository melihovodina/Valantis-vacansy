import axios from 'axios';
import md5 from 'md5';

const password = 'Valantis';
const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,"");
const XAuth = md5(`${password}_${timestamp}`);

export async function getIds({ offset, limit }) {
  const result = await axios({
      method: 'post',
      url:'http://api.valantis.store:40000/',
      headers: { 'X-Auth': XAuth },
      data: {
          action: 'get_ids',
          params: { offset, limit }
      }
  })
  console.log('Ids:', result.data)
  return result.data;
}

export async function getItems({ ids }) {
    const result = await axios({
      method: 'post',
      url: 'http://api.valantis.store:40000/',
      headers: { 'X-Auth': XAuth },
      data: {
        action: 'get_items',
        params: { ids }
      }
    });
    console.log('Items:', result.data)
    return result.data;
}
  
export async function getFields({field, offset, limit}) {
    const result = await axios({
      method: 'post',
      url: 'http://api.valantis.store:40000/',
      headers: { 'X-Auth': XAuth },
      data: {
        action: 'get_fields',
        params: { field, offset, limit }
      }
    });
    console.log('Fields:', result.data)
    return result.data;
}
  
export async function filter(params) {
  const result = await axios({
    method: 'post',
    url: 'http://api.valantis.store:40000/',
    headers: { 'X-Auth': XAuth },
    data: {
      action: 'filter',
      params: params
    }
  });
  console.log('Filtered items: ', result.data);
  return result.data;
}
