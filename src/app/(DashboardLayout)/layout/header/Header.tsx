import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconBellRinging } from '@tabler/icons-react';
import Logo from '../shared/logo/Logo';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {lgUp ? (
          <>
            <IconButton
              size="large"
              aria-label="show 11 new notifications"
              color="inherit"
              aria-controls="msgs-menu"
              aria-haspopup="true"
            >
              <IconBellRinging size="21" stroke="1.5" />
            </IconButton>
            <Box flexGrow={1} />
            <Stack spacing={1} direction="row" alignItems="center">
              <Profile />
            </Stack>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Logo />
              <Box flexGrow={1} />
              <Profile />
            </Box>
          </>
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
