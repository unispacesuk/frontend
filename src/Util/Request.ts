import axios, { AxiosPromise } from 'axios';
// const API = import.meta.env.VITE_API;
const API = 'http://api.unispaces.test';

export const Headers = {
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyaWNhcmRvIiwiZW1haWwiOiJtZUBycm9jaGEudWsiLCJpYXQiOjE2NDIyODkwNDEsImV4cCI6MTY0MjcyMTA0MX0.X-swct-TXBTtV8hSx_bTsvSintQGdBTm-MT1qUoFneQ',
};

export async function Get(path: string, params?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API}/${path}`, {
        headers: Headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function Post(path: string, body: object, params?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/${path}`, body, {
      headers: Headers
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    });
  });
}