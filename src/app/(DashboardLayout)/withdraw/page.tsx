"use client";

import { useState } from "react";
import { SimpleGrid, TextInput, Button, Text, Container, ActionIcon, Stack, Group, useMantineTheme, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
//
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showNotification } from '@mantine/notifications';
import { IconTableMinus } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import '@mantine/dates/styles.css';

const WithdrawPage = () => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createWithdraw = useMutation(api.withdraws.createWithdraw);
  const createBalance = useMutation(api.balances.createBalance);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const router = useRouter();
  // Mantine v8 DatePickerInput uses ISO date strings 'YYYY-MM-DD' for value/onChange
  const [withdrawDate, setWithdrawDate] = useState<string | null>(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState<string>("");
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const totalAmount = withdrawAmount;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (withdrawDate) {
      // withdrawDate is an ISO string 'YYYY-MM-DD' from Mantine v8 picker — convert for backend
      const wd = new Date(withdrawDate);
      const withdrawDateString = wd.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
 
      await createWithdraw({
        name: user?.firstName ?? "User",
        withdrawAmount: withdrawAmount,
        withdrawDate: withdrawDateString,
        withdrawNote: note,
      });
 
      await createBalance({
        balanceAmount: Number(currentBalance) - withdrawAmount,
        balanceDate: withdrawDateString,
      });
 
      // show success notification then redirect to dashboard after successful withdraw
      showNotification({
        title: "Withdraw successful",
        message: `Withdrew ₱${withdrawAmount.toFixed(2)} from your balance`,
        color: "red",
      });
      router.push("/");
    } else {
      console.error("No date selected");
    }
  };

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
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      leftSection="₱"
                      required
                    />

                    <DatePickerInput
                      label="Withdrawal Date"
                      placeholder="Select date"
                      value={withdrawDate}
                      onChange={setWithdrawDate}
                      required
                    />

                    <TextInput label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
                  </Stack>
                </Box>

                <Box className="ios-card" style={{ padding: 12 }}>
                  <SimpleGrid cols={2} spacing="md">
                    <Box>
                      <Text size="sm" c="dimmed">
                        Current Balance:
                      </Text>
                      <Text size="xl" fw={500}>
                        ₱{currentBalance}
                      </Text>
                    </Box>
                    <Box>
                      <Text size="sm" c="dimmed" ta="right">
                        New Balance:
                      </Text>
                      <Text size="xl" fw={700} ta="right">
                        ₱{currentBalance - totalAmount}
                      </Text>
                    </Box>
                  </SimpleGrid>
                  <Box mt="sm">
                    <Text size="sm">Amount to be withdrawn:</Text>
                    <Text size="lg" fw={700} c="red">
                      -₱{withdrawAmount.toFixed(2)}
                    </Text>
                  </Box>
                </Box>

                <Stack mt="md">
                  <Button type="submit" variant="filled" color="blue" size={isMobile ? "md" : "lg"} disabled={totalAmount > currentBalance} fullWidth>
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
