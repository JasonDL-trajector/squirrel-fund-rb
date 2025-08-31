import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import PullToRefreshHint from "@/components/PullToRefreshHint";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import EmptyState from "../shared/EmptyState";
import { formatAmount } from "../../utilities/utils";
import { Text, Skeleton, Stack, Group, Box } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import type { Loading } from "../../types/loading";
import Link from "next/link";

const RecentWithdrawals = ({ isLoading }: Loading) => {
  const withdraws = useQuery(api.withdraws.listRecentWithdraws);

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
    <DashboardCard title="Recent Withdrawals">
      <PullToRefreshHint />
      {isLoading ? (
        <LoadingSkeleton />
      ) : !withdraws || withdraws.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" mt="md">
          No withdrawals yet
        </Text>
      ) : (
        <Link href="withdraw/history" style={{ textDecoration: "none" }}>
          <Box className="ios-list">
            <Stack gap={0}>
              {withdraws.map((withdraw: any) => (
                <Box key={withdraw._id} className="ios-list-item" p="md">
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text size="sm" fw={600} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {withdraw.withdrawNote || withdraw.name}
                      </Text>
                      <Text size="xs" c="dimmed">{withdraw.withdrawDate}</Text>
                    </Stack>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Text size="sm" fw={600} c="red">-{formatAmount(withdraw.withdrawAmount)}</Text>
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

export default RecentWithdrawals;
