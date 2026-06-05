import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchExpenses() {
  return apiClient.get('/expenses').then((response) => response.data);
}

export function fetchExpense(id) {
  return apiClient.get(`/expenses/${id}`).then((response) => response.data);
}

export function createExpense(payload) {
  return apiClient.post('/expenses', payload).then((response) => response.data);
}

export function updateExpense(id, payload) {
  return apiClient.put(`/expenses/${id}`, payload).then((response) => response.data);
}

export function deleteExpense(id) {
  return apiClient.delete(`/expenses/${id}`);
}


export function fetchSummary() {
  return apiClient.get('/summary').then((response) => response.data);
}

export function exportCsv() {
  return apiClient.get('/export/csv', { responseType: 'blob' }).then((response) => response.data);
}
