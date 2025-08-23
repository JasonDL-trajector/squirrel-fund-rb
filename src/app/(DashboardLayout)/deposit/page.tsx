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
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { IconTablePlus } from "@tabler/icons-react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { calculateAmount, formatDate } from "../utilities/utils";
import Link from "next/link";

const DepositPage = () => {
  const { user, isLoaded } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createDeposit = useMutation(api.deposits.createDeposit);
  const createBalance = useMutation(api.balances.createBalance);
  const [depositAmount, setDepositAmount] = useState(
    Number(user?.unsafeMetadata.dailydeposit) || 0
  );
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })
  );
  const [note, setNote] = useState<string>("");
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  // Simplified calculation - for now just use the deposit amount
  const totalAmount = depositAmount;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startDate) {
      // For now, create a single deposit with the current date
      createDeposit({
        name: user?.firstName ?? "User",
        email: String(user?.emailAddresses) ?? "User",
        depositAmount: depositAmount,
        depositDate: startDate,
        depositNote: note,
      });

      createBalance({
        balanceAmount: Number(currentBalance) + totalAmount,
        balanceDate: startDate,
      });
    } else {
      console.error("No date selected");
    }
  };

  return (
    <PageContainer title="Deposit">
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
                  Deposit Funds
                </Text>
                <Text size="sm" c="dimmed">
                  Select a date range and enter the deposit details below.
                </Text>
              </div>

              <ActionIcon
                component={Link}
                href="/deposit/history"
                size="lg"
                variant="filled"
                color="blue"
              >
                <IconTablePlus size={20} />
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
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  leftSection="₱"
                  required
                />

                <SimpleGrid cols={2} gap="md">
                  <TextInput
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="e.g., January 15"
                    required
                  />
                  <TextInput
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="e.g., January 20"
                    required
                  />
                </SimpleGrid>

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
                      ₱{currentBalance + totalAmount}
                    </Text>
                  </div>
                </SimpleGrid>

                <div>
                  <Text size="sm">Total Amount to be added:</Text>
                  <Text size="lg" fw={700} c="green">
                    +₱{totalAmount.toFixed(2)}
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
                  >
                    Deposit
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

export default DepositPage;
