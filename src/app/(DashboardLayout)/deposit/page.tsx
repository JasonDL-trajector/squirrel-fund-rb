'use client';

import { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Container,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const DepositPage = () => {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs(),
  ]);
  const [note, setNote] = useState<string>('');
  const currentBalance = 1000; // This should be fetched from your state management or API
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const calculateAmount = () => {
    if (dateRange[0] && dateRange[1]) {
      const days = dateRange[1].diff(dateRange[0], 'day') + 1;
      return days * depositAmount;
    }
    return 0;
  };

  const totalAmount = calculateAmount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Deposit:', {
      amount: totalAmount,
      depositAmount,
      startDate: dateRange[0]?.format('YYYY-MM-DD'),
      endDate: dateRange[1]?.format('YYYY-MM-DD'),
      note,
    });
  };

  const formatDate = (date: Dayjs | null) => {
    if (!date) return '';
    return date
      .toDate()
      .toLocaleString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <PageContainer title="Deposit" description="Deposit funds">
      <Container maxWidth="sm">
        <Box
          sx={{
            transform: isMobile ? 'scale(0.9)' : 'none',
            transformOrigin: 'top center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              marginX: -3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              width: 'screen',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Deposit Funds
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Select a date range and enter the deposit details below.
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                marginTop: '50px',
              }}
            >
              <Box display="flex" flexDirection="column" gap={4} flexGrow={1}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    },
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    slots={{ field: SingleInputDateRangeField }}
                    label="Date Range"
                    value={dateRange}
                    onChange={(newValue) => setDateRange(newValue)}
                    slotProps={{
                      field: {
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                <TextField
                  fullWidth
                  label="Note"
                  multiline
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    },
                  }}
                />

                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Current Balance:
                    </Typography>
                    <Typography variant="h4" fontWeight="medium" align="left">
                      ₱{currentBalance.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="right"
                    >
                      New Balance:
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" align="right">
                      ₱{(currentBalance + totalAmount).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="body2">
                    Total Amount to be added:
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="success.main"
                  >
                    +₱{totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                  <Button
                    variant="outlined"
                    size={isMobile ? 'medium' : 'large'}
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      '&:hover': {
                        borderColor: 'black',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size={isMobile ? 'medium' : 'large'}
                    sx={{
                      bgcolor: 'black',
                      '&:hover': { bgcolor: '#424242' },
                    }}
                  >
                    Deposit
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default DepositPage;
