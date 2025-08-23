import React, { useState } from "react";
import {
  Text,
  Table,
  Badge,
  Skeleton,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Select,
  Group,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import type { Loading } from "../../types/loading";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ConvexError } from "convex/values";

const Bills = ({ isLoading }: Loading) => {
  const bills = useQuery(api.bills.listBills);
  const createBill = useMutation(api.bills.createBill);
  const updateBill = useMutation(api.bills.updateBill);
  const deleteBill = useMutation(api.bills.deleteBill);
  const theme = useMantineTheme();
  const [openModal, setOpenModal] = useState(false);
  const [editingBill, setEditingBill] = useState<any | null>(null);
  const [newBill, setNewBill] = useState<Omit<any, "_id">>({
    name: "",
    amount: 0,
    dueDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
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
        >
          <IconPlus size={20} />
        </ActionIcon>
      }
    >
      <>
        <div style={{ overflow: "auto", maxWidth: "80vw" }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Name
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Amount
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Status
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Due Date
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading || !bills
                ? Array.from(new Array(5)).map((_, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={30} width={80} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={30} width={80} />
                      </Table.Td>
                    </Table.Tr>
                  ))
                : bills.map((bill) => (
                    <Table.Tr
                      key={bill._id}
                      onClick={() => handleBillClick(bill)}
                      style={{ cursor: "pointer" }}
                    >
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {bill.name}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          ₱{bill.amount.toFixed(2)}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getStatusColor(bill.status)}
                          variant="light"
                          size="sm"
                        >
                          {bill.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" variant="light" size="sm">
                          {bill.dueDate}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </div>
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
                placeholder="e.g., January 15"
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
