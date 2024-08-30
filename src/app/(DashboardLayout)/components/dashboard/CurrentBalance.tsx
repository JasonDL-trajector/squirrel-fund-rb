import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Skeleton } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import type { Loading } from '../../types/loading';

const CurrentBalance = ({ isLoading }: Loading) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title="Current Balance">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </>
          ) : (
            <>
              <Typography variant="h3" fontWeight="700">
                ₱1,550
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#39B69A" />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  +9%
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  last year
                </Typography>
              </Stack>
            </>
          )}
        </Grid>
        <Grid item xs={5} sm={5}>
          {isLoading ? (
            <Skeleton variant="circular" width={150} height={150} />
          ) : (
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height={150}
              width={'100%'}
            />
          )}
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default CurrentBalance;
