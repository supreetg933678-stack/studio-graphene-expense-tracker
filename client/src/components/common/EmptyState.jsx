import { Box, Typography } from '@mui/material';

function EmptyState({ title = 'No expenses yet.', description = 'Add your first expense to begin tracking your spending.' }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Box>
  );
}

export default EmptyState;
