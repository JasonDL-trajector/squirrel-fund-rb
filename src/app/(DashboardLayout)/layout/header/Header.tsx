import React from "react";
import { Group, ActionIcon, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Profile from "./Profile";
import { IconBellRinging } from "@tabler/icons-react";
import Logo from "../shared/logo/Logo";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const theme = useMantineTheme();
  const lgUp = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  return (
    <Group
      component="header"
      justify="space-between"
      align="center"
      p="md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,0.75)",
        borderBottom: `0.5px solid ${theme.colors.gray[2]}`,
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        paddingTop: `calc(${theme.spacing.md} + env(safe-area-inset-top))`,
        minHeight: lgUp ? "72px" : "64px",
      }}
    >
      {lgUp ? (
        <>
          <Group>
            <ActionIcon
              size="lg"
              variant="subtle"
              color="gray"
              aria-label="show notifications"
            >
              <IconBellRinging size="21" stroke="1.5" />
            </ActionIcon>
          </Group>
          <Profile />
        </>
      ) : (
        <>
          <Text fw={700} size="xl">Squirrel Fund</Text>
          <Profile />
        </>
      )}
    </Group>
  );
};

export default Header;
