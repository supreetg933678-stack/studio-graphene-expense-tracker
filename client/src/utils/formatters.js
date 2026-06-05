export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value) || 0);
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString();
}
