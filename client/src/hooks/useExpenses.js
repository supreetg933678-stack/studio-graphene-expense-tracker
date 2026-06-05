import { useEffect, useMemo, useState } from 'react';
import { fetchExpenses, fetchSummary } from '../api/expenseApi';
import { categories } from '../constants/categories';
import { getRangeBounds } from '../utils/dateUtils';

function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');
  const [customRange, setCustomRange] = useState({ from: null, to: null });

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchExpenses(), fetchSummary()])
      .then(([expenseList, summaryData]) => {
        setExpenses(expenseList);
        setSummary(summaryData);
      })
      .catch((fetchError) => {
        setError(fetchError?.response?.data?.message || fetchError.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredExpenses = useMemo(() => {
    const matched = expenses.filter((expense) => {
      const filterCategory = categoryFilter === 'All' || expense.category === categoryFilter;
      if (!filterCategory) return false;

      const { from, to } = getRangeBounds(dateRange, customRange);
      const expenseDate = new Date(expense.date);
      const matchesRange = (!from || expenseDate >= from) && (!to || expenseDate <= to);
      return matchesRange;
    });

    return matched.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, categoryFilter, dateRange, customRange]);

  return {
    expenses,
    filteredExpenses,
    summary,
    loading,
    error,
    categories,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    customRange,
    setCustomRange,
    refresh: async () => {
      setLoading(true);
      try {
        const [expenseList, summaryData] = await Promise.all([fetchExpenses(), fetchSummary()]);
        setExpenses(expenseList);
        setSummary(summaryData);
        setError(null);
      } catch (fetchError) {
        setError(fetchError?.response?.data?.message || fetchError.message);
      } finally {
        setLoading(false);
      }
    },
  };
}

export default useExpenses;
