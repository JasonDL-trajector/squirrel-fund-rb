import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Stack,
  Text,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Box,
  useMantineTheme,
  Skeleton,
  Group,
} from "@mantine/core";
import {
  IconArrowDownRight,
  IconCurrencyPeso,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import EmptyState from "../shared/EmptyState";
import { useUser } from "@clerk/nextjs";
import type { Loading } from "../../types/loading";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DailyDeposit = ({ isLoading }: Loading) => {
  const { user } = useUser();
  const theme = useMantineTheme();
  const [openModal, setOpenModal] = useState(false);
  const [dailydeposit, setDailyDeposit] = useState(
    Number(user?.unsafeMetadata.dailydeposit) || 0
  );
  const secondary = theme.colors.cyan[6];
  const secondarylight = theme.colors.cyan[0];
  const errorlight = theme.colors.red[0];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyDeposit(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await user.update({ unsafeMetadata: { dailydeposit: dailydeposit } });
      handleCloseModal();
    }
  };

  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
    },
  };
  const seriescolumnchart: any = [
    {
      name: "",
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <>
      <DashboardCard
        title="Daily Deposit"
        action={
          <ActionIcon
            size="lg"
            variant="filled"
            color="cyan"
            onClick={handleOpenModal}
            style={{ color: "#ffffff" }}
          >
            <IconCurrencyPeso size={20} />
          </ActionIcon>
        }
        footer={
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height={60}
            width={"100%"}
          />
        }
      >
        <>
          {isLoading ? (
            <Skeleton height={48} width="60%" />
          ) : dailydeposit === 0 ? (
            <EmptyState
              title="Daily deposit not set"
              description="Set a daily deposit amount to start tracking your daily savings."
            />
          ) : (
            <>
              <Text
                size="3xl"
                fw={700}
                mt="-20px"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              >
                ₱{dailydeposit}
              </Text>
              <Box
                style={{
                  display: "flex",
                  gap: theme.spacing.xs,
                  margin: `${theme.spacing.xs} 0`,
                  alignItems: "center",
                }}
              >
                <ActionIcon
                  size="sm"
                  variant="filled"
                  color="red"
                  style={{ backgroundColor: errorlight }}
                >
                  <IconArrowDownRight size={16} color="#FA896B" />
                </ActionIcon>
                <Text size="sm" fw={600}>
                  +9%
                </Text>
                <Text size="sm" c="dimmed">
                  last year
                </Text>
              </Box>
            </>
          )}
        </>
      </DashboardCard>

      <Modal
        opened={openModal}
        onClose={handleCloseModal}
        title="Edit Daily Deposit"
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
              label="Daily Deposit Amount"
              type="number"
              value={dailydeposit}
              onChange={handleDepositChange}
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
  );
};

export default DailyDeposit;
