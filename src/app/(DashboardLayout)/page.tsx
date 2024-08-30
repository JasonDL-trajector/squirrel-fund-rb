'use client';

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

  return (
    <PageContainer title="Squirrel Fund" description="Squirrel Fund">
      <Box>
        <Grid container spacing={isMobile ? 5 : 3}>
          <Grid item xs={12} md={6}>
            <BalanceHistory />
          </Grid>
           <Grid item xs={12} md={6}>
            <TabularSummary />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12} sm={6}>
                <CurrentBalance />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DailyDeposit />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentDeposits />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentWithdrawals />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Bills />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
