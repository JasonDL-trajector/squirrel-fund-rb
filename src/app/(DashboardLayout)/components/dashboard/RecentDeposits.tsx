import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Text, Skeleton, Stack, Group, Box } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import { formatAmount } from "../../utilities/utils";
import type { Loading } from "../../types/loading";
import Link from "next/link";

const RecentDeposits = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listRecentDeposits);

  const LoadingSkeleton = () => (
    <Box
      style={{
        background: "var(--mantine-color-white)",
        border: "1px solid var(--mantine-color-gray-2)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Stack gap={0}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            p="md"
            style={{ borderBottom: "1px solid var(--mantine-color-gray-1)" }}
          >
            <Skeleton height={18} radius="sm" />
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <DashboardCard title="Recent Deposits">
      {isLoading ? (
        <LoadingSkeleton />
      ) : !deposits || deposits.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" mt="md">
          No deposits yet
        </Text>
      ) : (
        <Link href="deposit/history" style={{ textDecoration: "none" }}>
          <Box
            style={{
              background: "var(--mantine-color-white)",
              border: "1px solid var(--mantine-color-gray-2)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Stack gap={0}>
              {deposits.map((deposit: any) => (
                <Box
                  key={deposit._id}
                  p="md"
                  style={{
                    background: "var(--mantine-color-white)",
                    borderBottom: "1px solid var(--mantine-color-gray-1)",
                  }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text
                        size="sm"
                        fw={600}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {deposit.depositNote || deposit.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {deposit.depositDate}
                      </Text>
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="green">
                        +{formatAmount(deposit.depositAmount)}
                      </Text>
                      <IconChevronRight
                        size={16}
                        color="var(--mantine-color-gray-5)"
                      />
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Box>
        </Link>
      )}
    </DashboardCard>
  );
};

export default RecentDeposits;
