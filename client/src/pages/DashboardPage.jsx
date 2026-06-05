import { Alert, Box, Button, Card, CardContent, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { exportCsv, fetchSummary } from '../api/expenseApi';
import ChartPanel from '../components/charts/ChartPanel';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import PageHeader from '../components/common/PageHeader';
import SummaryCards from '../components/dashboard/SummaryCards';
import useSnackbar from '../hooks/useSnackbar';

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    fetchSummary()
      .then(setSummary)
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

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
      const message = err?.response?.data?.message || err.message;
      setError(message);
      showSnackbar(message, 'error');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        description="Track spending, review limits, and export your expense data."
        actions={<Button variant="contained" onClick={handleExportCsv}>Export CSV</Button>}
      />

      <SummaryCards summary={summary} />
      <ChartPanel summary={summary} />

      {summary?.budgetWarnings?.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Budget Alerts
            </Typography>
            {summary.budgetWarnings.map((warning) => (
              <Alert key={warning.category} severity="warning" sx={{ mb: 1 }}>
                {warning.category}: {warning.message}
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardPage;
