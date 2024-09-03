import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Modal, TextField, Button, Box } from '@mui/material';
import { IconArrowDownRight, IconCurrencyPeso } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useUser } from '@clerk/nextjs';
import type { Loading } from '../../types/loading';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DailyDeposit = ({ isLoading }: Loading) => {
  const { user } = useUser();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [dailydeposit, setDailyDeposit] = useState(Number(user?.unsafeMetadata.dailydeposit) || 0);
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyDeposit(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await user.update({ unsafeMetadata: {dailydeposit: dailydeposit} });
      handleCloseModal();
    }
  };

  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: any = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <>
      <DashboardCard
        title="Daily Deposit"
        action={
          <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }} onClick={handleOpenModal}>
            <IconCurrencyPeso width={24} />
          </Fab>
        }
        footer={
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height={60}
            width={'100%'}
          />
        }
      >
        <>
          <Typography variant="h3" fontWeight="700" mt="-20px" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
            ₱{dailydeposit}
          </Typography>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
              <IconArrowDownRight width={20} color="#FA896B" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>
        </>
      </DashboardCard>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-deposit-modal"
        aria-describedby="modal-to-edit-daily-deposit"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 5,
          p: 4,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Daily Deposit
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Daily Deposit Amount"
              type="text"
              value={dailydeposit}
              onChange={handleDepositChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DailyDeposit;