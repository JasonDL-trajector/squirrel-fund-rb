"use client";
import React, { useState } from "react";
import { Text, Skeleton, ActionIcon, Modal, TextInput, Button, Stack, Group, Box, Container } from "@mantine/core";
import { IconPlus, IconChevronRight } from "@tabler/icons-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import { formatDisplayDate, ensureYear } from "@/utils/date";

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
      year: "numeric",
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
        withdrawDate: formatDisplayDate(newWithdrawal.withdrawDate),
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

  const rows = Array.isArray(withdraws) ? [...withdraws].reverse() : undefined;

  return (
    <PageContainer title="Withdrawals History">
      <Container size="sm" px="md">
        <Group justify="space-between" align="flex-end" mb="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Text size="3xl" fw={800} mb="xs">Withdrawals</Text>
            <Text size="sm" c="dimmed">Tap a row to edit or delete.</Text>
          </Box>
          <ActionIcon
            component={Link}
            href="/withdraw"
            size="lg"
            variant="filled"
            color="blue"
            aria-label="New withdrawal"
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Group>

        <PullToRefreshHint />
        {(!rows || rows.length === 0) ? (
          <Text size="sm" c="dimmed" ta="center" mt="md">
            No withdrawals yet
          </Text>
        ) : (
          <Box className="ios-list">
            <Stack gap={0}>
              {rows.map((withdraw, i) => (
                <Box
                  key={withdraw._id}
                  className="ios-list-item"
                  p="md"
                  onClick={() => handleOpenModal(withdraw)}
                  style={{ cursor: "pointer" }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text size="sm" fw={600} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{withdraw.name}</Text>
                      <Text size="xs" c="dimmed">{ensureYear(withdraw.withdrawDate)}</Text>
                      {withdraw.withdrawNote && (
                        <Text size="xs" c="dimmed" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {withdraw.withdrawNote}
                        </Text>
                      )}
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="red">-₱{withdraw.withdrawAmount.toFixed(2)}</Text>
                      <IconChevronRight size={16} color="#8E8E93" />
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <Modal opened={openModal} onClose={handleCloseModal} title={editingWithdrawal ? "Edit Withdrawal" : "Add a Withdrawal"} size="sm" centered>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput label="Name" name="name" value={newWithdrawal.name} onChange={handleInputChange} required />
              <TextInput label="Amount" name="withdrawAmount" type="number" value={newWithdrawal.withdrawAmount} onChange={handleInputChange} required />
              <TextInput label="Withdrawal Date" name="withdrawDate" value={newWithdrawal.withdrawDate} onChange={(e) => setNewWithdrawal({ ...newWithdrawal, withdrawDate: e.target.value })} placeholder="e.g., January 15, 2025" required />
              <TextInput label="Note" name="withdrawNote" value={newWithdrawal.withdrawNote} onChange={handleInputChange} />
              <Group justify="space-between">
                {editingWithdrawal && (
                  <Button variant="filled" color="red" onClick={handleDeleteWithdrawal}>Delete</Button>
                )}
                <Button type="submit" color="blue">{editingWithdrawal ? "Update" : "Add"}</Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default WithdrawHistory;
