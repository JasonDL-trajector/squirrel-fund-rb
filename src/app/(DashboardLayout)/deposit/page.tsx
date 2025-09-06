"use client";
import { useMemo, useState } from "react";
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
  dateRange: z
    .array(z.coerce.date().nullable())
    .length(2, { message: "Select a start and end date" })
    .refine(([s, e]) => !!s && !!e && s.getTime() <= e.getTime(), {
      message: "Select a start and end date",
    }),
  note: z.string().max(100).optional(),
});

const DepositPage = () => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createDepositsBatch = useMutation(api.deposits.createDepositsBatch);
  const createBalancesBatch = useMutation(api.balances.createBalancesBatch);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const amount = Number(form.values.amount ?? 0);
  const [start, end] = form.values.dateRange ?? [null, null];

  const { daysInRange, totalAmount } = useMemo(() => {
    const [s, e] = form.values.dateRange ?? [null, null];
    const toDate = (val: unknown): Date | null => {
      if (!val) return null;
      const d = val instanceof Date ? val : new Date(val as any);
      return Number.isNaN(d.getTime()) ? null : d;
    };
    const sDate = toDate(s);
    const eDate = toDate(e);
    const amountVal = Number(form.values.amount ?? 0);
    if (sDate && eDate) {
      const startOnly = new Date(sDate);
      startOnly.setHours(0, 0, 0, 0);
      const endOnly = new Date(eDate);
      endOnly.setHours(0, 0, 0, 0);
      const msPerDay = 1000 * 60 * 60 * 24;
      const diff = Math.floor((endOnly.getTime() - startOnly.getTime()) / msPerDay) + 1;
      const days = Math.max(diff, 1);
      return { daysInRange: days, totalAmount: amountVal * days };
    }
    return { daysInRange: 1, totalAmount: amountVal };
  }, [form.values.amount, form.values.dateRange]);

  const handleSubmit = form.onSubmit(
    async (values) => {
      setIsSubmitting(true);
      const [start, end] = values.dateRange;
      const startDate = start ? (start instanceof Date ? start : new Date(start as any)) : null;
      const endDate = end ? (end instanceof Date ? end : new Date(end as any)) : null;

      console.log("Submitting deposit:", {
        values,
        start,
        end,
        startDate,
        endDate,
        currentBalance,
      });

      if (
        startDate &&
        endDate &&
        !Number.isNaN(startDate.getTime()) &&
        !Number.isNaN(endDate.getTime())
      ) {
        const daysInRangeLocal =
          Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const dailyAmount = Number(values.amount);

        // Build batch payloads
        const deposits: Array<{
          name: string;
          email: string;
          depositAmount: number;
          depositDate: string;
          depositNote: string;
        }> = [];
        const balances: Array<{
          balanceAmount: number;
          balanceDate: string;
        }> = [];

        for (let i = 0; i < daysInRangeLocal; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);

          const depositDateString = currentDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          deposits.push({
            name: user?.firstName ?? "User",
            email: String(user?.emailAddresses?.[0]?.emailAddress ?? "") || "User",
            depositAmount: dailyAmount,
            depositDate: depositDateString,
            depositNote: values.note ?? "",
          });

          balances.push({
            balanceAmount: Number(currentBalance) + dailyAmount * (i + 1),
            balanceDate: depositDateString,
          });
        }

        try {
          await Promise.all([
            createDepositsBatch({ deposits }),
            createBalancesBatch({ balances }),
          ]);

          showNotification({
            title: "Deposit successful",
            message: `Added ${peso.format(dailyAmount * daysInRangeLocal)} to your balance`,
            color: "green",
          });
          router.push("/");
        } catch (err: any) {
          console.error("Deposit failed", err);
          showNotification({
            title: "Deposit failed",
            message: err?.message || "Something went wrong while depositing.",
            color: "red",
          });
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
        console.error("Date range not selected or invalid", { start, end, startDate, endDate });
        showNotification({
          title: "Validation error",
          message: "Please select a valid start and end date.",
          color: "red",
        });
      }
    },
    (validationErrors) => {
      console.error("Form validation errors", validationErrors);
      showNotification({
        title: "Validation error",
        message: "Please fix the highlighted fields and try again.",
        color: "red",
      });
      setIsSubmitting(false);
    }
  );

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
                    allowSingleDateInRange
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
                  loading={isSubmitting}
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
