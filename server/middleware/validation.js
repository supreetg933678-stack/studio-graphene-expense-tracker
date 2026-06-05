const { categories } = require('../services/expenseService');

function validateExpense(req, res, next) {
  const { amount, category, date } = req.body;
  const errors = [];

  if (amount === undefined || amount === null || amount === '') {
    errors.push('Amount is required.');
  } else if (Number.isNaN(Number(amount))) {
    errors.push('Amount must be a valid number.');
  } else if (Number(amount) <= 0) {
    errors.push('Amount must be greater than zero.');
  }

  if (!category) {
    errors.push('Category is required.');
  } else if (!categories.includes(category)) {
    errors.push(`Category must be one of ${categories.join(', ')}.`);
  }

  if (!date) {
    errors.push('Date is required.');
  } else {
    const expenseDate = new Date(date);
    const now = new Date();
    if (Number.isNaN(expenseDate.getTime())) {
      errors.push('Date must be a valid ISO date.');
    } else if (expenseDate > now) {
      errors.push('Date cannot be in the future.');
    }
  }

  if (errors.length) {
    return res.status(400).json({ message: 'Validation failed.', errors });
  }

  next();
}

function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'A valid expense ID is required.' });
  }
  next();
}

module.exports = {
  validateExpense,
  validateIdParam,
};
