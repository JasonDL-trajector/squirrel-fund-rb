import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Group, Stack, Text, ActionIcon, Skeleton, Modal, TextInput, Button, useMantineTheme, Box } from "@mantine/core";
import { IconArrowUpLeft } from "@tabler/icons-react";

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

  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title="Current Balance">
      <Group gap="lg" align="flex-start">
        <Stack style={{ flex: 1 }}>
          {isLoading ? (
            <>
              <Skeleton height={40} width="80%" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={20} width="40%" />
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
                style={{ cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                ₱{currentBalance}
              </Text>
              <Group gap="xs" align="center">
                <ActionIcon
                  size="sm"
                  variant="filled"
                  color="green"
                  style={{ backgroundColor: successlight }}
                >
                  <IconArrowUpLeft size={16} color="#39B69A" />
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
                    <Button type="submit" color="blue">
                      Save
                    </Button>
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
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              height={150}
              width={"100%"}
            />
          )}
        </Box>
      </Group>
    </DashboardCard>
  );
};

export default CurrentBalance;
