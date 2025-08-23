"use client";
import Link from "next/link";
import { Paper, Stack, Text, useMantineTheme, Anchor } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <PageContainer title="Register" description="this is Register page">
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
            <Stack align="center">
              <Logo />
            </Stack>
            <AuthRegister
              subtext={
                <Text
                  size={isMobile ? "md" : "sm"}
                  ta="center"
                  c="dimmed"
                  mb="xs"
                >
                  Your Finance Tracking App
                </Text>
              }
              subtitle={
                <Stack
                  direction="row"
                  gap="xs"
                  justify="center"
                  align="center"
                  mt="lg"
                >
                  <Text c="dimmed" size={isMobile ? "md" : "sm"} fw={500}>
                    Already have an account?
                  </Text>
                  <Anchor
                    component={Link}
                    href="/authentication/login"
                    fw={500}
                    size={isMobile ? "md" : "sm"}
                    c="blue"
                    style={{ textDecoration: "none" }}
                  >
                    Sign In
                  </Anchor>
                </Stack>
              }
            />
          </Paper>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default Register2;
