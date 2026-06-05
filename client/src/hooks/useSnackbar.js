import { useCallback, useState } from 'react';

function useSnackbar() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((current) => ({ ...current, open: false }));
  }, []);

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
}

export default useSnackbar;
