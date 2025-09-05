import React, { useState } from "react";
import { Text, Badge, Skeleton, ActionIcon, Modal, TextInput, Button, Select, Group, Stack, Box } from "@mantine/core";
import { IconPlus, IconChevronRight } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import type { Loading } from "../../types/loading";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { formatDisplayDate, ensureYear } from "@/utils/date";

const Bills = ({ isLoading }: Loading) => {
  const bills = useQuery(api.bills.listBills);
  const createBill = useMutation(api.bills.createBill);
  const updateBill = useMutation(api.bills.updateBill);
  const deleteBill = useMutation(api.bills.deleteBill);
  const [openModal, setOpenModal] = useState(false);
  const [editingBill, setEditingBill] = useState<any | null>(null);
  const [newBill, setNewBill] = useState<Omit<any, "_id">>({
    name: "",
    amount: 0,
    dueDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    status: "Unpaid",
  });

  const handleOpenModal = () => {
    setEditingBill(null);
    setNewBill({
      name: "",
      amount: 0,
      dueDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: "Unpaid",
    });
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

  const handleStatusChange = (value: string | null) => {
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
        dueDate: formatDisplayDate(editingBill.dueDate),
        status: editingBill.status,
      });
    } else {
      await createBill({
        name: newBill.name,
        amount: Number(newBill.amount),
        dueDate: formatDisplayDate(newBill.dueDate),
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

  const getStatusColor = (status: string) => {
    return status === "Paid" ? "green" : "red";
  };

  return (
    <DashboardCard
      title="Bills To Pay"
      action={
        <ActionIcon
          size="lg"
          variant="filled"
          color="blue"
          onClick={handleOpenModal}
          aria-label="Add bill"
        >
          <IconPlus size={20} />
        </ActionIcon>
      }
    >
      <>
        <PullToRefreshHint />
        <Box className="ios-list">
          <Stack gap={0}>
            {isLoading || !bills
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Box key={i} className="ios-list-item" p="md">
                    <Skeleton height={18} radius="sm" />
                  </Box>
                ))
              : bills.map((bill) => (
                  <Box
                    key={bill._id}
                    className="ios-list-item"
                    p="md"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBillClick(bill)}
                  >
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <Stack gap={2} style={{ minWidth: 0 }}>
                        <Text size="sm" fw={600} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {bill.name}
                        </Text>
                        <Text size="xs" c="dimmed">Due {ensureYear(bill.dueDate)}</Text>
                      </Stack>
                      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Badge color={getStatusColor(bill.status)} variant="light" size="sm">
                          {bill.status}
                        </Badge>
                        <Text size="sm" fw={600}>₱{bill.amount.toFixed(2)}</Text>
                        <IconChevronRight size={16} color="#8E8E93" />
                      </Group>
                    </Group>
                  </Box>
                ))}
          </Stack>
        </Box>
        <Modal
          opened={openModal}
          onClose={handleCloseModal}
          title={editingBill ? "Edit Bill" : "Add a Bill"}
          size="sm"
          centered
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Bill Name"
                name="name"
                value={editingBill ? editingBill.name : newBill.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Amount"
                name="amount"
                type="number"
                value={editingBill ? editingBill.amount : newBill.amount}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Due Date"
                name="dueDate"
                value={editingBill ? editingBill.dueDate : newBill.dueDate}
                onChange={handleInputChange}
                placeholder="e.g., January 15, 2025"
                required
              />
              <Select
                label="Status"
                value={editingBill ? editingBill.status : newBill.status}
                onChange={handleStatusChange}
                data={[
                  { value: "Unpaid", label: "Unpaid" },
                  { value: "Paid", label: "Paid" },
                ]}
                required
              />
              <Group justify="space-between">
                {editingBill && (
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleDeleteBill}
                  >
                    Delete Bill
                  </Button>
                )}
                <Button type="submit" color="blue">
                  {editingBill ? "Update Bill" : "Add Bill"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default Bills;
