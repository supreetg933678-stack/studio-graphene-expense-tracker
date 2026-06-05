import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchExpenses() {
  const response = await api.get('/expenses');
  return response.data;
}

export async function fetchExpense(id) {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
}

export async function createExpense(payload) {
  const response = await api.post('/expenses', payload);
  return response.data;
}

export async function updateExpense(id, payload) {
  const response = await api.put(`/expenses/${id}`, payload);
  return response.data;
}

export async function deleteExpense(id) {
  await api.delete(`/expenses/${id}`);
}

export async function fetchSummary() {
  const response = await api.get('/expenses/summary');
  return response.data;
}

export async function exportCsv() {
  const response = await api.get('/expenses/export/csv', { responseType: 'blob' });
  return response.data;
}
