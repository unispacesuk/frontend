import axios, { AxiosRequestHeaders } from 'axios';
const API = import.meta.env.VITE_API;
// const API = 'http://api.unispaces.test';
// const API = 'http://localhost:3000';

// On this page I need to refactor the request functions to make use of the params object
// Would be better than always passing them already hard coded?
// Also good onSuccess / onFailure callbacks would be good 🤔

export async function Get(
  path: string,
  headers?: AxiosRequestHeaders,
  params?: object
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API}/${path}`, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function Post(
  path: string,
  body: object,
  headers?: AxiosRequestHeaders,
  params?: object
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/${path}`, body, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function Delete(
  path: string,
  headers?: AxiosRequestHeaders,
  params?: object
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API}/${path}`, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function Patch(
  path: string,
  body: object,
  headers?: AxiosRequestHeaders,
  params?: object
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${API}/${path}`, body, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
