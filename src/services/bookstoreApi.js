import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 10000,
});

function normalizeText(value) {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export async function getBookstoreData() {
  const response = await apiClient.get('/api/bookstore.json');
  return response.data;
}

export async function searchBooks({ query = '', category = 'Tất cả' }) {
  const data = await getBookstoreData();
  const keyword = normalizeText(query.trim());

  return data.books.filter((book) => {
    const matchesCategory = category === 'Tất cả' || book.category === category;
    const searchableText = normalizeText(`${book.title} ${book.author} ${book.category} ${book.tag}`);
    const matchesKeyword = !keyword || searchableText.includes(keyword);

    return matchesCategory && matchesKeyword;
  });
}

export async function checkoutOrder(orderPayload) {
  if (process.env.REACT_APP_API_URL) {
    const response = await apiClient.post('/api/orders', orderPayload);
    return response.data;
  }

  return {
    orderId: `BN${Date.now()}`,
    paymentStatus: orderPayload.paymentMethod === 'Thanh toán khi nhận hàng' ? 'pending' : 'paid',
    ...orderPayload,
  };
}
