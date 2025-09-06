"use client";
import React, { useState } from "react";
import {
  Text,
  Skeleton,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Stack,
  Group,
  Box,
  Container,
} from "@mantine/core";
import {
  IconPlus,
  IconChevronRight,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { formatDisplayDate, ensureYear } from "@/utils/date";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

const DepositsHistory = () => {
  const deposits = useQuery(api.deposits.listDeposits);
  const updateDeposit = useMutation(api.deposits.updateDeposit);
  const deleteDeposit = useMutation(api.deposits.deleteDeposits);
  const [openModal, setOpenModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<any | null>(null);
  const [newDeposit, setNewDeposit] = useState<Omit<any, "_id">>({
    name: "",
    depositAmount: 0,
    depositDate: new Date(),
    depositNote: "",
  });

  const handleOpenModal = (deposit: any) => {
    setEditingDeposit(deposit);
    setNewDeposit({
      name: deposit.name,
      depositAmount: deposit.depositAmount,
      // Convert stored string date to Date object for DatePicker
      depositDate: new Date(deposit.depositDate),
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
        depositDate: formatDisplayDate(newDeposit.depositDate),
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
        <Group justify="space-between" align="flex-start" mb="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Text size="3xl" fw={800} mb="xs">
              Deposits
            </Text>
            <Text size="sm" c="dimmed">
              Tap a row to edit or delete.
            </Text>
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

        {!rows || rows.length === 0 ? (
          <Text size="sm" c="dimmed" ta="center" mt="md">
            No deposits yet
          </Text>
        ) : (
          <Box
            style={{
              background: "var(--mantine-color-white)",
              border: "1px solid var(--mantine-color-gray-2)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Stack gap={0}>
              {rows.map((deposit, i) => (
                <Box
                  key={deposit._id}
                  p="md"
                  onClick={() => handleOpenModal(deposit)}
                  style={{
                    cursor: "pointer",
                    background: "var(--mantine-color-white)",
                    borderBottom: "1px solid var(--mantine-color-gray-1)",
                  }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text
                        size="sm"
                        fw={600}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {deposit.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {ensureYear(deposit.depositDate)}
                      </Text>
                      {deposit.depositNote && (
                        <Text
                          size="xs"
                          c="dimmed"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {deposit.depositNote}
                        </Text>
                      )}
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="green">
                        +₱{deposit.depositAmount.toFixed(2)}
                      </Text>
                      <IconChevronRight
                        size={16}
                        color="var(--mantine-color-gray-5)"
                      />
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <Modal
          opened={openModal}
          onClose={handleCloseModal}
          title={editingDeposit ? "Edit Deposit" : "Add a Deposit"}
          size="sm"
          centered
          radius="lg"
          zIndex={2000}
          overlayProps={{ blur: 4, opacity: 0.3 }}
          withinPortal
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Name"
                name="name"
                value={newDeposit.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Amount"
                name="depositAmount"
                leftSection="₱"
                type="number"
                value={newDeposit.depositAmount}
                onChange={handleInputChange}
                required
              />
              <DatePickerInput
                label="Deposit Date"
                placeholder="Select date"
                value={newDeposit.depositDate as Date}
                onChange={(date) =>
                  setNewDeposit({
                    ...newDeposit,
                    depositDate: date ?? new Date(),
                  })
                }
                popoverProps={{
                  withinPortal: true,
                  zIndex: 3001,
                  position: "bottom-start",
                }}
                required
              />
              <TextInput
                label="Note"
                name="depositNote"
                value={newDeposit.depositNote}
                onChange={handleInputChange}
              />
              <Group justify="flex-end" gap="sm" mt={"lg"}>
                {editingDeposit && (
                  <Button
                    type="button"
                    variant="light"
                    color="red"
                    size="sm"
                    onClick={handleDeleteDeposit}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  color="blue"
                  size="sm"
                  leftSection={<IconDeviceFloppy size={16} />}
                >
                  {editingDeposit ? "Update" : "Add"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default DepositsHistory;
