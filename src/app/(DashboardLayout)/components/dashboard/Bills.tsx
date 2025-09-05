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
  NumberInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import {
  IconPlus,
  IconChevronRight,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
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
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

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
    setDueDate(new Date());
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = form.onSubmit(async (values) => {
    const dateStr = dueDate
      ? dueDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : values.dueDate;

    if (editingBill) {
      await updateBill({
        id: editingBill._id,
        name: values.name,
        amount: Number(values.amount),
        dueDate: formatDisplayDate(dateStr),
        status: values.status,
      });
    } else {
      await createBill({
        name: values.name,
        amount: Number(values.amount),
        dueDate: formatDisplayDate(dateStr),
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
    // Parse persisted display date back to Date for the picker
    try {
      const parsed = new Date(ensureYear(bill.dueDate));
      setDueDate(isNaN(parsed.getTime()) ? new Date() : parsed);
    } catch {
      setDueDate(new Date());
    }
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
        <Box
          style={{
            background: "var(--mantine-color-white)",
            border: "1px solid var(--mantine-color-gray-2)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Stack gap={0}>
            {isLoading || !bills
              ? Array.from({ length: 5 }).map((_, i) => (
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
              : bills.map((bill) => (
                  <Box
                    key={bill._id}
                    p="md"
                    style={{
                      cursor: "pointer",
                      background: "var(--mantine-color-white)",
                      borderBottom: "1px solid var(--mantine-color-gray-1)",
                    }}
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
          title={editingBill ? "Edit Bill" : "Add a Bill"}
          size="sm"
          centered
          radius="lg"
          zIndex={2000}
          overlayProps={{ blur: 4, opacity: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Bill Name"
                required
                {...form.getInputProps("name")}
                key={form.key("name")}
              />
              <NumberInput
                label="Amount"
                leftSection="₱"
                min={0}
                hideControls
                required
                {...form.getInputProps("amount")}
                key={form.key("amount")}
              />
              <DatePickerInput
                label="Due Date"
                placeholder="Pick date"
                value={dueDate}
                dropdownType="popover"
                popoverProps={{
                  withinPortal: true,
                  zIndex: 3001,
                  position: "bottom-start",
                }}
                onChange={(d: any) => {
                  const next = d instanceof Date ? d : d ? new Date(d) : null;
                  setDueDate(next);
                  const s = next
                    ? next.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "";
                  form.setFieldValue("dueDate", s);
                }}
                required
              />
              {/* Hidden field to satisfy form schema */}
              <TextInput
                type="hidden"
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
                comboboxProps={{
                  withinPortal: true,
                  zIndex: 3001,
                  position: "bottom-start",
                }}
                {...form.getInputProps("status")}
                key={form.key("status")}
              />
              <Group justify="flex-end" gap="sm">
                {editingBill && (
                  <Button
                    type="button"
                    variant="light"
                    color="red"
                    leftSection={<IconTrash size={16} />}
                    onClick={handleDeleteBill}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  color="blue"
                  leftSection={
                    editingBill ? (
                      <IconDeviceFloppy size={16} />
                    ) : (
                      <IconPlus size={16} />
                    )
                  }
                >
                  {editingBill ? "Update" : "Add"}
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
