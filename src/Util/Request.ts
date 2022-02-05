import axios, { AxiosPromise } from 'axios';
import { observable, Observable, pipe } from 'rxjs';
const API = import.meta.env.VITE_API;
// const API = 'http://api.unispaces.test';
// const API = 'http://localhost:3000';

export const Headers = {
  authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
};

// On this page I need to refactor the request functions to make use of the params object
// Would be better than always passing them already hard coded?
// Also good onSuccess / onFailure callbacks would be good 🤔

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
    axios
      .post(`${API}/${path}`, body, {
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

export async function Delete(path: string, params?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.delete(`${API}/${path}`, {
      headers: Headers
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    });
  });
}
