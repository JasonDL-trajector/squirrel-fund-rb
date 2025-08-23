import React from "react";
import { Group, ActionIcon, useMantineTheme } from "@mantine/core";
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
        background: theme.white,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        backdropFilter: "blur(4px)",
        minHeight: lgUp ? "70px" : "60px",
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
          <Logo />
          <Profile />
        </>
      )}
    </Group>
  );
};

export default Header;
