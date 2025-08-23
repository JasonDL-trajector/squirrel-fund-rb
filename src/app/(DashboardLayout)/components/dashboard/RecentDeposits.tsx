import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  Text,
  Skeleton,
  Stack,
  Group,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import { formatAmount } from "../../utilities/utils";
import type { Loading } from "../../types/loading";
import Link from "next/link";

const RecentDeposits = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listRecentDeposits);
  const theme = useMantineTheme();

  const LoadingSkeleton = () => (
    <Stack gap="md">
      {[...Array(5)].map((_, index) => (
        <Group key={index} gap="md" align="flex-start">
          <Skeleton height={12} width={80} />
          <ActionIcon size="sm" variant="outline" color="green" disabled>
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
      <Link href="deposit/history" style={{ textDecoration: "none" }}>
        <DashboardCard title="Recent Deposits">
          <Stack gap="md">
            {isLoading || !deposits ? (
              <LoadingSkeleton />
            ) : (
              deposits.map((deposit: any, index: number) => (
                <Group key={deposit._id} gap="md" align="flex-start">
                  <Text size="sm" c="dimmed" style={{ minWidth: "80px" }}>
                    {deposit.depositDate}
                  </Text>
                  <Stack gap={0} align="center">
                    <ActionIcon
                      size="sm"
                      variant="outline"
                      color="green"
                      style={{
                        borderColor: theme.colors.green[4],
                        color: theme.colors.green[6],
                      }}
                    >
                      <IconCircle size={8} />
                    </ActionIcon>
                    {index < deposits.length - 1 && (
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
                      {deposit.depositNote} -{" "}
                      {formatAmount(deposit.depositAmount)}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {deposit.name}
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

export default RecentDeposits;
