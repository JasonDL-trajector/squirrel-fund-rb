"use client";

import { useState } from "react";
import {
  SimpleGrid,
  TextInput,
  Button,
  Text,
  Container,
  ActionIcon,
  Stack,
  Group,
  useMantineTheme,
  Box,
  Paper,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconTablePlus } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { showNotification } from "@mantine/notifications";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
const depositSchema = z.object({
  amount: z.coerce.number().positive("Enter amount"),
  dateRange: z.tuple([z.date(), z.date()]).refine(([s, e]) => s <= e, {
    message: "Select a start and end date",
  }),
  note: z.string().max(100).optional(),
});

const DepositPage = () => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createDeposit = useMutation(api.deposits.createDeposit);
  const createBalance = useMutation(api.balances.createBalance);
  const router = useRouter();
  const peso = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const form = useForm({
    mode: "controlled",
    initialValues: {
      amount: Number(user?.unsafeMetadata.dailydeposit) || 0,
      dateRange: [null, null] as [Date | null, Date | null],
      note: "",
    },
    validate: zodResolver(depositSchema),
  });
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const amount = Number(form.values.amount ?? 0);
  const [start, end] = form.values.dateRange ?? [null, null];

  const daysInRange =
    start && end
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 1;
  const totalAmount = amount * daysInRange;

  const handleSubmit = form.onSubmit(async (values) => {
    const [start, end] = values.dateRange;
    if (start && end) {
      const daysInRange =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;

      const dailyAmount = Number(values.amount);

      for (let i = 0; i < daysInRange; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        const depositDateString = currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        await createDeposit({
          name: user?.firstName ?? "User",
          email: String(user?.emailAddresses) ?? "User",
          depositAmount: dailyAmount,
          depositDate: depositDateString,
          depositNote: values.note,
        });

        await createBalance({
          balanceAmount: Number(currentBalance) + dailyAmount * (i + 1),
          balanceDate: depositDateString,
        });
      }

      showNotification({
        title: "Deposit successful",
        message: `Added ${peso.format(totalAmount)} to your balance`,
        color: "green",
      });
      router.push("/");
    } else {
      console.error("Date range not selected");
    }
  });

  return (
    <PageContainer title="Deposit">
      <Container size="sm" px="md">
        <Box>
          <Group justify="space-between" align="flex-start" mb="md">
            <Box style={{ minWidth: 0, flex: 1 }}>
              <Text size="3xl" fw={800} mb="xs">
                Deposit Funds
              </Text>
              <Text size="sm" c="dimmed">
                Select a date range and enter the deposit details below. The
                amount will be distributed evenly across the selected days.
              </Text>
            </Box>

            <ActionIcon
              component={Link}
              href="/deposit/history"
              size="lg"
              variant="filled"
              color="blue"
              aria-label="Deposit history"
            >
              <IconTablePlus size={20} />
            </ActionIcon>
          </Group>

          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Paper
                p="md"
                styles={{
                  root: {
                    background: "var(--mantine-color-white)",
                    border: "1px solid var(--mantine-color-gray-2)",
                    borderRadius: 12,
                  },
                }}
              >
                <Stack gap="md">
                  <TextInput
                    label="Amount"
                    type="number"
                    leftSection="₱"
                    required
                    {...form.getInputProps("amount")}
                    key={form.key("amount")}
                  />

                  <DatePickerInput
                    type="range"
                    label="Deposit Date Range"
                    placeholder="Pick date range"
                    {...form.getInputProps("dateRange")}
                    key={form.key("dateRange")}
                  />

                  <TextInput
                    label="Note"
                    {...form.getInputProps("note")}
                    key={form.key("note")}
                  />
                </Stack>
              </Paper>

              <Paper
                p="md"
                styles={{
                  root: {
                    background: "var(--mantine-color-white)",
                    border: "1px solid var(--mantine-color-gray-2)",
                    borderRadius: 12,
                  },
                }}
              >
                <SimpleGrid cols={2} spacing="md">
                  <Box>
                    <Text size="sm" c="dimmed">
                      Current Balance:
                    </Text>
                    <Text size="xl" fw={500}>
                      {peso.format(currentBalance)}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed" ta="right">
                      New Balance:
                    </Text>
                    <Text size="xl" fw={700} ta="right">
                      {peso.format(currentBalance + totalAmount)}
                    </Text>
                  </Box>
                </SimpleGrid>
                <Box mt="sm">
                  {start && end && (
                    <>
                      <Text size="sm">Total Amount to be added:</Text>
                    </>
                  )}
                  <Text size="lg" fw={700} c="green">
                    +{peso.format(totalAmount)}
                  </Text>
                </Box>
              </Paper>

              <Stack mt="md">
                <Button
                  type="submit"
                  variant="filled"
                  color="blue"
                  size={isMobile ? "md" : "lg"}
                  fullWidth
                >
                  Deposit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default DepositPage;
