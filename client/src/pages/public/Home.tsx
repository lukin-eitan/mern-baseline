import { Stack, Typography } from '@mui/material';
import { useConnectedUser } from '../../hooks/useConnectedUser';

// Change this image!!!
import mernBaselineLogo from '../../../../assets/mern-baseline-logo.jpg';

const Home = () => {
  const connectedUser = useConnectedUser();
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <img
        srcSet={`${mernBaselineLogo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${mernBaselineLogo}?w=164&h=164&fit=crop&auto=format`}
        alt="MERN Baseline"
      />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        {connectedUser?.isConnected
          ? 'Hello ' + connectedUser.user?.firstName
          : 'Hello Guest'}
      </Typography>
    </Stack>
  );
};

export default Home;
