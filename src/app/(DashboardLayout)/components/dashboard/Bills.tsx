import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

// Updated mock data for bills with status
const billsData = [
  { id: '1', name: 'Electricity', amount: 120.5, dueDate: '2023-05-15', status: 'Unpaid' },
  { id: '2', name: 'Water', amount: 45.75, dueDate: '2023-05-20', status: 'Paid' },
  { id: '3', name: 'Internet', amount: 79.99, dueDate: '2023-05-25', status: 'Unpaid' },
  { id: '4', name: 'Rent', amount: 1200.0, dueDate: '2023-06-01', status: 'Paid' },
  { id: '5', name: 'Phone', amount: 65.0, dueDate: '2023-05-18', status: 'Unpaid' },
];

const Bills = () => {
  return (
    <DashboardCard title="Bills To Pay">
      <Box sx={{ overflow: 'auto', width: { xs: 'auto', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billsData.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {bill.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {bill.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    ₱{bill.amount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: '4px',
                      backgroundColor: (theme) => theme.palette.primary.light,
                      color: (theme) => theme.palette.primary.main,
                    }}
                    size="small"
                    label={bill.dueDate}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: '4px',
                      backgroundColor: (theme) =>
                        bill.status === 'Paid'
                          ? theme.palette.success.light
                          : theme.palette.error.light,
                      color: (theme) =>
                        bill.status === 'Paid'
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                    size="small"
                    label={bill.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default Bills;
