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
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DashboardCard from '../shared/DashboardCard';
import type { Loading } from '../../types/loading';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

interface Bill {
  _id: Id<"bills">;
  name: string;
  amount: number;
  dueDate: string;
  status: string;
}

const Bills = ({ isLoading }: Loading) => {
  const bills = useQuery(api.bills.listBills);
  const createBill = useMutation(api.bills.createBill);
  const updateBill = useMutation(api.bills.updateBill);
  const deleteBill = useMutation(api.bills.deleteBill);
  const [openModal, setOpenModal] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [newBill, setNewBill] = useState<Omit<Bill, '_id'>>({
    name: '',
    amount: 0,
    dueDate: '',
    status: 'Unpaid',
  });

  const handleOpenModal = () => {
    setEditingBill(null);
    setNewBill({ name: '', amount: 0, dueDate: '', status: 'Unpaid' });
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingBill) {
      setEditingBill({ ...editingBill, [name]: value });
    } else {
      setNewBill({ ...newBill, [name]: value });
    }
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    if (editingBill) {
      setEditingBill({ ...editingBill, status: value });
    } else {
      setNewBill({ ...newBill, status: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBill) {
      await updateBill({
        id: editingBill._id,
        name: editingBill.name,
        amount: Number(editingBill.amount),
        dueDate: editingBill.dueDate,
        status: editingBill.status,
      });
    } else {
      await createBill({
        name: newBill.name,
        amount: Number(newBill.amount),
        dueDate: newBill.dueDate,
        status: newBill.status,
      });
    }
    handleCloseModal();
  };

  const handleBillClick = (bill: Bill) => {
    setEditingBill(bill);
    setOpenModal(true);
  };

  const handleDeleteBill = async () => {
    if (editingBill) {
      await deleteBill({ id: editingBill._id });
      handleCloseModal();
    }
  };

  return (
    <DashboardCard 
      title="Bills To Pay"
      action={
        <Box>
          <IconButton color="primary" onClick={handleOpenModal}>
            <AddIcon />
          </IconButton>
        </Box>
      }
    >
      <>
      <Box sx={{ overflow: 'auto', maxWidth: '80vw' }}>
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
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Due Date
                </Typography>
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading || !bills
              ? Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
                    <TableCell><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
                  </TableRow>
                ))
              : bills.map((bill) => (
                  <TableRow key={bill._id} onClick={() => handleBillClick(bill)} style={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {bill.name}
                      </Typography>
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
                    
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-edit-bill-modal"
        aria-describedby="modal-to-add-or-edit-bill"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 5,
          p: 4,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {editingBill ? 'Edit Bill' : 'Add a Bill'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Bill Name"
              name="name"
              value={editingBill ? editingBill.name : newBill.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={editingBill ? editingBill.amount : newBill.amount}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Due Date"
              name="dueDate"
              type="date"
              value={editingBill ? editingBill.dueDate : newBill.dueDate}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={editingBill ? editingBill.status : newBill.status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteBill}
                disabled={!editingBill}
              >
                Delete Bill
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editingBill ? 'Update Bill' : 'Add Bill'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      </>
    </DashboardCard>
  );
};

export default Bills;
