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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const WithdrawPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const [note, setNote] = useState<string>('');
  const currentBalance = 1000; // This should be fetched from your state management or API
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const formatDate = (date: Dayjs | null) => {
    if (!date) return '';
    return date.toDate().toLocaleString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Withdraw:', { amount, date: date.format('YYYY-MM-DD'), note });
  };

  return (
    <PageContainer title="Withdraw" description="Withdraw funds">
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Withdraw Funds
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Enter the withdrawal amount and details below.
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginTop: "50px" }}
          >
            <Box display="flex" flexDirection="column" gap={4} flexGrow={1}>
              <TextField
                fullWidth
                label="Withdraw Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                  inputProps: { min: 0, max: currentBalance, step: 0.01 },
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
                  label="Withdraw Date"
                  value={date}
                  onChange={(newDate) => newDate && setDate(newDate)}
                  slotProps={{
                    textField: {
                      sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                        },
                      },
                    },
                  }}
                  format="MMM DD"
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                label="Enter a note"
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
                  <Typography variant="body2" color="textSecondary" align="right">
                    New Balance:
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: '#e57373' }}
                    align="right"
                  >
                    ₱{(currentBalance - amount).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                <Button 
                  variant="outlined" 
                  size={isMobile ? "medium" : "large"}
                  sx={{ 
                    color: '#e57373', 
                    borderColor: '#e57373',
                    '&:hover': { 
                      borderColor: '#e57373', 
                      backgroundColor: 'rgba(229, 115, 115, 0.04)' 
                    } 
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  disabled={amount > currentBalance}
                  sx={{ bgcolor: '#e57373', '&:hover': { bgcolor: '#e57373' } }}
                >
                  Withdraw
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </PageContainer>
  );
};

export default WithdrawPage;
