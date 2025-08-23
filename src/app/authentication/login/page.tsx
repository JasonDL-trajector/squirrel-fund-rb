"use client";
import Link from "next/link";
import { Paper, Stack, Text, Button, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { IconBrandGoogle } from "@tabler/icons-react";

const Login2 = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <PageContainer title="Login" description="this is Login page">
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "url(/images/backgrounds/squirrel.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Stack justify="center" align="center" style={{ minHeight: "100vh" }}>
          <Paper
            shadow="xl"
            p={isMobile ? "xl" : "xl"}
            style={{
              zIndex: 1,
              width: "100%",
              maxWidth: isMobile ? "90%" : "500px",
              margin: isMobile ? theme.spacing.md : 0,
              background: "rgba(255, 255, 255, 1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Stack align="center" mb={0}>
              <Logo />
            </Stack>
            <Text size={isMobile ? "lg" : "md"} ta="center" mb="md">
              Your Finance Tracking App
            </Text>

            <Text size="xs" tt="uppercase" ta="center" mb="xs">
              Sign in with
            </Text>
            <SignIn.Root>
              <Stack align="center" mt="lg">
                <SignIn.Step name="start">
                  <Button
                    fullWidth
                    variant="outline"
                    leftSection={<IconBrandGoogle size={20} />}
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "black",
                      border: "1px solid #ddd",
                    }}
                    size="lg"
                  >
                    <Clerk.Connection
                      name="google"
                      style={{
                        background: "transparent",
                        color: "black",
                        border: 0,
                        fontFamily: "inherit",
                      }}
                    >
                      Google
                    </Clerk.Connection>
                  </Button>
                </SignIn.Step>
              </Stack>
            </SignIn.Root>
            <Stack align="center" mt="lg">
              <Text size="xs" tt="uppercase">
                All rights reserved ® 2024
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default Login2;
