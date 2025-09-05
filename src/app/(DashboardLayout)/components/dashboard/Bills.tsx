import React, { useState } from "react";
import {
  Text,
  Badge,
  Skeleton,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Select,
  Group,
  Stack,
  Box,
} from "@mantine/core";
import { IconPlus, IconChevronRight } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import type { Loading } from "../../types/loading";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { formatDisplayDate, ensureYear } from "@/utils/date";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const billSchema = z.object({
  name: z
    .string()
    .min(1, "Bill name is required")
    .max(100, "Name cannot exceed 100 characters"),
  amount: z.number().positive("Amount must be greater than 0"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["Unpaid", "Paid"], { required_error: "Status is required" }),
});

const Bills = ({ isLoading }: Loading) => {
  const bills = useQuery(api.bills.listBills);
  const createBill = useMutation(api.bills.createBill);
  const updateBill = useMutation(api.bills.updateBill);
  const deleteBill = useMutation(api.bills.deleteBill);
  const [openModal, setOpenModal] = useState(false);
  const [editingBill, setEditingBill] = useState<any | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      amount: 0,
      dueDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: "Unpaid" as "Unpaid" | "Paid",
    },
    validate: zodResolver(billSchema),
  });

  const handleOpenModal = () => {
    setEditingBill(null);
    form.reset();
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = form.onSubmit(async (values) => {
    if (editingBill) {
      await updateBill({
        id: editingBill._id,
        name: values.name,
        amount: Number(values.amount),
        dueDate: formatDisplayDate(values.dueDate),
        status: values.status,
      });
    } else {
      await createBill({
        name: values.name,
        amount: Number(values.amount),
        dueDate: formatDisplayDate(values.dueDate),
        status: values.status,
      });
    }
    handleCloseModal();
  });

  const handleBillClick = (bill: any) => {
    setEditingBill(bill);
    form.setValues({
      name: bill.name,
      amount: bill.amount,
      dueDate: bill.dueDate,
      status: bill.status,
    });
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
                        <Text
                          size="sm"
                          fw={600}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bill.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          Due {ensureYear(bill.dueDate)}
                        </Text>
                      </Stack>
                      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Badge
                          color={getStatusColor(bill.status)}
                          variant="light"
                          size="sm"
                        >
                          {bill.status}
                        </Badge>
                        <Text size="sm" fw={600}>
                          ₱{bill.amount.toFixed(2)}
                        </Text>
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
                required
                {...form.getInputProps("name")}
                key={form.key("name")}
              />
              <TextInput
                label="Amount"
                type="number"
                required
                {...form.getInputProps("amount")}
                key={form.key("amount")}
              />
              <TextInput
                label="Due Date"
                placeholder="e.g., January 15, 2025"
                required
                {...form.getInputProps("dueDate")}
                key={form.key("dueDate")}
              />
              <Select
                label="Status"
                data={[
                  { value: "Unpaid", label: "Unpaid" },
                  { value: "Paid", label: "Paid" },
                ]}
                required
                {...form.getInputProps("status")}
                key={form.key("status")}
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
