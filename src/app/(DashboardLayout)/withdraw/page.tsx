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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
//
import Link from "next/link";
// Schema factory will be defined inside component
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { IconTableMinus } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const WithdrawPage = () => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createWithdraw = useMutation(api.withdraws.createWithdraw);
  const createBalance = useMutation(api.balances.createBalance);
  const router = useRouter();
  const peso = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const makeWithdrawSchema = (currentBalance: number) =>
    z
      .object({
        amount: z.coerce.number().positive("Enter amount"),
        withdrawDate: z.date({ required_error: "Select a withdrawal date" }),
        note: z.string().max(100).optional(),
      })
      .superRefine((v, ctx) => {
        if (v.amount > currentBalance) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["amount"],
            message: "Amount exceeds available balance",
          });
        }
      });

  const withdrawSchema = makeWithdrawSchema(currentBalance);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      amount: 0,
      withdrawDate: new Date(),
      note: "",
    },
    validate: zodResolver(withdrawSchema),
  });

  const amount = Number(form.values.amount ?? 0);
  const withdrawDate = form.values.withdrawDate;

  const totalAmount = amount;

  const handleSubmit = form.onSubmit(async (values) => {
    if (values.withdrawDate) {
      const withdrawDateString = values.withdrawDate.toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

      await createWithdraw({
        name: user?.firstName ?? "User",
        withdrawAmount: values.amount,
        withdrawDate: withdrawDateString,
        withdrawNote: values.note,
      });

      await createBalance({
        balanceAmount: Number(currentBalance) - Number(values.amount),
        balanceDate: withdrawDateString,
      });

      showNotification({
        title: "Withdraw successful",
        message: `Withdrew ${peso.format(values.amount)} from your balance`,
        color: "red",
      });
      router.push("/");
    } else {
      console.error("No date selected");
    }
  });

  return (
    <PageContainer title="Withdraw" description="Withdraw funds">
      <Container size="sm" px="md">
        <Box>
          <Group justify="space-between" align="center" mb="md">
            <Box style={{ minWidth: 0, flex: 1 }}>
              <Text size="3xl" fw={800} mb="xs">
                Withdraw Funds
              </Text>
              <Text size="sm" c="dimmed">
                Select a date and enter the withdrawal details below.
              </Text>
            </Box>

            <ActionIcon
              component={Link}
              href="/withdraw/history"
              size="lg"
              variant="filled"
              color="blue"
              aria-label="Withdraw history"
            >
              <IconTableMinus size={20} />
            </ActionIcon>
          </Group>

          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Box className="ios-card" style={{ padding: 12 }}>
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
                    label="Withdrawal Date"
                    placeholder="Select date"
                    required
                    {...form.getInputProps("withdrawDate")}
                    key={form.key("withdrawDate")}
                  />

                  <TextInput
                    label="Note"
                    {...form.getInputProps("note")}
                    key={form.key("note")}
                  />
                </Stack>
              </Box>

              <Box className="ios-card" style={{ padding: 12 }}>
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
                      {peso.format(currentBalance - totalAmount)}
                    </Text>
                  </Box>
                </SimpleGrid>
                <Box mt="sm">
                  <Text size="sm">Amount to be withdrawn:</Text>
                  <Text size="lg" fw={700} c="red">
                    -{peso.format(amount)}
                  </Text>
                </Box>
              </Box>

              <Stack mt="md">
                <Button
                  type="submit"
                  variant="filled"
                  color="blue"
                  size={isMobile ? "md" : "lg"}
                  disabled={amount > currentBalance}
                  fullWidth
                >
                  Withdraw
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default WithdrawPage;
