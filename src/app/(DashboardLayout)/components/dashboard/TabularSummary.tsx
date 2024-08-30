import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@mui/styles';
import type { Loading } from '../../types/loading';

// Mock data (in a real application, this would come from an API or props)
const mockDeposits = [
  { name: 'jay', depositDate: '2024-07-10', amount: 100 },
  { name: 'ely', depositDate: '2024-07-10', amount: 150 },
  { name: 'jay', depositDate: '2024-07-15', amount: 200 },
  { name: 'ely', depositDate: '2024-07-20', amount: 175 },
  { name: 'jay', depositDate: '2024-07-25', amount: 125 },
  { name: 'ely', depositDate: '2024-07-30', amount: 225 },
  // Add more mock data as needed
];

const useStyles = makeStyles({
  tableRow: {
    height: 48,
  },
  tableCell: {
    padding: '8px 16px',
  },
  tableContainer: {
    maxHeight: 400, // Set a fixed height for the table container
    overflow: 'auto', // Enable scrolling
  },
});

const TabularSummary = ({ isLoading }: Loading) => {
  const [deposits] = useState(mockDeposits);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const generateDateRange = () => {
      const startDate = new Date('2024-07-08');
      const endDate = new Date();
      const dates = [];

      while (startDate <= endDate) {
        dates.push(startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
        startDate.setDate(startDate.getDate() + 1);
      }

      setDateRange(dates.reverse());
      setLoading(false);
    };

    setTimeout(() => {
      generateDateRange();
    }, 1000);
  }, []);

  const LoadingSkeleton = () => (
    <TableBody>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index} className={classes.tableRow}>
          <TableCell className={classes.tableCell} align="center">
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <Skeleton variant="circular" width={24} height={24} />
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <Skeleton variant="circular" width={24} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ padding: 1.5, height: '100%', transform: isMobile ? 'scale(0.95)' : 'none', transformOrigin: 'top center' }} elevation={3} variant={undefined}>
      <CardHeader title="Tabular Summary" />
      <CardContent>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table size="small" aria-label="tabular summary" stickyHeader>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="center">
                  Date
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  jay
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  ely
                </TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <TableBody>
                {dateRange.map((date, index) => {
                  const jasonDeposit = deposits.find(
                    (deposit) =>
                      new Date(deposit.depositDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      }) === date && deposit.name === 'jay'
                  );
                  const elyDeposit = deposits.find(
                    (deposit) =>
                      new Date(deposit.depositDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      }) === date && deposit.name === 'ely'
                  );

                  return (
                    <TableRow key={index} className={classes.tableRow}>
                      <TableCell className={classes.tableCell} align="center">
                        <Typography variant="body2">{date}</Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        {jasonDeposit ? (
                          <CheckIcon color="success" fontSize="small" />
                        ) : null}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        {elyDeposit ? (
                          <CheckIcon color="success" fontSize="small" />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TabularSummary;
