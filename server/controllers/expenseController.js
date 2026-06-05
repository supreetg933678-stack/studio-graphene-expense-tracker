const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../services/expenseService');

function fetchExpenses(req, res, next) {
  try {
    const expenses = getAllExpenses();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
}

function fetchExpenseById(req, res, next) {
  try {
    const { id } = req.params;
    const expense = getExpenseById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }
    res.json(expense);
  } catch (error) {
    next(error);
  }
}

function addExpense(req, res, next) {
  try {
    const expense = createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

function editExpense(req, res, next) {
  try {
    const { id } = req.params;
    const expense = updateExpense(id, req.body);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }
    res.json(expense);
  } catch (error) {
    next(error);
  }
}

function removeExpense(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = deleteExpense(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found.' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  fetchExpenses,
  fetchExpenseById,
  addExpense,
  editExpense,
  removeExpense,
};
