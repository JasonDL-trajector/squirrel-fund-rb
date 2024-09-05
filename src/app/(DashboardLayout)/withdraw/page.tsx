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
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { api } from '../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { calculateAmount, formatDate } from '../utilities/utils';
import Link from 'next/link';
import {IconTableMinus} from '@tabler/icons-react';

dayjs.extend(isSameOrBefore);

const WithdrawPage = () => {
  const { user, isLoaded } = useUser();
  const createWithdraw = useMutation(api.withdraws.createWithdraw);
  const createBalance = useMutation(api.balances.createBalance);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawDate, setWithdrawDate] = useState<Dayjs | null>(dayjs());
  const [note, setNote] = useState<string>('');
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const totalAmount = withdrawAmount;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (withdrawDate) {
      createWithdraw({
        name: user?.firstName ?? 'User',
        withdrawAmount: withdrawAmount,
        withdrawDate: formatDate(withdrawDate),
        withdrawNote: note,
      });

      createBalance({
        balanceAmount: Number(currentBalance) - withdrawAmount,
        balanceDate: formatDate(withdrawDate),
      });
    } else {
      console.error('No date selected');
    }
  };

  return (
    <PageContainer title="Withdraw" description="Withdraw funds">
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

            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Withdraw Funds
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Select a date and enter the withdrawal details below.
                </Typography>
              </div>

              <Box>
                <Link href='/withdraw/history'>
                <IconButton color="primary">
                  <IconTableMinus />
                </IconButton>
                </Link>
              </Box>
            </div>
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
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
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
                  <DatePicker
                    label="Withdrawal Date"
                    format="MMMM D"
                    value={withdrawDate}
                    onChange={(newDate) => setWithdrawDate(newDate)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
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
                      ₱{currentBalance - totalAmount}
                    </Typography>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="body2">
                    Amount to be withdrawn:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    -₱{withdrawAmount.toFixed(2)}
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
                    disabled={totalAmount > currentBalance}
                    sx={{
                      bgcolor: 'black',
                      '&:hover': { bgcolor: '#424242' },
                    }}
                  >
                    Withdraw
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

export default WithdrawPage;
