"use client";
import { Container, Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import Login2 from "../authentication/login/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const theme = useMantineTheme();
  const lgUp = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  return (
    <>
      <Unauthenticated>
        <Login2 />
      </Unauthenticated>

      <Authenticated>
        <Stack
          gap={0}
          styles={{
            root: {
              minHeight: "100vh",
              width: "100%",
              backgroundColor: "var(--mantine-color-gray-0)",
            },
          }}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={false}
            onSidebarClose={() => {}}
          />
          <Stack
            gap={0}
            styles={{
              root: {
                flexGrow: 1,
                zIndex: 1,
                backgroundColor: "transparent",
                marginLeft: lgUp ? "270px" : "0",
              },
            }}
          >
            <Header toggleMobileSidebar={() => {}} />
            <Container
              px={"xl"}
              py={"xl"}
              mb={"xl"}
              role="main"
              styles={{ root: { backgroundColor: "transparent" } }}
              style={{
                paddingTop: "8px",
                paddingBottom: !lgUp
                  ? "calc(120px + env(safe-area-inset-bottom))"
                  : "24px",
                width: "100%",
              }}
            >
              <Stack gap="md" style={{ minHeight: "calc(100vh - 206px)" }}>
                {children}
              </Stack>
            </Container>
          </Stack>
        </Stack>
      </Authenticated>
    </>
  );
}
