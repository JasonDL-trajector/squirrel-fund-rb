import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Text, Skeleton, Stack, Group, Box } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import EmptyState from "../shared/EmptyState";
import { formatAmount } from "../../utilities/utils";
import type { Loading } from "../../types/loading";
import Link from "next/link";

const RecentDeposits = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listRecentDeposits);

  const LoadingSkeleton = () => (
    <Box className="ios-list">
      <Stack gap={0}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} className="ios-list-item" p="md">
            <Skeleton height={18} radius="sm" />
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <DashboardCard title="Recent Deposits">
      <PullToRefreshHint />
      {isLoading ? (
        <LoadingSkeleton />
      ) : !deposits || deposits.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" mt="md">
          No deposits yet
        </Text>
      ) : (
        <Link href="deposit/history" style={{ textDecoration: "none" }}>
          <Box className="ios-list">
            <Stack gap={0}>
              {deposits.map((deposit: any) => (
                <Box key={deposit._id} className="ios-list-item" p="md">
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text size="sm" fw={600} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {deposit.depositNote || deposit.name}
                      </Text>
                      <Text size="xs" c="dimmed">{deposit.depositDate}</Text>
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="green">+{formatAmount(deposit.depositAmount)}</Text>
                      <IconChevronRight size={16} color="#8E8E93" />
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
