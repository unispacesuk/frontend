import axios, { AxiosRequestHeaders } from 'axios';
const API = import.meta.env.VITE_API;
// const API = 'http://api.unispaces.test';
// const API = 'http://localhost:3000';

async function Get(path: string, headers?: AxiosRequestHeaders, params?: object): Promise<any> {
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

async function Post(
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

async function Delete(path: string, headers?: AxiosRequestHeaders, params?: object): Promise<any> {
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

async function Patch(
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

function authHeaders() {
  return {
    authorization: `Bearer ${getToken()}`,
  };
}

function getToken(): string | null {
  return localStorage.getItem('access-token') ?? null;
}

export { Get, Post, Patch, Delete, authHeaders };
