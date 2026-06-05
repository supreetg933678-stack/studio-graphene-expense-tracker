const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/fileStore');

const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function getAllExpenses() {
  const expenses = readData();
  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getExpenseById(id) {
  const expenses = readData();
  return expenses.find((expense) => expense.id === id) || null;
}

function createExpense(payload) {
  const expenses = readData();
  const expense = {
    id: uuidv4(),
    amount: Number(payload.amount),
    category: payload.category,
    date: payload.date,
    note: payload.note || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  expenses.push(expense);
  writeData(expenses);
  return expense;
}

function updateExpense(id, payload) {
  const expenses = readData();
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return null;
  }

  expenses[index] = {
    ...expenses[index],
    amount: Number(payload.amount),
    category: payload.category,
    date: payload.date,
    note: payload.note || '',
    updatedAt: new Date().toISOString(),
  };

  writeData(expenses);
  return expenses[index];
}

function deleteExpense(id) {
  const expenses = readData();
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return false;
  }
  expenses.splice(index, 1);
  writeData(expenses);
  return true;
}

function getSummary() {
  const expenses = readData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalSpentThisMonth = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const highestExpense = monthExpenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), { amount: 0 });
  const totalAmountPerCategory = categories.reduce((acc, category) => {
    acc[category] = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return acc;
  }, {});

  return {
    totalSpentThisMonth,
    highestExpense: highestExpense.amount > 0 ? highestExpense : null,
    totalExpenses: expenses.length,
    totalAmountPerCategory,
  };
}

function toCsv(expenses) {
  const headers = ['id', 'amount', 'category', 'date', 'note', 'createdAt', 'updatedAt'];
  const rows = expenses.map((expense) =>
    headers
      .map((header) => {
        let value = expense[header] === undefined || expense[header] === null ? '' : String(expense[header]);
        return `"${value.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

module.exports = {
  categories,
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
  toCsv,
};
