import React from "react";
import { Group, ActionIcon, Paper, Text, useMantineTheme, Stack } from "@mantine/core";
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
      shadow="sm"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderTop: `0.5px solid ${theme.colors.gray[2]}`,
        paddingBottom: `calc(${theme.spacing.xs} + env(safe-area-inset-bottom))`,
      }}
      className="safe-area-bottom"
    >
      <Group justify="space-around" p="sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.value;

          return (
            <Stack
              key={item.value}
              gap={4}
              align="center"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(item.value)}
            >
              <ActionIcon
                size={40}
                variant={isActive ? "filled" : "subtle"}
                color={isActive ? "blue" : "gray"}
                aria-label={item.label}
                radius="xl"
                className="tabbar-touch-target"
              >
                <Icon size={22} stroke={1.6} />
              </ActionIcon>
              <Text
                size="xs"
                fw={isActive ? 600 : 400}
                c={isActive ? "blue" : "dimmed"}
              >
                {item.label}
              </Text>
            </Stack>
          );
        })}
      </Group>
    </Paper>
  );
};

export default BottomNavbar;
