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
          className="mainwrapper"
          style={{
            minHeight: "100vh",
            width: "100%",
          }}
          gap={0}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={false}
            onSidebarClose={() => {}}
          />
          <Stack
            className="page-wrapper"
            style={{
              flexGrow: 1,
              zIndex: 1,
              backgroundColor: "transparent",
              marginLeft: lgUp ? "270px" : "0", // Account for fixed sidebar
            }}
            gap={0}
          >
            <Header toggleMobileSidebar={() => {}} />
            <Container
              size="lg"
              py="md"
              style={{
                paddingBottom: !lgUp ? "80px" : "20px", // Increased bottom padding for mobile
              }}
            >
              <Stack style={{ minHeight: "calc(100vh - 170px)" }} gap={0}>
                {children}
              </Stack>
            </Container>
          </Stack>
        </Stack>
      </Authenticated>
    </>
  );
}
