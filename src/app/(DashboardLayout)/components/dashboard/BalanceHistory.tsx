import React from 'react';
import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import type { Loading } from '../../types/loading';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

const BalanceHistory = ({ isLoading }: Loading) => {
  const listBalances = useQuery(api.balances.listBalances);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // Prepare data for the chart
  const categories = listBalances?.map(balance => balance.balanceDate) || [];
  const balanceData = listBalances?.map(balance => balance.balanceAmount) || [];

  // chart options
  const optionscolumnchart: any = {
    chart: {
      type: 'line',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      tickAmount: Math.min(5, categories.length),
      labels: {
        rotate: -45, 
        style: {
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: 'Balance',
      data: balanceData,
    },
  ];

  return (
    <DashboardCard title="Balance History" >
      {isLoading || !listBalances ? (
        <Skeleton variant="rectangular" width="100%" height={370} />
      ) : (
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="line"
          height={370}
          width={'100%'}
        />
      )}
    </DashboardCard>
  );
};

export default BalanceHistory;
