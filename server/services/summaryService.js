const { readData } = require('../utils/fileStore');

const defaultBudgets = {
  Food: 500,
  Transport: 200,
  Bills: 400,
  Entertainment: 150,
  Other: 250,
};

function getBudgetConfig() {
  try {
    const budgetsPath = require('path').join(__dirname, '../data/budgets.json');
    return readData(budgetsPath);
  } catch (error) {
    return defaultBudgets;
  }
}

function getSummary() {
  const expenses = readData();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const totalSpentThisMonth = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const highestExpense = monthExpenses.reduce(
    (max, expense) => (Number(expense.amount) > Number(max.amount) ? expense : max),
    { amount: 0 }
  );

  const totalExpenses = expenses.length;
  const budgetConfig = getBudgetConfig();
  const totalAmountPerCategory = Object.keys(budgetConfig).reduce((acc, category) => {
    acc[category] = monthExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return acc;
  }, {});

  const budgetUsage = Object.entries(budgetConfig).map(([category, budget]) => ({
    category,
    budget,
    spent: totalAmountPerCategory[category] || 0,
    usage: budget > 0 ? (totalAmountPerCategory[category] || 0) / budget : 0,
  }));

  const budgetWarnings = budgetUsage.filter((item) => item.usage >= 0.9);

  return {
    totalSpentThisMonth,
    highestExpense: highestExpense.amount > 0 ? highestExpense : null,
    totalExpenses,
    totalAmountPerCategory,
    budgetUsage,
    budgetWarnings,
  };
}

module.exports = {
  getSummary,
};
