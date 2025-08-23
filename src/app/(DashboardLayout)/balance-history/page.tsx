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
  Stack,
  Group,
} from "@mantine/core";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const BalanceHistory = () => {
  const balancesBase = useQuery(api.balances.listBalances);
  const balances = Array.isArray(balancesBase)
    ? [...balancesBase].reverse()
    : [];
  const updateBalance = useMutation(api.balances.updateBalance);
  const deleteBalance = useMutation(api.balances.deleteBalance);
  const [openModal, setOpenModal] = useState(false);
  const [editingBalance, setEditingBalance] = useState<any | null>(null);
  const [newBalance, setNewBalance] = useState<Omit<any, "_id">>({
    balanceAmount: 0,
    balanceDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
  });

  const handleOpenModal = (balance: any) => {
    setEditingBalance(balance);
    setNewBalance({
      balanceAmount: balance.balanceAmount,
      balanceDate: balance.balanceDate,
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
        balanceDate: newBalance.balanceDate,
      });
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
                    Amount
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!balances
                ? Array.from(new Array(5)).map((_, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                    </Table.Tr>
                  ))
                : balances.map((balance) => (
                    <Table.Tr
                      key={balance._id}
                      onClick={() => handleOpenModal(balance)}
                      style={{ cursor: "pointer" }}
                    >
                      <Table.Td>
                        <Text size="sm">{balance.balanceDate}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          ₱{balance.balanceAmount.toFixed(2)}
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
          title={editingBalance ? "Edit Balance" : "Add a Balance"}
          size="sm"
          centered
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Amount"
                name="balanceAmount"
                type="number"
                value={newBalance.balanceAmount}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Date"
                name="balanceDate"
                value={newBalance.balanceDate}
                onChange={(e) =>
                  setNewBalance({ ...newBalance, balanceDate: e.target.value })
                }
                placeholder="e.g., January 15"
                required
              />
              <Group justify="space-between">
                {editingBalance && (
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleDeleteBalance}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" color="blue">
                  {editingBalance ? "Update" : "Add"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default BalanceHistory;
