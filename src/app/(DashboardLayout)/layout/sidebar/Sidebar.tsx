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
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
          background: theme.white,
          borderRight: `1px solid ${theme.colors.gray[2]}`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="sidebar-scrollbar"
      >
        {/* Desktop sidebar content */}
        <Stack style={{ height: "100%" }} gap={0}>
          {/* Logo section */}
          <Stack
            p="md"
            style={{
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
            }}
          >
            <Logo />
          </Stack>

          {/* Navigation items */}
          <Stack style={{ flex: 1 }} p="md">
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
