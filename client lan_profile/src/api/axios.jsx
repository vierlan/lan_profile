import axios from 'axios';
const BASEURL = 'http://localhost:3000';

export default axios.create({
  baseURL: BASEURL
});

export const axiosPrivate = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-type': 'application/json'},
  withCredentials: true

});
