import React from "react";
import { Group, ActionIcon, Paper, Text, useMantineTheme } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutDashboard,
  IconCoins,
  IconCornerRightDownDouble,
} from "@tabler/icons-react";
import useScrollDirection from "@/hooks/useScrollDirection";

const BottomNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useMantineTheme();
  const { scrollDirection, isAtBottom } = useScrollDirection();

  const isVisible = scrollDirection === "up" || isAtBottom;

  const navItems = [
    {
      label: "Deposit",
      value: "/deposit",
      icon: IconCoins,
    },
    {
      label: "Dashboard",
      value: "/",
      icon: IconLayoutDashboard,
    },
    {
      label: "Withdraw",
      value: "/withdraw",
      icon: IconCornerRightDownDouble,
    },
  ];

  if (!isVisible) return null;

  return (
    <Paper
      shadow="md"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        paddingBottom: theme.spacing.xs,
      }}
    >
      <Group justify="space-around" p="md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.value;

          return (
            <Group
              key={item.value}
              gap="xs"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(item.value)}
            >
              <ActionIcon
                size="lg"
                variant={isActive ? "filled" : "subtle"}
                color={isActive ? "blue" : "gray"}
                aria-label={item.label}
              >
                <Icon size="1.5rem" stroke={1.5} />
              </ActionIcon>
              <Text
                size="xs"
                fw={isActive ? 600 : 400}
                c={isActive ? "blue" : "dimmed"}
              >
                {item.label}
              </Text>
            </Group>
          );
        })}
      </Group>
    </Paper>
  );
};

export default BottomNavbar;
