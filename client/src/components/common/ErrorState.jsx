import { Alert, AlertTitle, Box } from '@mui/material';

function ErrorState({ message = 'Unable to load data.' }) {
  return (
    <Box sx={{ py: 6 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorState;
