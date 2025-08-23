import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { formatAmount } from "../../utilities/utils";
import {
  Text,
  Skeleton,
  Stack,
  Group,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import type { Loading } from "../../types/loading";
import Link from "next/link";

const RecentWithdrawals = ({ isLoading }: Loading) => {
  const withdraws = useQuery(api.withdraws.listRecentWithdraws);
  const theme = useMantineTheme();

  const LoadingSkeleton = () => (
    <Stack gap="md">
      {[...Array(5)].map((_, index) => (
        <Group key={index} gap="md" align="flex-start">
          <Skeleton height={12} width={80} />
          <ActionIcon size="sm" variant="outline" color="red" disabled>
            <IconCircle size={8} />
          </ActionIcon>
          <Stack gap="xs" style={{ flex: 1 }}>
            <Skeleton height={16} width={150} />
            <Skeleton height={14} width={100} />
          </Stack>
        </Group>
      ))}
    </Stack>
  );

  return (
    <>
      <Link href="withdraw/history" style={{ textDecoration: "none" }}>
        <DashboardCard title="Recent Withdrawals">
          <Stack gap="md">
            {isLoading || !withdraws ? (
              <LoadingSkeleton />
            ) : (
              withdraws.map((withdraw: any, index: number) => (
                <Group key={withdraw._id} gap="md" align="flex-start">
                  <Text size="sm" c="dimmed" style={{ minWidth: "80px" }}>
                    {withdraw.withdrawDate}
                  </Text>
                  <Stack gap={0} align="center">
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      color="red"
                      style={{
                        borderColor: theme.colors.red[4],
                        color: theme.colors.red[6],
                      }}
                    >
                      <IconCircle size={8} />
                    </ActionIcon>
                    {index < withdraws.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          height: "20px",
                          backgroundColor: theme.colors.gray[2],
                          marginTop: "4px",
                        }}
                      />
                    )}
                  </Stack>
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" fw={600}>
                      {withdraw.withdrawNote} -{" "}
                      {formatAmount(withdraw.withdrawAmount)}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {withdraw.name}
                    </Text>
                  </Stack>
                </Group>
              ))
            )}
          </Stack>
        </DashboardCard>
      </Link>
    </>
  );
};

export default RecentWithdrawals;
