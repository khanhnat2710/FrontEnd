import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 10000,
});

export async function getBookstoreData() {
  const response = await apiClient.get('/api/bookstore.json');
  return response.data;
}
