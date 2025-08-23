"use client";
import React, { useState } from "react";
import {
  Text,
  Table,
  Skeleton,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Select,
  Stack,
  Group,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";

const WithdrawHistory = () => {
  const withdraws = useQuery(api.withdraws.listWithdraws);
  const updateWithdrawal = useMutation(api.withdraws.updateWithdraw);
  const deleteWithdrawal = useMutation(api.withdraws.deleteWithdraws);
  const [openModal, setOpenModal] = useState(false);
  const [editingWithdrawal, setEditingWithdrawal] = useState<any | null>(null);
  const [newWithdrawal, setNewWithdrawal] = useState<Omit<any, "_id">>({
    name: "User",
    withdrawAmount: 0,
    withdrawDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
    withdrawNote: "",
  });

  const handleOpenModal = (withdraw: any) => {
    setEditingWithdrawal(withdraw);
    setNewWithdrawal({
      name: withdraw.name,
      withdrawAmount: withdraw.withdrawAmount,
      withdrawDate: withdraw.withdrawDate,
      withdrawNote: withdraw.withdrawNote,
    });
    console.log(newWithdrawal);
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
        withdrawDate: newWithdrawal.withdrawDate,
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
        <ActionIcon
          component={Link}
          href="/withdraw"
          size="lg"
          variant="filled"
          color="blue"
        >
          <IconPlus size={20} />
        </ActionIcon>
      }
    >
      <>
        <div style={{ overflow: "auto", maxWidth: "80vw", maxHeight: "500px" }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Date
                  </Text>
                </Table.Th>
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
                    Note
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!withdraws
                ? Array.from(new Array(5)).map((_, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                    </Table.Tr>
                  ))
                : withdraws.map((withdraw) => (
                    <Table.Tr
                      key={withdraw._id}
                      onClick={() => handleOpenModal(withdraw)}
                      style={{ cursor: "pointer" }}
                    >
                      <Table.Td>
                        <Text size="sm">{withdraw.withdrawDate}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {withdraw.name}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          ₱{withdraw.withdrawAmount.toFixed(2)}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {withdraw.withdrawNote}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </div>
        <Modal
          opened={openModal}
          onClose={handleCloseModal}
          title={editingWithdrawal ? "Edit Withdrawal" : "Add a Withdrawal"}
          size="sm"
          centered
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Name"
                name="name"
                value={newWithdrawal.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Amount"
                name="withdrawAmount"
                type="number"
                value={newWithdrawal.withdrawAmount}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Withdrawal Date"
                name="withdrawDate"
                value={newWithdrawal.withdrawDate}
                onChange={(e) =>
                  setNewWithdrawal({
                    ...newWithdrawal,
                    withdrawDate: e.target.value,
                  })
                }
                placeholder="e.g., January 15"
                required
              />
              <TextInput
                label="Note"
                name="withdrawNote"
                value={newWithdrawal.withdrawNote}
                onChange={handleInputChange}
              />
              <Group justify="space-between">
                {editingWithdrawal && (
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleDeleteWithdrawal}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" color="blue">
                  {editingWithdrawal ? "Update" : "Add"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default WithdrawHistory;
