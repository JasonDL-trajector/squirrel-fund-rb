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
import { parseToISO, formatDisplayDate } from "@/utils/date";

const BalanceHistory = ({ isLoading }: Loading) => {
  const listBalances = useQuery(api.balances.listBalances);

  // chart color and responsive
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  // Prepare data for the chart: robust parsing + chronological order
  const base = Array.isArray(listBalances) ? listBalances : [];
  const hydrated = base.map((b: any) => ({
    ...b,
    iso: typeof b.balanceDate === "string" ? parseToISO(b.balanceDate) : null,
  }));
  const valid = hydrated.filter((b: any) => b.iso !== null);
  const sorted = valid.sort(
    (a: any, b: any) => new Date(a.iso!).getTime() - new Date(b.iso!).getTime()
  );
  const chartData = sorted.map((b: any) => ({
    date: b.iso!,
    Balance: Number(b.balanceAmount) || 0,
  }));

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
              xAxisProps={{
                tickFormatter: (value: string) => formatDisplayDate(value),
              }}
              tooltipProps={{
                labelFormatter: (value: string) => formatDisplayDate(value),
              }}
            />
          )}
        </DashboardCard>
      </Link>
    </>
  );
};

export default BalanceHistory;
