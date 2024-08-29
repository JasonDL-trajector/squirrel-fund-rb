'use client';

import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';

import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Squirrel Fund" description="Squirrel Fund">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
