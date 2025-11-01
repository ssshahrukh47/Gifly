import axios from "axios";

const API_KEY = "drLbMgGmHBSSwpr5RBJVa7uDWAEkx6oj";
const BASE_URL = "https://api.giphy.com/v1/gifs";

export const fetchTrendingGifs = async (offset = 0) => {
  const res = await axios.get(`${BASE_URL}/trending`, {
    params: { api_key: API_KEY, limit: 15, offset },
  });
  return res.data.data;
};

export const fetchSearchGifs = async (query: string, offset = 0) => {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: { api_key: API_KEY, q: query, limit: 15, offset },
  });
  return res.data.data;
};