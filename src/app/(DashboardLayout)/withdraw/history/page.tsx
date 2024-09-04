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
  Chip,
  Skeleton,
  IconButton,
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useQuery, useMutation } from 'convex/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../../../../../convex/_generated/api';

const WithdrawHistory = () => {
  const withdraws = useQuery(api.withdraws.listWithdraws);
  const updateWithdrawal = useMutation(api.withdraws.updateWithdraw);
  const deleteWithdrawal = useMutation(api.withdraws.deleteWithdraws);
  const [openModal, setOpenModal] = useState(false);
  const [editingWithdrawal, setEditingWithdrawal] = useState<any | null>(null);
  const [newWithdrawal, setNewWithdrawal] = useState<Omit<any, '_id'>>({
    name: '',
    withdrawAmount: 0,
    withdrawDate: dayjs(),
    withdrawNote: '',
  });

  const handleOpenModal = (withdraw: any) => {
    setEditingWithdrawal(withdraw);
    setNewWithdrawal({
      name: withdraw.name,
      withdrawAmount: withdraw.withdrawAmount,
      withdrawDate: dayjs(withdraw.withdrawDate),
      withdrawNote: withdraw.withdrawNote,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWithdrawal({ ...newWithdrawal, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWithdrawal) {
      await updateWithdrawal({
        id: editingWithdrawal._id,
        name: newWithdrawal.name,
        withdrawAmount: Number(newWithdrawal.withdrawAmount),
        withdrawDate: newWithdrawal.withdrawDate.format('MMMM D'),
        withdrawNote: newWithdrawal.withdrawNote,
      });
    }
    handleCloseModal();
  };

  const handleDeleteWithdrawal = async () => {
    if (editingWithdrawal) {
      await deleteWithdrawal({ id: editingWithdrawal._id });
      handleCloseModal();
    }
  };

  return (
    <DashboardCard
      title="Withdrawals History"
      action={
        <Box>
          <IconButton color="primary" onClick={() => handleOpenModal(null)}>
            <AddIcon />
          </IconButton>
        </Box>
      }
    >
      <>
        <Box sx={{ overflow: 'auto', maxWidth: '80vw', maxHeight: '500px' }}>
          <Table
            aria-label="withdrawals table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
              overflow: 'auto',
              borderCollapse: 'collapse',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0, borderLeft: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Amount
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0, borderRight: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Note
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!withdraws
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
                : withdraws.map((withdraw) => (
                    <TableRow
                      key={withdraw._id}
                      onClick={() => handleOpenModal(withdraw)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderLeft: 0 }}>
                        <Typography variant="subtitle2">
                          {withdraw.withdrawDate}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {withdraw.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          ₱{withdraw.withdrawAmount.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderRight: 0 }}>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {withdraw.withdrawNote}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="edit-withdrawal-modal"
          aria-describedby="modal-to-edit-withdrawal"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {editingWithdrawal ? 'Edit Withdrawal' : 'Add a Withdrawal'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newWithdrawal.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Amount"
                name="withdrawAmount"
                type="text"
                value={newWithdrawal.withdrawAmount}
                onChange={handleInputChange}
                margin="normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Withdrawal Date"
                  value={newWithdrawal.withdrawDate}
                  format="MMMM D"
                  onChange={(newValue) => setNewWithdrawal({ ...newWithdrawal, withdrawDate: newValue })}
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
                name="withdrawNote"
                value={newWithdrawal.withdrawNote}
                onChange={handleInputChange}
                margin="normal"
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                {editingWithdrawal && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteWithdrawal}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                  {editingWithdrawal ? 'Update' : 'Add'}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default WithdrawHistory;