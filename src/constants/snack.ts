import { makeVar } from '@apollo/client';
import type { SnackMessage } from '../interfaces/snackbar-message';

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
