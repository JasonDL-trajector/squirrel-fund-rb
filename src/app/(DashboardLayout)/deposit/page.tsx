'use client';

import { useState } from 'react';
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
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateRange } from '@mui/x-date-pickers-pro';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { api } from '../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { calculateAmount, formatDate } from '../utilities/utils';

dayjs.extend(isSameOrBefore);

const DepositPage = () => {
  const { user, isLoaded } = useUser();
  const createDeposit = useMutation(api.deposits.createDeposit);
  const createBalance = useMutation(api.balances.createBalance);
  const [depositAmount, setDepositAmount] = useState(Number(user?.unsafeMetadata.dailydeposit) || 0);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs(),
  ]);
  const [note, setNote] = useState<string>('');
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }


  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const totalAmount = calculateAmount(depositAmount, dateRange);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (dateRange[0]) {
      const startDate = dayjs(dateRange[0]).startOf('day');
      const endDate = dateRange[1] ? dayjs(dateRange[1]).endOf('day') : startDate.endOf('day');
      let currentDate = startDate;
  
      while (currentDate.isSameOrBefore(endDate, 'day')) {
        createDeposit({
          name: user?.firstName ?? 'User',
          email: String(user?.emailAddresses) ?? 'User',
          depositAmount: depositAmount,
          depositDate: formatDate(currentDate),
          depositNote: note,
        });
        currentDate = currentDate.add(1, 'day');
      }
  
      createBalance({
        balanceAmount: Number(currentBalance) + totalAmount,
        balanceDate: formatDate(endDate),
      });
    } else {
      console.error('No date selected');
    }
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
                    onChange={(newValue: DateRange<Dayjs>) => setDateRange(newValue)}
                    slotProps={{
                      field: {
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                          },
                        },
                      },
                      textField: {
                        helperText: 'Select a single date or a date range',
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
                      ₱{currentBalance}
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
                      ₱{(currentBalance + totalAmount)}
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
