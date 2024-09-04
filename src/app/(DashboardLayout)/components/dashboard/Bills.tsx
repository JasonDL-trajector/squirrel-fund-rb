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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { ConvexError } from 'convex/values';

interface Bill {
  _id: Id<'bills'>;
  name: string;
  amount: number;
  dueDate: Dayjs;
  status: string;
}

const Bills = ({ isLoading }: Loading) => {
  const bills = useQuery(api.bills.listBills);
  const createBill = useMutation(api.bills.createBill);
  const updateBill = useMutation(api.bills.updateBill);
  const deleteBill = useMutation(api.bills.deleteBill);
  const [billsDueDate, setBillsDueDate] = useState<Dayjs | null>(dayjs());
  const [eBillsDueDate, setEBillsDueDate] = useState<Dayjs | null>(dayjs());
  const [openModal, setOpenModal] = useState(false);
  const [editingBill, setEditingBill] = useState<any | null>(null);
  const [newBill, setNewBill] = useState<Omit<any, '_id'>>({
    name: '',
    amount: 0,
    dueDate: dayjs(),
    status: 'Unpaid',
  });

  const handleOpenModal = () => {
    setEditingBill(null);
    setNewBill({ name: '', amount: 0, dueDate: dayjs(), status: 'Unpaid' });
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

      if(!eBillsDueDate) throw new ConvexError("Due date error");

      await updateBill({
        id: editingBill._id,
        name: editingBill.name,
        amount: Number(editingBill.amount),
        dueDate: eBillsDueDate?.format('MMMM D'),
        status: editingBill.status,
      });
    } else {

      if (!billsDueDate) throw new ConvexError("Due date error");

      await createBill({
        name: newBill.name,
        amount: Number(newBill.amount),
        dueDate: billsDueDate?.format('MMMM D'),
        status: newBill.status,
      });
    }
    handleCloseModal();
  };

  const handleBillClick = (bill: any) => {
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
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={30}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={30}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : bills.map((bill) => (
                    <TableRow
                      key={bill._id}
                      onClick={() => handleBillClick(bill)}
                      style={{ cursor: 'pointer' }}
                    >
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
                            backgroundColor: (theme) =>
                              theme.palette.primary.light,
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={editingBill ? eBillsDueDate : billsDueDate}
                  format="MMMM D"
                  onChange={(newValue) => {
                    if (editingBill) {
                      setEBillsDueDate(newValue);
                    } else {
                      setBillsDueDate(newValue);
                    }
                  }}
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
                {editingBill && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteBill}
                  >
                    Delete Bill
                  </Button>
                )}
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
