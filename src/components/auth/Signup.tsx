import { Link } from 'react-router';
import { Link as MuiLink } from '@mui/material';
import Auth from './Auth';
import { useCreateUser } from '../../hooks/useCreateUser';
import { extractErrorMessage } from '../../utils/errors';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLoging';
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors';

const Signup = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string>();
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        setError('');
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          await login({ email, password });
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to="/login">
        <MuiLink>Already have an account? Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default Signup;
