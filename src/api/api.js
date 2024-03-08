import axios from 'axios';
import md5 from 'md5';

const password = 'Valantis';
const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,"");
const XAuth = md5(`${password}_${timestamp}`);

export async function getIds({ offset, limit }) {
  let result;
  let attempts = 0;
  do {
    try {
      result = await axios ({
        method: 'post',
        url: 'https://api.valantis.store:41000/',
        headers: { 'X-Auth': XAuth },
        data: {
          action: 'get_ids',
          params: { offset, limit }
        }
      });
    } 
    catch(error) {
      console.log('Error ', error.response?.data?.errorId || error.message);
      result = null;
      attempts++;
      if (attempts >= 5) {
        throw new Error("Произошла ошибка, попробуйте позже");
      }
    }
  }
  while(!result);
  return(result.data);
}

export async function getItems({ ids }) {
  let result;
  let attempts = 0;
  do {
    try {
      result = await axios ({
        method: 'post',
        url: 'https://api.valantis.store:41000/',
        headers: { 'X-Auth': XAuth},
        data: {
          action: 'get_items',
          params: { ids }
        }
      })
    }
    catch(error) {
      console.log('Error ', error.response?.data?.errorId || error.message )
      result = null;
      attempts++;
      if (attempts >= 5) {
        throw new Error("Произошла ошибка, попробуйте позже");
      }
    }
  }
  while(!result);
  return (result.data);
}
  
export async function getFields({field, offset, limit}) {
  let result;
  let attempts = 0;
  do {
    try {
      result = await axios ({
        method: 'post',
        url: 'https://api.valantis.store:41000/',
        headers: { 'X-Auth': XAuth},
        data: {
          action: 'get_fields',
          params: { field, offset, limit }
        }
      })
    }
    catch(error) {
      console.log('Error ', error.response?.data?.errorId || error.message )
      result = null;
      attempts++;
      if (attempts >= 5) {
        throw new Error("Произошла ошибка, попробуйте позже");
      }
    }
  }
  while(!result);
  return (result.data);
}
  
export async function filter(params) {
  let result;
  let attempts = 0;
  do {
    try {
      result = await axios ({
        method: 'post',
        url: 'https://api.valantis.store:41000/',
        headers: { 'X-Auth': XAuth},
        data: {
          action: 'filter',
          params: params
        }
      })
    }
    catch(error) {
      console.log('Error ', error.response?.data?.errorId || error.message )
      result = null;
      attempts++;
      if (attempts >= 10) {
        throw new Error("Произошла ошибка, попробуйте позже");
      }
    }
  }
  while(!result);
  return (result.data);
}
