"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, useMantineTheme } from "@mantine/core";
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
      <div>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={isMobile ? "lg" : "md"}>
          <BalanceHistory isLoading={isLoading} />
          <TabularSummary isLoading={isLoading} />
        </SimpleGrid>

        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={isMobile ? "sm" : "md"}
          mt="md"
        >
          <CurrentBalance isLoading={isLoading} />
          <DailyDeposit isLoading={isLoading} />
        </SimpleGrid>

        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={isMobile ? "lg" : "md"}
          mt="md"
        >
          <RecentDeposits isLoading={isLoading} />
          <RecentWithdrawals isLoading={isLoading} />
        </SimpleGrid>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <Bills isLoading={isLoading} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
