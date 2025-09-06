import React from "react";
import { Group, ActionIcon, useMantineTheme, Box } from "@mantine/core";
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
      styles={{
        root: {
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.8)",
          borderBottom: "0.5px solid var(--mantine-color-gray-2)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          paddingTop: `calc(${theme.spacing.md} + env(safe-area-inset-top))`,
          minHeight: lgUp ? "72px" : "64px",
          boxShadow: theme.other?.ios?.shadows?.level1,
        },
      }}
    >
      {lgUp ? (
        <>
          <Group>
            <ActionIcon
              size="lg"
              variant="subtle"
              color="gray"
              radius="xl"
              aria-label="show notifications"
              styles={{
                root: {
                  transition: "background 120ms ease, transform 120ms ease",
                  "&:hover": { background: "var(--mantine-color-gray-0)" },
                  "&:active": { transform: "translateY(1px)" },
                },
              }}
            >
              <IconBellRinging size="21" stroke="1.5" />
            </ActionIcon>
          </Group>
          <Profile />
        </>
      ) : (
        <>
          <Box style={{ marginRight: "auto", display: "flex", alignItems: "center" }}>
            <Logo />
          </Box>
          <Profile />
        </>
      )}
    </Group>
  );
};

export default Header;
