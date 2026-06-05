const express = require('express');
const router = express.Router();
const {
  fetchExpenses,
  fetchExpenseById,
  addExpense,
  editExpense,
  removeExpense,
} = require('../controllers/expenseController');
const { validateExpense, validateIdParam } = require('../middleware/validation');

router.get('/', fetchExpenses);
router.get('/:id', validateIdParam, fetchExpenseById);
router.post('/', validateExpense, addExpense);
router.put('/:id', validateIdParam, validateExpense, editExpense);
router.delete('/:id', validateIdParam, removeExpense);

module.exports = router;
