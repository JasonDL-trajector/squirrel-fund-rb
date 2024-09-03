import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Skeleton, Modal, Box, TextField, Button } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import type { Loading } from '../../types/loading';
import { api } from '../../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

const CurrentBalance = ({ isLoading }: Loading) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);
  const editCurrentBalance = useMutation(api.balances.editCurrentBalance);

  useEffect(() => {
    if (currentBalanceData) {
      setCurrentBalance(currentBalanceData.balanceAmount);
    }
  }, [currentBalanceData]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBalance(parseFloat(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentBalanceData?._id) {
        console.error('Balance ID is undefined');
        return; // Exit if the ID is not available
    }
    try {
        await editCurrentBalance({
            id: currentBalanceData._id,
            balanceAmount: currentBalance,
        });
        handleCloseModal();
    } catch (error) {
        console.error('Failed to update balance:', error);
    }
};

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
              <Typography variant="h3" fontWeight="700" onClick={handleOpenModal}>
                ₱{currentBalance}
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

              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="edit-balance-modal"
                aria-describedby="modal-to-edit-current-balance"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 5,
                    p: 4,
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom>
                    Edit Current Balance
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Current Balance"
                      type="number"
                      value={currentBalance}
                      onChange={handleBalanceChange}
                      margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </form>
                </Box>
              </Modal>
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