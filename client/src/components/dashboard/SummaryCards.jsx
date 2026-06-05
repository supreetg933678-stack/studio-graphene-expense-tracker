import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/formatters';

function SummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Spent This Month
            </Typography>
            <Typography variant="h5">{formatCurrency(summary.totalSpentThisMonth)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Highest Expense
            </Typography>
            <Typography variant="h5">
              {summary.highestExpense ? formatCurrency(summary.highestExpense.amount) : '$0.00'}
            </Typography>
            {summary.highestExpense && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {summary.highestExpense.category} on {new Date(summary.highestExpense.date).toLocaleDateString()}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h5">{summary.totalExpenses}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total per Category
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap={2}>
              {Object.entries(summary.totalAmountPerCategory).map(([category, total]) => (
                <Card key={category} variant="outlined" sx={{ flex: 1, minWidth: 140 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {category}
                    </Typography>
                    <Typography variant="h6">{formatCurrency(total)}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SummaryCards;
