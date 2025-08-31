"use client";
import React, { useState } from "react";
import { Text, Skeleton, ActionIcon, Modal, TextInput, Button, Stack, Group, Box, Container } from "@mantine/core";
import { IconPlus, IconChevronRight } from "@tabler/icons-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import PullToRefreshHint from "@/components/PullToRefreshHint";

const DepositsHistory = () => {
  const deposits = useQuery(api.deposits.listDeposits);
  const updateDeposit = useMutation(api.deposits.updateDeposit);
  const deleteDeposit = useMutation(api.deposits.deleteDeposits);
  const [openModal, setOpenModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<any | null>(null);
  const [newDeposit, setNewDeposit] = useState<Omit<any, "_id">>({
    name: "",
    depositAmount: 0,
    depositDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    depositNote: "",
  });

  const handleOpenModal = (deposit: any) => {
    setEditingDeposit(deposit);
    setNewDeposit({
      name: deposit.name,
      depositAmount: deposit.depositAmount,
      depositDate: deposit.depositDate,
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
        depositDate: newDeposit.depositDate,
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

  const rows = Array.isArray(deposits) ? [...deposits].reverse() : undefined;

  return (
    <PageContainer title="Deposits History">
      <Container size="sm" px="md">
        <Group justify="space-between" align="flex-end" mb="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Text size="3xl" fw={800} mb="xs">Deposits</Text>
            <Text size="sm" c="dimmed">Tap a row to edit or delete.</Text>
          </Box>
          <ActionIcon
            component={Link}
            href="/deposit"
            size="lg"
            variant="filled"
            color="blue"
            aria-label="New deposit"
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Group>

        <PullToRefreshHint />
        {(!rows || rows.length === 0) ? (
          <Text size="sm" c="dimmed" ta="center" mt="md">
            No deposits yet
          </Text>
        ) : (
          <Box className="ios-list">
            <Stack gap={0}>
              {rows.map((deposit, i) => (
                <Box
                  key={deposit._id}
                  className="ios-list-item"
                  p="md"
                  onClick={() => handleOpenModal(deposit)}
                  style={{ cursor: "pointer" }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text size="sm" fw={600} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deposit.name}</Text>
                      <Text size="xs" c="dimmed">{deposit.depositDate}</Text>
                      {deposit.depositNote && (
                        <Text size="xs" c="dimmed" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {deposit.depositNote}
                        </Text>
                      )}
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="green">+₱{deposit.depositAmount.toFixed(2)}</Text>
                      <IconChevronRight size={16} color="#8E8E93" />
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <Modal opened={openModal} onClose={handleCloseModal} title={editingDeposit ? "Edit Deposit" : "Add a Deposit"} size="sm" centered>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput label="Name" name="name" value={newDeposit.name} onChange={handleInputChange} required />
              <TextInput label="Amount" name="depositAmount" type="number" value={newDeposit.depositAmount} onChange={handleInputChange} required />
              <TextInput label="Deposit Date" name="depositDate" value={newDeposit.depositDate} onChange={(e) => setNewDeposit({ ...newDeposit, depositDate: e.target.value })} placeholder="e.g., January 15" required />
              <TextInput label="Note" name="depositNote" value={newDeposit.depositNote} onChange={handleInputChange} />
              <Group justify="space-between">
                {editingDeposit && (
                  <Button variant="filled" color="red" onClick={handleDeleteDeposit}>Delete</Button>
                )}
                <Button type="submit" color="blue">{editingDeposit ? "Update" : "Add"}</Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default DepositsHistory;
