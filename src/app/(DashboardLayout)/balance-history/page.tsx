"use client";
import React, { useState } from "react";
import {
  Text,
  Skeleton,
  Modal,
  TextInput,
  Button,
  Stack,
  Group,
  Box,
  Container,
  NumberInput,
} from "@mantine/core";
import {
  IconChevronRight,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { formatDisplayDate, ensureYear } from "@/utils/date";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

const balanceSchema = z.object({
  balanceAmount: z.coerce.number().nonnegative("Enter a valid amount"),
  balanceDate: z
    .string()
    .min(1, "Enter a valid date")
    .refine(
      (date) => {
        // Validate date format and ensure it's a valid date
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
      },
      { message: "Enter a valid date format" }
    ),
});

const BalanceHistory = () => {
  const balancesBase = useQuery(api.balances.listBalances);
  const balances = Array.isArray(balancesBase)
    ? [...balancesBase].reverse()
    : [];
  const updateBalance = useMutation(api.balances.updateBalance);
  const deleteBalance = useMutation(api.balances.deleteBalance);
  const [openModal, setOpenModal] = useState(false);
  const [editingBalance, setEditingBalance] = useState<any | null>(null);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      balanceAmount: 0,
      balanceDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    },
    validate: zodResolver(balanceSchema),
  });

  const handleOpenModal = (balance: any) => {
    setEditingBalance(balance);
    form.setValues({
      balanceAmount: balance.balanceAmount,
      balanceDate: ensureYear(balance.balanceDate),
    });
    form.clearErrors();
    form.setTouched({ balanceAmount: false, balanceDate: false });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = form.onSubmit(async (values) => {
    if (!editingBalance) return;
    try {
      await updateBalance({
        id: editingBalance._id,
        balanceAmount: Number(values.balanceAmount),
        balanceDate: formatDisplayDate(values.balanceDate),
      });
      notifications.show({
        title: "Balance updated",
        message: "Balance has been updated successfully",
        color: "green",
      });
      handleCloseModal();
    } catch (e) {
      notifications.show({
        title: "Update failed",
        message: e instanceof Error ? e.message : "An error occurred",
        color: "red",
      });
    }
  });

  const handleDeleteBalance = async () => {
    if (!editingBalance) return;
    try {
      await deleteBalance({ id: editingBalance._id });
      notifications.show({
        title: "Balance deleted",
        message: "Balance has been deleted successfully",
        color: "green",
      });
      handleCloseModal();
    } catch (e) {
      notifications.show({
        title: "Delete failed",
        message: e instanceof Error ? e.message : "An error occurred",
        color: "red",
      });
    }
  };

  return (
    <PageContainer title="Balance History">
      <Container size="sm" px="md">
        <Group justify="space-between" align="flex-end" mb="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Text size="3xl" fw={800} mb="xs">
              Balance History
            </Text>
            <Text size="sm" c="dimmed">
              Tap a row to edit or delete.
            </Text>
          </Box>
        </Group>

        <Box
          style={{
            background: "var(--mantine-color-white)",
            border: "1px solid var(--mantine-color-gray-2)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Stack gap={0}>
            {balancesBase === undefined
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Box
                    key={i}
                    p="md"
                    style={{
                      borderBottom: "1px solid var(--mantine-color-gray-1)",
                    }}
                  >
                    <Skeleton height={18} radius="sm" />
                  </Box>
                ))
              : balances.map((balance: any, i: number) => (
                  <Box
                    key={balance._id}
                    p="md"
                    onClick={() => handleOpenModal(balance)}
                    style={{
                      cursor: "pointer",
                      background: "var(--mantine-color-white)",
                      borderBottom: "1px solid var(--mantine-color-gray-1)",
                    }}
                  >
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <Text size="sm" c="dimmed">
                        {ensureYear(balance.balanceDate)}
                      </Text>
                      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Text size="sm" fw={600}>
                          ₱{balance.balanceAmount.toFixed(2)}
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

        <Modal
          opened={openModal}
          onClose={handleCloseModal}
          title={editingBalance ? "Edit Balance" : "Add a Balance"}
          size="sm"
          centered
          radius="lg"
          zIndex={2000}
          overlayProps={{ blur: 4, opacity: 0.3 }}
          withinPortal
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <NumberInput
                label="Amount"
                leftSection="₱"
                min={0}
                {...form.getInputProps("balanceAmount")}
                key={form.key("balanceAmount")}
              />
              <TextInput
                label="Date"
                {...form.getInputProps("balanceDate")}
                key={form.key("balanceDate")}
                placeholder="e.g., January 15, 2025"
              />
              <Group justify="flex-end" gap="sm">
                {editingBalance && (
                  <Button
                    type="button"
                    variant="light"
                    color="red"
                    leftSection={<IconTrash size={16} />}
                    onClick={handleDeleteBalance}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  color="blue"
                  leftSection={<IconDeviceFloppy size={16} />}
                >
                  {editingBalance ? "Update" : "Add"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default BalanceHistory;
