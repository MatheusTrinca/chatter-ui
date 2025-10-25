import * as React from 'react';
import { Snackbar as MuiSnackbar } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useReactiveVar } from '@apollo/client';
import { snackVar } from '../../constants/snack';

const Snackbar = () => {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <div>
          <MuiSnackbar
            open={!!snack}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack?.type}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snack?.message}
            </Alert>
          </MuiSnackbar>
        </div>
      )}
    </>
  );
};
export default Snackbar;
