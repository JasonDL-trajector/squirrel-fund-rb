import React, { useState, useEffect } from "react";
import { Text, Table, Skeleton, useMantineTheme, Stack, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import EmptyState from "../shared/EmptyState";
import type { Loading } from "../../types/loading";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

const TabularSummary = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listDeposits);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const generateDateRange = () => {
      const startDate = new Date("2024-07-08");
      const endDate = new Date();
      const dates = [];

      while (startDate <= endDate) {
        dates.push(
          startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        );
        startDate.setDate(startDate.getDate() + 1);
      }

      setDateRange(dates.reverse());
      setLoading(false);
    };

    setTimeout(() => {
      generateDateRange();
    }, 1000);
  }, []);

  const LoadingSkeleton = () => (
    <Table.Tbody>
      {[...Array(10)].map((_, index) => (
        <Table.Tr key={index}>
          <Table.Td align="center">
            <Skeleton height={20} width={100} />
          </Table.Td>
          <Table.Td align="center">
            <Skeleton height={24} width={24} radius="50%" />
          </Table.Td>
          <Table.Td align="center">
            <Skeleton height={24} width={24} radius="50%" />
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );

  const checkDepositExists = (deposits: any, email: string, date: string) => {
    if (!Array.isArray(deposits)) return false;
    // Create a date object from the date string to normalize it
    const targetDate = new Date(date);
    const targetDateString = targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    
    return deposits.some(
      (deposit: { email: string; depositDate: string }) => {
        // Normalize the deposit date for comparison
        const depositDate = new Date(deposit.depositDate);
        const depositDateString = depositDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        
        return deposit.email === email && depositDateString === targetDateString;
      }
    );
  };

  return (
    <DashboardCard title="Tabular Summary">
      <Box style={{ maxHeight: 400, overflow: "auto" }}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th align="center">Date</Table.Th>
              <Table.Th align="center">Jason</Table.Th>
              <Table.Th align="center">Ely</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {loading ? (
            <LoadingSkeleton />
          ) : Array.isArray(deposits) && deposits.length === 0 ? (
            <EmptyState
              title="No deposits yet"
              description="There are no deposits recorded in the system."
            />
          ) : (
            <Table.Tbody>
              {dateRange.map((date, index) => {
                const jasonDepositExists = checkDepositExists(
                  deposits,
                  "jasondl0517@gmail.com",
                  date
                );
                const elyDepositExists = checkDepositExists(
                  deposits,
                  "deunachristelanne@gmail.com",
                  date
                );

                return (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Text size="sm">{date}</Text>
                    </Table.Td>
                    <Table.Td align="center">
                      {jasonDepositExists ? (
                        <IconCheck size={16} color={theme.colors.green[6]} />
                      ) : null}
                    </Table.Td>
                    <Table.Td align="center">
                      {elyDepositExists ? (
                        <IconCheck size={16} color={theme.colors.green[6]} />
                      ) : null}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          )}
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default TabularSummary;
