'use client';

import { useState, useEffect } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import BalanceHistory from '@/app/(DashboardLayout)/components/dashboard/BalanceHistory';
import CurrentBalance from '@/app/(DashboardLayout)/components/dashboard/CurrentBalance';
import RecentDeposits from '@/app/(DashboardLayout)/components/dashboard/RecentDeposits';
import RecentWithdrawals from '@/app/(DashboardLayout)/components/dashboard/RecentWithdrawals';
import Bills from '@/app/(DashboardLayout)/components/dashboard/Bills';
import DailyDeposit from '@/app/(DashboardLayout)/components/dashboard/DailyDeposit';
import TabularSummary from './components/dashboard/TabularSummary';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer title="Squirrel Fund" description="Squirrel Fund">
      <Box>
        <Grid container spacing={isMobile ? 5 : 3}>
          <Grid item xs={12} md={6}>
            <BalanceHistory isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TabularSummary isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12} sm={6}>
                <CurrentBalance isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DailyDeposit isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentDeposits isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentWithdrawals isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Bills isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
