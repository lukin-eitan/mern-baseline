import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkAuthenticationInvalidator } from '../utils/apiQueries/authQueries.js';
import { logoutUserMutationFn } from '../utils/apiMutations/authMutations.js';
import { Link, Outlet } from 'react-router-dom';
import { useConnectedUser } from '../hooks/useConnectedUser.js';

const loggedInPages = ['Dashboard'];
const persistentPages = ['Home'];
const loggedInSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const loggedOutSettings = ['Login', 'Sign Up'];

const SettingsUrlMapper = (setting: string): string => {
  switch (setting) {
    case 'Login':
      return '/auth/login';
    case 'Sign Up':
      return '/auth/signup';
    case 'Dashboard':
      return '/dashboard';
    case 'Profile':
      return '/profile';
    case 'Account':
      return '/account';
  }
  return '';
};

const PagesUrlMapper = (page: string): string => {
  switch (page) {
    case 'Dashboard':
      return '/dashboard';
    case 'Home':
      return '/';
  }
  return '';
};

const NavBar = () => {
  ///////// States: START ///////////
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  ///////// States: END ///////////

  ///////// Queries/Mutations: START ///////////
  const connectedUser = useConnectedUser();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUserMutationFn,
    onSuccess: () => checkAuthenticationInvalidator(queryClient)
  });
  ///////// Queries/Mutations: END ///////////

  ///////// Handlers: START ///////////
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    logoutMutation.mutate();
  };
  ///////// Handlers: END ///////////

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <MuiLink
              component={Link}
              to={PagesUrlMapper('Home')}
              color="inherit"
              underline="none"
            >
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
                LOGO
              </Typography>
            </MuiLink>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {persistentPages.map((page) => (
                  <MenuItem
                    key={`${page}_menuItem`}
                    onClick={handleCloseNavMenu}
                  >
                    <MuiLink
                      key={`${page}_link`}
                      component={Link}
                      to={PagesUrlMapper(page)}
                      color="inherit"
                      underline="none"
                    >
                      <Typography key={`${page}_typography`} textAlign="center">
                        {page}
                      </Typography>
                    </MuiLink>
                  </MenuItem>
                ))}
                {connectedUser?.isConnected &&
                  loggedInPages.map((page) => (
                    <MenuItem
                      key={`${page}_menuItem`}
                      onClick={handleCloseNavMenu}
                    >
                      <MuiLink
                        key={`${page}_link`}
                        component={Link}
                        to={PagesUrlMapper(page)}
                        color="inherit"
                        underline="none"
                      >
                        <Typography
                          key={`${page}_typography`}
                          textAlign="center"
                        >
                          {page}
                        </Typography>
                      </MuiLink>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={MuiLink}
              href={PagesUrlMapper('Home')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {persistentPages.map((page) => (
                <MuiLink
                  key={`${page}_link`}
                  component={Link}
                  to={PagesUrlMapper(page)}
                  color="inherit"
                  underline="none"
                  sx={{ margin: 3, color: 'white', display: 'block' }}
                >
                  {page}
                </MuiLink>
              ))}
              {connectedUser?.isConnected &&
                loggedInPages.map((page) => (
                  <MuiLink
                    key={`${page}_link`}
                    component={Link}
                    to={PagesUrlMapper(page)}
                    color="inherit"
                    underline="none"
                    sx={{ margin: 3, color: 'white', display: 'block' }}
                  >
                    {page}
                  </MuiLink>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={
                      connectedUser?.user
                        ? connectedUser.user.firstName
                        : 'Guest'
                    }
                    src={
                      connectedUser?.user
                        ? connectedUser?.user?.profileImgUrl
                          ? connectedUser.user.profileImgUrl
                          : '/'
                        : ''
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {connectedUser?.isConnected
                  ? loggedInSettings.map((setting) => (
                      <MenuItem
                        key={`${setting}_menuItem`}
                        onClick={(e) => {
                          handleCloseUserMenu();
                          if (setting === 'Logout') {
                            handleLogout(e);
                          }
                        }}
                      >
                        <MuiLink
                          key={`${setting}_link`}
                          component={Link}
                          to={SettingsUrlMapper(setting)}
                          color="inherit"
                          underline="none"
                        >
                          <Typography
                            key={`${setting}_typography`}
                            textAlign="center"
                          >
                            {setting}
                          </Typography>
                        </MuiLink>
                      </MenuItem>
                    ))
                  : loggedOutSettings.map((setting) => (
                      <MenuItem
                        key={`${setting}_menuItem`}
                        onClick={handleCloseUserMenu}
                      >
                        <MuiLink
                          key={`${setting}_link`}
                          component={Link}
                          to={SettingsUrlMapper(setting)}
                          color="inherit"
                          underline="none"
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MuiLink>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};
export default NavBar;
