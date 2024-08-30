import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Slide,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconLayoutDashboard,
  IconCoins,
  IconCornerRightDownDouble,
} from '@tabler/icons-react';
import useScrollDirection from '@/hooks/useScrollDirection';

const BottomNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollDirection, isAtBottom } = useScrollDirection();

  return (
    <Slide appear={false} direction="up" in={scrollDirection === 'up' || isAtBottom}>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 3,
          zIndex: 1300,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={pathname}
          onChange={(event, newValue) => {
            router.push(newValue);
          }}
        >
          <BottomNavigationAction
            label="Deposit"
            value="/deposit"
            icon={<IconCoins />}
          />
          <BottomNavigationAction
            label="Dashboard"
            value="/"
            icon={<IconLayoutDashboard />}
          />
          <BottomNavigationAction
            label="Withdraw"
            value="/withdraw"
            icon={<IconCornerRightDownDouble />}
          />
        </BottomNavigation>
      </Paper>
    </Slide>
  );
};

export default BottomNavbar;
