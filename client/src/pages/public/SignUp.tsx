import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { RegisterUser } from '../../API/user/registerUser';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRegisterUserMutation } from '../../utils/apiMutations/userMutations';
import { useConnectedUser } from '../../hooks/useConnectedUser';
import { verifyEmail } from '@devmehq/email-validator-js';
import { DGError } from '../../API/dgError/dgError';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp = () => {
  const connectedUser = useConnectedUser();
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleFailedSignUp = (errData: DGError) => {
    setEmailError(errData.message);
  };

  const registerUserMutation = useRegisterUserMutation(
    queryClient,
    handleFailedSignUp
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.has('email') ? data.get('email')!.toString() : '';
    const { validFormat } = await verifyEmail({
      emailAddress: email,
      timeout: 3000
    });
    if (!validFormat) {
      setEmailError('Email is invalid');
      return;
    }
    const newUser: RegisterUser = {
      firstName: data.has('firstName') ? data.get('firstName')!.toString() : '',
      lastName: data.has('lastName') ? data.get('lastName')!.toString() : '',
      email: email,
      password: data.has('password') ? data.get('password')!.toString() : '',
      profileImgUrl: data.has('profileImgUrl')
        ? data.get('profileImgUrl')!.toString()
        : undefined
    };
    registerUserMutation.mutate(newUser);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={() => setEmailError(null)}
                error={!!emailError}
                helperText={emailError}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="profileImgUrl"
                label="Image Url"
                name="profileImgUrl"
                autoComplete="profileImgUrl"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};

export default SignUp;
