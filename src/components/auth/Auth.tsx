import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { useNavigate } from 'react-router';

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children?: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
}

const Auth = ({
  submitLabel,
  onSubmit,
  children,
  error,
  extraFields,
}: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useGetMe();
  const navigate = useNavigate();

  console.log('data', data);

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: '100vh',
        maxWidth: 360,
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      {extraFields}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        onChange={e => setEmail(e.target.value)}
        value={email}
        error={!!error}
        helperText={error}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
        value={password}
        error={!!error}
        helperText={error}
      />
      <Button onClick={() => onSubmit({ email, password })} variant="contained">
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
