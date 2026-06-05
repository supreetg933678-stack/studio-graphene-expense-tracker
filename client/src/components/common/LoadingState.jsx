import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingState({ message = 'Loading expenses...' }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>{message}</Typography>
    </Box>
  );
}

export default LoadingState;
