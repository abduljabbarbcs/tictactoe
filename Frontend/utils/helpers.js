import axios from 'axios';
const API_URL_V1 = 'http://localhost:3000/api/v1';
export const request = {
  get: (route) => {
    const url = `${API_URL_V1}${route}`;
    return axios.get(url)
  },
  post: (route, body) => {
    const url = `${API_URL_V1}${route}`;
    return axios.post(url, body);
  },
  put: (route, body) => {
    const url = `${API_URL_V1}${route}`;
    return axios.put(url, body);
  },
  delete: (route, body) => {
    const url = `${API_URL_V1}${route}`;
    return axios.delete(url, body);
  }
};

export const parseStringToArray = (checks, dimensions) => {
  const arr = [];
  for (let i = 0; i < checks.length / 3; i++) {
    arr.push(checks.slice(i * 3, dimensions * (i + 1)).split(''));
  }
  return arr;
}

export const parseArrayToString = (arr) => {
  return arr.map((item) => item.join('')).join("")
}

