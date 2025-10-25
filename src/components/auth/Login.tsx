import { Link } from 'react-router';
import { Link as MuiLink } from '@mui/material';
import Auth from './Auth';
import { useLogin } from '../../hooks/useLoging';

const Login = () => {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      onSubmit={request => login(request)}
      error={error}
    >
      <Link to="/signup">
        <MuiLink>Don&apos;t have an account? Signup</MuiLink>
      </Link>
    </Auth>
  );
};

export default Login;
