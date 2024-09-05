"use client"
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  IconButton,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BalanceHistory = () => {
  const balancesBase = useQuery(api.balances.listBalances);
  const balances = Array.isArray(balancesBase) ? [...balancesBase].reverse() : [];
  const updateBalance = useMutation(api.balances.updateBalance);
  const deleteBalance = useMutation(api.balances.deleteBalance);
  const [openModal, setOpenModal] = useState(false);
  const [editingBalance, setEditingBalance] = useState<any | null>(null);
  const [newBalance, setNewBalance] = useState<Omit<any, '_id'>>({
    balanceAmount: 0,
    balanceDate: dayjs(),
  });

  const handleOpenModal = (balance: any) => {
    setEditingBalance(balance);
    setNewBalance({
      balanceAmount: balance.balanceAmount,
      balanceDate: dayjs(balance.balanceDate),
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBalance({ ...newBalance, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBalance) {
      await updateBalance({
        id: editingBalance._id,
        balanceAmount: Number(newBalance.balanceAmount),
        balanceDate: newBalance.balanceDate.format('MMMM D'),
      })
    }
    handleCloseModal();
  };

  const handleDeleteBalance = async () => {
    if (editingBalance) {
      await deleteBalance({ id: editingBalance._id });
      handleCloseModal();
    }
  };

  return (
    <DashboardCard title="Balance History">
      <>
      <Box sx={{ overflow: 'auto', maxWidth: '80vw', maxHeight: '500px' }}>
        <Table aria-label="balance history table" sx={{ whiteSpace: 'nowrap', mt: 2, borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderLeft: 0, borderTop:0 }}>
                <Typography variant="subtitle2" fontWeight={600}>Date</Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderRight: 0, borderTop:0 }}>
                <Typography variant="subtitle2" fontWeight={600}>Amount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!balances
              ? Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : balances.map((balance) => (
                  <TableRow key={balance._id} onClick={() => handleOpenModal(balance)} style={{ cursor: 'pointer' }}>
                    <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderLeft: 0 }}>
                      <Typography variant="subtitle2">{balance.balanceDate}</Typography>
                    </TableCell>
                    <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderRight: 0 }}>
                      <Typography variant="subtitle2">₱{balance.balanceAmount.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 400 }, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 5, p: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>{editingBalance ? 'Edit Balance' : 'Add a Balance'}</Typography>
          <form onSubmit={handleSubmit} style={{ gap: '2rem'}}>
            <TextField fullWidth label="Amount" name="balanceAmount" type="number" value={newBalance.balanceAmount} onChange={handleInputChange} margin="normal" style={{ marginBottom: '20px' }}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" format="MMMM D" value={newBalance.balanceDate} onChange={(newValue) => setNewBalance({ ...newBalance, balanceDate: newValue })} 
                slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                        },
                      },
                    },
                  }} />
            </LocalizationProvider>
            <Box display="flex" justifyContent="space-between" mt={2}>
              {editingBalance && <Button variant="contained" color="error" onClick={handleDeleteBalance}>Delete</Button>}
              <Button type="submit" variant="contained" color="primary">{editingBalance ? 'Update' : 'Add'}</Button>
            </Box>
          </form>
        </Box>
      </Modal>
      </>
    </DashboardCard>
  );
};

export default BalanceHistory;