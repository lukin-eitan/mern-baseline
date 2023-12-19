import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LogInUser } from '../../API/user/loginUser';
import { Navigate } from 'react-router-dom';
import { Alert, Link, Snackbar } from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { checkAuthenticationInvalidator } from '../../utils/apiQueries/authQueries';
import { loginUserMutationFn } from '../../utils/apiMutations/authMutations';
import { useConnectedUser } from '../../hooks/useConnectedUser';
import { verifyEmail } from '@devmehq/email-validator-js';

const LogIn = () => {
  const connectedUser = useConnectedUser();
  const queryClient = useQueryClient();
  const [failedLogIn, setFailedLogIn] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  const handleCloseSnackBar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailedLogIn(false);
  };

  const handleFailedLogIn = () => {
    setFailedLogIn(true);
    setEmailError('Possibly invalid email');
    setPasswordError('Possibly invalid password');
  };

  const loginMutation = useMutation({
    mutationFn: loginUserMutationFn,
    onSuccess: () => checkAuthenticationInvalidator(queryClient),
    onError: () => handleFailedLogIn()
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.has('email') ? data.get('email')!.toString() : '';
    const password = data.has('password')
      ? data.get('password')!.toString()
      : '';
    const { validFormat } = await verifyEmail({
      emailAddress: email,
      timeout: 3000
    });
    if (!validFormat) {
      setFailedLogIn(true);
      setEmailError('Invalid email format');
      return;
    }

    const logInUser: LogInUser = {
      email: email,
      password: password
    };
    loginMutation.mutate(logInUser);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={failedLogIn}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="warning"
          sx={{ width: '100%' }}
        >
          {emailError && passwordError
            ? 'Invalid Email or Password'
            : !!emailError
            ? 'Invalid Email'
            : null}
        </Alert>
      </Snackbar>
      {connectedUser?.isConnected && <Navigate to="/" />}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                onChange={() => setEmailError(null)}
                error={!!emailError}
                helperText={emailError && emailError}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={() => setPasswordError(null)}
                error={!!passwordError}
                helperText={passwordError && passwordError}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account yet?{' '}
        <Link color="inherit" href="/auth/signup">
          sign up
        </Link>{' '}
      </Typography>
    </Container>
  );
};

export default LogIn;
