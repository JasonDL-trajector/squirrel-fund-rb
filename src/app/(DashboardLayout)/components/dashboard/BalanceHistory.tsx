import React from "react";
import { Skeleton, useMantineTheme } from "@mantine/core";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { AreaChart } from "@mantine/charts";
import EmptyState from "../shared/EmptyState";
import type { Loading } from "../../types/loading";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

const BalanceHistory = ({ isLoading }: Loading) => {
  const listBalances = useQuery(api.balances.listBalances);

  // chart color and responsive
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  // Prepare data for the chart (ensure chronological order and valid Date parsing)
  const sortedBalances = (Array.isArray(listBalances) ? [...listBalances] : []).sort(
    (a: any, b: any) =>
      new Date(a.balanceDate).getTime() - new Date(b.balanceDate).getTime()
  );

  // convert sorted balances into Mantine AreaChart data format
  const chartData = sortedBalances.map((b: any) => {
    const parsed = new Date(b.balanceDate);
    // use ISO date string (YYYY-MM-DD) as dataKey so Mantine renders x-axis nicely
    const dateKey = !isNaN(parsed.getTime())
      ? parsed.toISOString().slice(0, 10)
      : String(b.balanceDate);
    return {
      date: dateKey,
      Balance: Number(b.balanceAmount) || 0,
    };
  });

  return (
    <>
      <Link href="/balance-history" style={{ textDecoration: "none" }}>
        <DashboardCard title="Balance History">
          {isLoading ? (
            <Skeleton height={isMobile ? 80 : 320} width="100%" />
          ) : Array.isArray(listBalances) && listBalances.length === 0 ? (
            <EmptyState
              title="No balance history"
              description="You haven't recorded any balances yet. Make a deposit to create your first balance."
            />
          ) : (
            <AreaChart
              h={isMobile ? 80 : 320}
              data={chartData}
              dataKey="date"
              series={[{ name: "Balance", color: "blue.6" }]}
              curveType="monotone"
            />
          )}
        </DashboardCard>
      </Link>
    </>
  );
};

export default BalanceHistory;
