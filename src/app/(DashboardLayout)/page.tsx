"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, Stack, Text, useMantineTheme, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import BalanceHistory from "@/app/(DashboardLayout)/components/dashboard/BalanceHistory";
import CurrentBalance from "@/app/(DashboardLayout)/components/dashboard/CurrentBalance";
import RecentDeposits from "@/app/(DashboardLayout)/components/dashboard/RecentDeposits";
import RecentWithdrawals from "@/app/(DashboardLayout)/components/dashboard/RecentWithdrawals";
import Bills from "@/app/(DashboardLayout)/components/dashboard/Bills";
import DailyDeposit from "@/app/(DashboardLayout)/components/dashboard/DailyDeposit";
import TabularSummary from "./components/dashboard/TabularSummary";

const Dashboard = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer title="Squirrel Fund" description="Squirrel Fund">
      <Stack
        gap="lg"
        pb="xl"
        styles={{ root: { backgroundColor: "var(--mantine-color-gray-0)" } }}
      >
        <Box>
          <Text
            size="3xl"
            fw={800}
            c="var(--mantine-color-text)"
            mt="xs"
            mb="xs"
          >
            Dashboard
          </Text>
        </Box>

        <Box p="md">
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2 }}
            spacing="md"
            style={{ alignItems: "stretch" }}
          >
            <Box style={{ width: "100%", height: "100%" }}>
              <CurrentBalance isLoading={isLoading} />
            </Box>
            <Box style={{ width: "100%", height: "100%" }}>
              <DailyDeposit isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box p="md">
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2 }}
            spacing="md"
            style={{ alignItems: "stretch" }}
          >
            <Box style={{ width: "100%", height: "100%" }}>
              <BalanceHistory isLoading={isLoading} />
            </Box>
            <Box style={{ width: "100%", height: "100%" }}>
              <TabularSummary isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box p="md">
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2 }}
            spacing="md"
            style={{ alignItems: "stretch" }}
          >
            <Box style={{ width: "100%", height: "100%" }}>
              <RecentDeposits isLoading={isLoading} />
            </Box>
            <Box style={{ width: "100%", height: "100%" }}>
              <RecentWithdrawals isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box p="md" pb="xl">
          <Bills isLoading={isLoading} />
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default Dashboard;
