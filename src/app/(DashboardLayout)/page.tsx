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
      <Stack gap="lg">
        <Box>
          <Text size="3xl" fw={800} mb="sm">Dashboard</Text>
        </Box>
        <Box>
          <Text size="xs" c="dimmed" mb={4}>
            Overview
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'md'}>
            <Box style={{ width: '100%' }}>
              <CurrentBalance isLoading={isLoading} />
            </Box>
            <Box style={{ width: '100%' }}>
              <DailyDeposit isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          <Text size="xs" c="dimmed" mb={4}>
            Activity
          </Text>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
            <Box style={{ width: '100%' }}>
              <BalanceHistory isLoading={isLoading} />
            </Box>
            <Box style={{ width: '100%' }}>
              <TabularSummary isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          <Text size="xs" c="dimmed" mb={4}>
            Recent
          </Text>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
            <Box style={{ width: '100%' }}>
              <RecentDeposits isLoading={isLoading} />
            </Box>
            <Box style={{ width: '100%' }}>
              <RecentWithdrawals isLoading={isLoading} />
            </Box>
          </SimpleGrid>
        </Box>

        <Box style={{ marginBottom: theme.spacing.xl }}>
          <Text size="xs" c="dimmed" mb={4}>
            Scheduled
          </Text>
          <Bills isLoading={isLoading} />
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default Dashboard;
