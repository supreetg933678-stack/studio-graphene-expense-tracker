import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

const initialForm = {
  amount: '',
  category: '',
  date: '',
  note: '',
};

function ExpenseFormDialog({ open, onClose, onSave, categories, initialExpense, loading }) {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (initialExpense) {
      setFormState({
        amount: initialExpense.amount,
        category: initialExpense.category,
        date: initialExpense.date,
        note: initialExpense.note || '',
      });
    } else {
      setFormState(initialForm);
    }
    setErrors([]);
  }, [initialExpense, open]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = [];
    const amount = Number(formState.amount);
    const date = new Date(formState.date);

    if (!formState.amount) nextErrors.push('Amount is required.');
    else if (Number.isNaN(amount) || amount <= 0) nextErrors.push('Amount must be greater than zero.');

    if (!formState.category) nextErrors.push('Category is required.');
    if (!formState.date) nextErrors.push('Date is required.');
    else if (date > new Date()) nextErrors.push('Date cannot be in the future.');

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      amount: Number(formState.amount),
      category: formState.category,
      date: formState.date,
      note: formState.note,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialExpense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <DialogContent>
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </Alert>
        )}
        <TextField
          label="Amount"
          type="number"
          value={formState.amount}
          onChange={handleChange('amount')}
          fullWidth
          margin="normal"
          inputProps={{ min: 0.01, step: 0.01 }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={formState.category}
            label="Category"
            onChange={handleChange('category')}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          value={formState.date}
          onChange={handleChange('date')}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Note"
          value={formState.note}
          onChange={handleChange('note')}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {initialExpense ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseFormDialog;
