import React, { useState } from 'react';
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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@mui/styles';

// Mock data (in a real application, this would come from an API or props)
const mockDeposits = [
  { name: 'jay', depositDate: '2023-04-10', amount: 100 },
  { name: 'ely', depositDate: '2023-04-10', amount: 150 },
  { name: 'jay', depositDate: '2023-04-12', amount: 200 },
  { name: 'ely', depositDate: '2023-04-13', amount: 175 },
  { name: 'jay', depositDate: '2023-04-14', amount: 125 },
  { name: 'ely', depositDate: '2023-04-15', amount: 225 },
];

const mockWeek = [
  'April 10',
  'April 11',
  'April 12',
  'April 13',
  'April 14',
  'April 15',
  'April 16',
];

const useStyles = makeStyles({
  tableRow: {
    height: 48,
  },
  tableCell: {
    padding: '8px 16px',
  },
});

const TabularSummary = () => {
  const [deposits] = useState(mockDeposits);
  const classes = useStyles();

  return (
    <Card elevation={9} variant={undefined}>
      <CardHeader title="Tabular Summary" />
      <CardContent>
        <TableContainer component={Paper} style={{ paddingBottom: '16px' }}>
          <Table size="small" aria-label="tabular summary">
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
            <TableBody>
              {mockWeek.map((date, index) => {
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
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TabularSummary;
