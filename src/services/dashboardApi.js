import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
});

export async function getDashboardData() {
  const response = await dashboardApi.get('/mock/dashboard.json');
  return response.data;
}

export { dashboardApi };
