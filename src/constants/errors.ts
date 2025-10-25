import type { SnackMessage } from '../interfaces/snackbar-message';

const UNKNOWN_ERROR_MESSAGE = 'An unknown error occurred. Please try again.';

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: 'error',
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK_MESSAGE };
