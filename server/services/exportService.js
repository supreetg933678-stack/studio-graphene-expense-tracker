const { getAllExpenses } = require('./expenseService');
const { buildCsv } = require('../utils/csvGenerator');

function exportExpensesCsv() {
  const expenses = getAllExpenses();
  return buildCsv(expenses, ['id', 'amount', 'category', 'date', 'note', 'createdAt', 'updatedAt']);
}

module.exports = {
  exportExpensesCsv,
};
