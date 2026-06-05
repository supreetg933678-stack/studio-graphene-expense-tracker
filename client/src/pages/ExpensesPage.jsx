import { Alert, Box, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import {
    createExpense as apiCreateExpense,
    deleteExpense as apiDeleteExpense,
    updateExpense as apiUpdateExpense,
    exportCsv,
} from '../api/expenseApi';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import PageHeader from '../components/common/PageHeader';
import DeleteConfirmationDialog from '../components/expenses/DeleteConfirmationDialog';
import ExpenseFormDialog from '../components/expenses/ExpenseFormDialog';
import ExpenseTable from '../components/expenses/ExpenseTable';
import FilterControls from '../components/expenses/FilterControls';
import useExpenses from '../hooks/useExpenses';
import useSnackbar from '../hooks/useSnackbar';

function ExpensesPage() {
  const {
    filteredExpenses,
    loading,
    error,
    categories,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    customRange,
    setCustomRange,
    refresh,
  } = useExpenses();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeExpense, setActiveExpense] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const handleOpenForm = () => {
    setSelectedExpense(null);
    setFormOpen(true);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setFormOpen(true);
  };

  const handleDelete = (expense) => {
    setActiveExpense(expense);
    setDeleteOpen(true);
  };

  const handleSaveExpense = async (payload) => {
    setActionLoading(true);
    try {
      if (selectedExpense) {
        await apiUpdateExpense(selectedExpense.id, payload);
        showSnackbar('Expense updated successfully.', 'success');
      } else {
        await apiCreateExpense(payload);
        showSnackbar('Expense added successfully.', 'success');
      }
      setFormOpen(false);
      await refresh();
    } catch (err) {
      showSnackbar(err?.response?.data?.message || err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!activeExpense) return;
    setActionLoading(true);
    try {
      await apiDeleteExpense(activeExpense.id);
      showSnackbar('Expense deleted successfully.', 'success');
      setDeleteOpen(false);
      await refresh();
    } catch (err) {
      showSnackbar(err?.response?.data?.message || err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      const blob = await exportCsv();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showSnackbar('CSV export ready to download.', 'success');
    } catch (err) {
      showSnackbar(err?.response?.data?.message || err.message, 'error');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Expenses"
        description="Manage, filter, and export your expense history."
        actions={
          <>
            <Button variant="outlined" onClick={handleExportCsv}>
              Export CSV
            </Button>
            <Button variant="contained" onClick={handleOpenForm}>
              Add Expense
            </Button>
          </>
        }
      />

      <FilterControls
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        customRange={customRange}
        setCustomRange={setCustomRange}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <ExpenseTable expenses={filteredExpenses} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ExpenseFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveExpense}
        categories={categories}
        initialExpense={selectedExpense}
        loading={actionLoading}
      />

      <DeleteConfirmationDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        expense={activeExpense}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ExpensesPage;
