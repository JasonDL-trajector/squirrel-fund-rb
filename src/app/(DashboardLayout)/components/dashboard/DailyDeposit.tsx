import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Stack,
  Text,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowDownRight, IconCurrencyPeso } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
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
          <Text
            size="3xl"
            fw={700}
            mt="-20px"
            onClick={handleOpenModal}
            style={{ cursor: "pointer" }}
          >
            ₱{dailydeposit}
          </Text>
          <Stack direction="row" gap="xs" my="xs" align="center">
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
          </Stack>
        </>
      </DashboardCard>

      <Modal
        opened={openModal}
        onClose={handleCloseModal}
        title="Edit Daily Deposit"
        size="sm"
        centered
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
            <Button type="submit" color="blue">
              Save
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default DailyDeposit;
