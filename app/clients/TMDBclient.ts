import axios from 'axios';

const apikey = process.env.PRIVATE_API_KEY;

const TMDBClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apikey}`,
  },
});

export default TMDBClient;
