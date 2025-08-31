"use client";

import { useState } from "react";
import { SimpleGrid, TextInput, Button, Text, Container, ActionIcon, Stack, Group, useMantineTheme, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconTablePlus } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import '@mantine/dates/styles.css';
import { showNotification } from '@mantine/notifications';
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DepositPage = () => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const createDeposit = useMutation(api.deposits.createDeposit);
  const createBalance = useMutation(api.balances.createBalance);
  const router = useRouter();
  const [depositAmount, setDepositAmount] = useState(
    Number(user?.unsafeMetadata.dailydeposit) || 0
  );
  // Mantine v8 DatePicker supports range mode. Store range as string tuple 'YYYY-MM-DD'.
  // You can toggle to single DatePicker with type="range" if you prefer one input.
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
  const [note, setNote] = useState<string>("");
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);

  let currentBalance = 0;
  if (currentBalanceData) {
    currentBalance = currentBalanceData.balanceAmount;
  }

  const daysInRange = dateRange[0] && dateRange[1]
  ? Math.ceil((new Date(dateRange[1]!).getTime() - new Date(dateRange[0]!).getTime()) / (1000 * 60 * 60 * 24)) + 1
  : 1;
const totalAmount = depositAmount * daysInRange;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    const [startStr, endStr] = dateRange;
    if (startStr && endStr) {
      const start = new Date(startStr);
      const end = new Date(endStr);
 
      // Calculate inclusive number of days in the range
      const daysInRange = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
 
      // Calculate daily deposit amount
      const dailyAmount = depositAmount;
 
      // Create deposits for each day in the range (await each to ensure backend consistency)
      for (let i = 0; i < daysInRange; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
 
        // Backend stores full date with year to allow accurate comparisons
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
          depositNote: note,
        });
 
        await createBalance({
          balanceAmount: Number(currentBalance) + dailyAmount * (i + 1),
          balanceDate: depositDateString,
        });
      }
 
      // show success notification and redirect to dashboard after successful submission
      showNotification({
        title: "Deposit successful",
        message: `Added ₱${totalAmount.toFixed(2)} to your balance`,
        color: "green",
      });
      router.push("/");
    } else {
      console.error("Date range not selected");
    }
  };

  return (
    <PageContainer title="Deposit">
      <Container size="sm" px="md">
        <Box>
          <Group justify="space-between" align="center" mb="md">
            <Box style={{ minWidth: 0, flex: 1 }}>
              <Text size="3xl" fw={800} mb="xs">
                Deposit Funds
              </Text>
              <Text size="sm" c="dimmed">
                Select a date range and enter the deposit details below. The amount will be distributed evenly across the selected days.
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
              <Box className="ios-card" style={{ padding: 12 }}>
                <Stack gap="md">
                  <TextInput
                    label="Amount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    leftSection="₱"
                    required
                  />

                  <DatePickerInput
                    type="range"
                    label="Deposit Date Range"
                    placeholder="Pick date range"
                    value={dateRange}
                    onChange={setDateRange}
                    allowSingleDateInRange
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
                      ₱{currentBalance + totalAmount}
                    </Text>
                  </Box>
                </SimpleGrid>
                <Box mt="sm">
                  {dateRange[0] && dateRange[1] && (
                    <>
                      <Text size="sm">Total Amount to be added:</Text>
                    </>
                  )}
                  <Text size="lg" fw={700} c="green">
                    +₱{totalAmount.toFixed(2)}
                  </Text>
                </Box>
              </Box>

              <Stack mt="md">
                <Button type="submit" variant="filled" color="blue" size={isMobile ? "md" : "lg"} fullWidth>
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
