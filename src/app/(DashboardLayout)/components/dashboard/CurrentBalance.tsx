import { useState, useEffect } from "react";
import { DonutChart } from "@mantine/charts";
import {
  Group,
  Stack,
  Text,
  ActionIcon,
  Skeleton,
  Modal,
  TextInput,
  Button,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { IconArrowUpLeft, IconDeviceFloppy } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import EmptyState from "../shared/EmptyState";
import type { Loading } from "../../types/loading";
import { api } from "../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const CurrentBalance = ({ isLoading }: Loading) => {
  const theme = useMantineTheme();
  const [openModal, setOpenModal] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const primary = theme.colors.blue[6];
  const primarylight = theme.colors.blue[0];
  const successlight = theme.colors.green[0];
  const currentBalanceData = useQuery(api.balances.getCurrentBalance);
  const editCurrentBalance = useMutation(api.balances.editCurrentBalance);

  useEffect(() => {
    if (currentBalanceData) {
      setCurrentBalance(currentBalanceData.balanceAmount);
    }
  }, [currentBalanceData]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBalance(parseFloat(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentBalanceData?._id) {
      console.error("Balance ID is undefined");
      return; // Exit if the ID is not available
    }
    try {
      await editCurrentBalance({
        id: currentBalanceData._id,
        balanceAmount: currentBalance,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update balance:", error);
    }
  };

  const chartData = [
    { name: "Primary", value: 38, color: "var(--mantine-color-blue-6)" },
    { name: "Secondary", value: 40, color: "var(--mantine-color-blue-0)" },
    { name: "Tertiary", value: 25, color: "var(--mantine-color-gray-1)" },
  ];

  return (
    <DashboardCard title="Current Balance">
      <Group gap="lg" align="flex-start">
        <Stack style={{ flex: 1 }}>
          {isLoading ? (
            <>
              <Skeleton height={40} width="80%" radius="md" />
              <Skeleton height={20} width="60%" radius="md" />
              <Skeleton height={20} width="40%" radius="md" />
            </>
          ) : currentBalance === 0 ? (
            <EmptyState
              title="No current balance"
              description="You don't have a recorded current balance yet. Make a deposit to start tracking your balance."
            />
          ) : (
            <>
              <Text
                size="3xl"
                fw={700}
                c="var(--mantine-color-text)"
                style={{ cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                ₱{currentBalance}
              </Text>
              <Group gap="xs" align="center">
                <ActionIcon
                  size="md"
                  variant="filled"
                  color="green"
                  radius="xl"
                  styles={{
                    root: {
                      backgroundColor: "var(--mantine-color-green-0)",
                      transition: "background 120ms ease, transform 120ms ease",
                      "&:hover": {
                        backgroundColor: "var(--mantine-color-green-1)",
                      },
                      "&:active": { transform: "translateY(1px)" },
                    },
                  }}
                >
                  <IconArrowUpLeft size={16} color={theme.colors.green[6]} />
                </ActionIcon>
                <Text size="sm" fw={600} c="green">
                  +9%
                </Text>
                <Text size="sm" c="dimmed">
                  last year
                </Text>
              </Group>

              <Modal
                opened={openModal}
                onClose={handleCloseModal}
                title="Edit Current Balance"
                size="sm"
                centered
                radius="lg"
                zIndex={2000}
                overlayProps={{ blur: 4, opacity: 0.3 }}
                withinPortal
              >
                <form onSubmit={handleSubmit}>
                  <Stack gap="md">
                    <TextInput
                      label="Current Balance"
                      type="number"
                      value={currentBalance}
                      onChange={handleBalanceChange}
                      required
                    />
                    <Group justify="flex-end" gap="sm">
                      <Button
                        type="submit"
                        color="blue"
                        leftSection={<IconDeviceFloppy size={16} />}
                      >
                        Save
                      </Button>
                    </Group>
                  </Stack>
                </form>
              </Modal>
            </>
          )}
        </Stack>
        <Box style={{ width: "150px", height: "150px" }}>
          {isLoading ? (
            <Skeleton height={150} width={150} radius="50%" />
          ) : (
            <DonutChart
              data={chartData}
              size={150}
              thickness={24}
              withTooltip={false}
              withLabels={false}
            />
          )}
        </Box>
      </Group>
    </DashboardCard>
  );
};

export default CurrentBalance;
