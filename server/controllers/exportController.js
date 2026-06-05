const { toCsv, getAllExpenses } = require('../services/expenseService');

function exportCsv(req, res, next) {
  try {
    const expenses = getAllExpenses();
    const csvContent = toCsv(expenses);
    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  exportCsv,
};
