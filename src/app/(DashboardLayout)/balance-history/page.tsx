"use client";
import React, { useState } from "react";
import { Text, Skeleton, Modal, TextInput, Button, Stack, Group, Box, Container } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import { formatDisplayDate, ensureYear } from "@/utils/date";

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
      year: "numeric",
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
        balanceDate: formatDisplayDate(newBalance.balanceDate),
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
    <PageContainer title="Balance History">
      <Container size="sm" px="md">
        <Group justify="space-between" align="flex-end" mb="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Text size="3xl" fw={800} mb="xs">Balance History</Text>
            <Text size="sm" c="dimmed">Tap a row to edit or delete.</Text>
          </Box>
        </Group>

        <PullToRefreshHint />
        <Box className="ios-list">
          <Stack gap={0}>
            {!balances
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Box key={i} className="ios-list-item" p="md">
                    <Skeleton height={18} radius="sm" />
                  </Box>
                ))
              : balances.map((balance: any, i: number) => (
                  <Box
                    key={balance._id}
                    className="ios-list-item"
                    p="md"
                    onClick={() => handleOpenModal(balance)}
                    style={{ cursor: "pointer" }}
                  >
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <Text size="sm" c="dimmed">{ensureYear(balance.balanceDate)}</Text>
                      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Text size="sm" fw={600}>₱{balance.balanceAmount.toFixed(2)}</Text>
                        <IconChevronRight size={16} color="#8E8E93" />
                      </Group>
                    </Group>
                  </Box>
                ))}
          </Stack>
        </Box>

        <Modal opened={openModal} onClose={handleCloseModal} title={editingBalance ? "Edit Balance" : "Add a Balance"} size="sm" centered>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput label="Amount" name="balanceAmount" type="number" value={newBalance.balanceAmount} onChange={handleInputChange} required />
              <TextInput label="Date" name="balanceDate" value={newBalance.balanceDate} onChange={(e) => setNewBalance({ ...newBalance, balanceDate: e.target.value })} placeholder="e.g., January 15, 2025" required />
              <Group justify="space-between">
                {editingBalance && (
                  <Button variant="filled" color="red" onClick={handleDeleteBalance}>Delete</Button>
                )}
                <Button type="submit" color="blue">{editingBalance ? "Update" : "Add"}</Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default BalanceHistory;
