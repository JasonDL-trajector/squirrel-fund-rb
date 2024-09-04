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
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../../../../../convex/_generated/api';
import { ConvexError } from 'convex/values';
import Link from 'next/link';

const DepositsHistory = () => {
  const deposits = useQuery(api.deposits.listDeposits);
  const updateDeposit = useMutation(api.deposits.updateDeposit);
  const deleteDeposit = useMutation(api.deposits.deleteDeposits);
  const [openModal, setOpenModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<any | null>(null);
  const [newDeposit, setNewDeposit] = useState<Omit<any, '_id'>>({
    name: '',
    depositAmount: 0,
    depositDate: dayjs(),
    depositNote: '',
  });

  const handleOpenModal = (deposit: any) => {
    setEditingDeposit(deposit);
    setNewDeposit({
      name: deposit.name,
      depositAmount: deposit.depositAmount,
      depositDate: dayjs(deposit.depositDate),
      depositNote: deposit.depositNote,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDeposit({ ...newDeposit, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeposit) {
      await updateDeposit({
        id: editingDeposit._id,
        name: newDeposit.name,
        depositAmount: Number(newDeposit.depositAmount),
        depositDate: newDeposit.depositDate.format('MMMM D'),
        depositNote: newDeposit.depositNote,
      });
    }
    handleCloseModal();
  };

  const handleDeleteDeposit = async () => {
    if (editingDeposit) {
      await deleteDeposit({ id: editingDeposit._id });
      handleCloseModal();
    }
  };

  return (
    <DashboardCard
      title="Deposits History"
      action={
        <Box>
          <Link href='/deposit'>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          </Link>
        </Box>
      }
    >
      <>
        <Box sx={{ overflow: 'auto', maxWidth: '80vw', maxHeight: '500px', }}>
          <Table
            aria-label="deposits table"
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
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0, }}> 
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderTop: 0, borderRight: 0  }}> 
                  <Typography variant="subtitle2" fontWeight={600}>
                    Amount
                  </Typography>
                </TableCell>               
              </TableRow>
            </TableHead>
            <TableBody>
              {!deposits
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
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}> 
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ))
                : deposits.map((deposit) => (
                    <TableRow
                      key={deposit._id}
                      onClick={() => handleOpenModal(deposit)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderLeft: 0 }}> 
                        <Typography variant="subtitle2">
                          {deposit.depositDate}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)' }}> 
                        <Typography variant="subtitle2" fontWeight={600}>
                          {deposit.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(204, 204, 204, 0.2)', borderRight: 0 }}> 
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          ₱{deposit.depositAmount.toFixed(2)}
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
          aria-labelledby="edit-deposit-modal"
          aria-describedby="modal-to-edit-deposit"
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
              {editingDeposit ? 'Edit Deposit' : 'Add a Deposit'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newDeposit.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Amount"
                name="depositAmount"
                type="text"
                value={newDeposit.depositAmount}
                onChange={handleInputChange}
                margin="normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Deposit Date"
                  value={newDeposit.depositDate}
                  format="MMMM D"
                  onChange={(newValue) => setNewDeposit({ ...newDeposit, depositDate: newValue })}
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
                name="depositNote"
                value={newDeposit.depositNote}
                onChange={handleInputChange}
                margin="normal"
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                {editingDeposit && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteDeposit}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                  {editingDeposit ? 'Update' : 'Add'}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default DepositsHistory;