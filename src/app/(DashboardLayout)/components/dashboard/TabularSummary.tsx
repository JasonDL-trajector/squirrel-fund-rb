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
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

const useStyles = makeStyles({
  tableRow: {
    height: 48,
  },
  tableCell: {
    padding: '8px 16px',
  },
  tableContainer: {
    maxHeight: 400, 
    overflow: 'auto',
  },
});

const TabularSummary = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listDeposits);
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

  const checkDepositExists = (deposits: any, email: string, date: string) => {
    return deposits.some((deposit: { email: string; depositDate: string; }) => 
      deposit.email === email && 
      deposit.depositDate === date 
    );
  };

  return (
    <Card sx={{ padding: 1.5, height: '100%', transform: isMobile ? 'scale(0.95)' : 'none', transformOrigin: 'top center' }} elevation={3}>
      <CardHeader title="Tabular Summary" sx={{ paddingBottom: 3, borderBottom: "solid 1px #E5E5E5" }}/>
      <CardContent>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table size="small" aria-label="tabular summary" stickyHeader>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="center">Date</TableCell>
                <TableCell className={classes.tableCell} align="center">Jason</TableCell>
                <TableCell className={classes.tableCell} align="center">Ely</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <TableBody>
              {dateRange.map((date, index) => {
                const jasonDepositExists = checkDepositExists(deposits, 'jasondl0517@gmail.com', date);
                const elyDepositExists = checkDepositExists(deposits, 'deunachristelanne@gmail.com', date);
            
                return (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography variant="body2">{date}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {jasonDepositExists ? <CheckIcon color="success" fontSize="small" /> : null}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {elyDepositExists ? <CheckIcon color="success" fontSize="small" /> : null}
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