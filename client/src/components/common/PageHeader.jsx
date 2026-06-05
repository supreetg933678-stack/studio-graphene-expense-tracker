import { Box, Stack, Typography } from '@mui/material';

function PageHeader({ title, description, actions }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          {actions}
        </Stack>
      </Stack>
    </Box>
  );
}

export default PageHeader;
