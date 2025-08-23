"use client";

import { useState } from "react";
import {
  SimpleGrid,
  TextInput,
  Button,
  Text,
  Paper,
  Container,
  ActionIcon,
  Stack,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { calculateAmount, formatDate } from "../utilities/utils";
import Link from "next/link";
import { IconTableMinus } from "@tabler/icons-react";

const WithdrawPage = () => {
  const { user, isLoaded } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createWithdraw = useMutation(api.withdraws.createWithdraw);
  const createBalance = useMutation(api.balances.createBalance);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawDate, setWithdrawDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })
  );
  const [note, setNote] = useState<string>("");
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const totalAmount = withdrawAmount;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (withdrawDate) {
      createWithdraw({
        name: user?.firstName ?? "User",
        withdrawAmount: withdrawAmount,
        withdrawDate: withdrawDate,
        withdrawNote: note,
      });

      createBalance({
        balanceAmount: Number(currentBalance) - withdrawAmount,
        balanceDate: withdrawDate,
      });
    } else {
      console.error("No date selected");
    }
  };

  return (
    <PageContainer title="Withdraw" description="Withdraw funds">
      <Container size="sm">
        <div
          style={{
            transform: isMobile ? "scale(0.9)" : "none",
            transformOrigin: "top center",
          }}
        >
          <Paper
            shadow="md"
            p="xl"
            style={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Group justify="space-between" mb="lg">
              <div>
                <Text size="xl" fw={600} mb="xs">
                  Withdraw Funds
                </Text>
                <Text size="sm" c="dimmed">
                  Select a date and enter the withdrawal details below.
                </Text>
              </div>

              <ActionIcon
                component={Link}
                href="/withdraw/history"
                size="lg"
                variant="filled"
                color="blue"
              >
                <IconTableMinus size={20} />
              </ActionIcon>
            </Group>

            <form
              onSubmit={handleSubmit}
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
              }}
            >
              <Stack gap="lg" style={{ flexGrow: 1 }}>
                <TextInput
                  label="Amount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  leftSection="₱"
                  required
                />

                <TextInput
                  label="Withdrawal Date"
                  value={withdrawDate}
                  onChange={(e) => setWithdrawDate(e.target.value)}
                  placeholder="e.g., January 15"
                  required
                />

                <TextInput
                  label="Note"
                  multiline
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <SimpleGrid cols={2} gap="md">
                  <div>
                    <Text size="sm" c="dimmed">
                      Current Balance:
                    </Text>
                    <Text size="xl" fw={500}>
                      ₱{currentBalance}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed" ta="right">
                      New Balance:
                    </Text>
                    <Text size="xl" fw={700} ta="right">
                      ₱{currentBalance - totalAmount}
                    </Text>
                  </div>
                </SimpleGrid>

                <div>
                  <Text size="sm">Amount to be withdrawn:</Text>
                  <Text size="lg" fw={700} c="red">
                    -₱{withdrawAmount.toFixed(2)}
                  </Text>
                </div>

                <Group justify="flex-end" gap="md" mt="lg">
                  <Button
                    variant="outlined"
                    size={isMobile ? "md" : "lg"}
                    color="gray"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="filled"
                    color="blue"
                    size={isMobile ? "md" : "lg"}
                    disabled={totalAmount > currentBalance}
                  >
                    Withdraw
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </div>
      </Container>
    </PageContainer>
  );
};

export default WithdrawPage;
