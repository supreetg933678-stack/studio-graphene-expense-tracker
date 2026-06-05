import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

function DeleteConfirmationDialog({ open, onClose, onConfirm, expense }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the expense for "{expense?.category}" on {expense ? new Date(expense.date).toLocaleDateString() : ''}?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
