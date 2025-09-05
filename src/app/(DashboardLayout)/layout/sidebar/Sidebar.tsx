import { Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import SidebarItems from "./SidebarItems";
import BottomNavbar from "../bottomNavbar/BottomNavbar";
import Logo from "../shared/logo/Logo";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const theme = useMantineTheme();
  const lgUp = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Stack
        styles={{
          root: {
            width: sidebarWidth,
            flexShrink: 0,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
            background: "var(--mantine-color-white)",
            borderRight: "1px solid var(--mantine-color-gray-2)",
            overflowY: "auto",
            overflowX: "hidden",
            backdropFilter: "saturate(180%) blur(16px)",
            WebkitBackdropFilter: "saturate(180%) blur(16px)",
            paddingTop: `calc(${theme.spacing.md} + env(safe-area-inset-top))`,
            boxShadow: theme.other?.ios?.shadows?.level1,
          },
        }}
      >
        {/* Desktop sidebar content */}
        <Stack style={{ height: "100%" }} gap={0}>
          {/* Logo section */}
          <Stack
            p="md"
            styles={{
              root: {
                borderBottom: "1px solid var(--mantine-color-gray-2)",
                background: "transparent",
              },
            }}
          >
            <Logo />
          </Stack>

          {/* Navigation items */}
          <Stack p="md" gap="xs" styles={{ root: { flex: 1 } }}>
            <SidebarItems />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  // For mobile, we only return the BottomNavbar
  return <BottomNavbar />;
};

export default MSidebar;
