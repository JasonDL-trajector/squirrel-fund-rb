"use client";
import Link from "next/link";
import { Stack, Text, useMantineTheme, Group, Title, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";

const Register2 = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <PageContainer title="Register" description="this is Register page">
      <div
        className="auth-viewport bg-cover"
        style={{
          position: "relative",
          backgroundImage: "url(/images/backgrounds/squirrel.png)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack justify="center" align="center" style={{ minHeight: "100vh", padding: theme.spacing.lg }}>
          <GlassmorphismCard maxWidth={520} className="glass-medium">
            <Stack gap="sm">
              <Title order={2} ta="center" c="white" style={{ letterSpacing: -0.5 }}>
                Create your account
              </Title>
              <Text size={isMobile ? "sm" : "md"} ta="center" style={{ color: "rgba(255,255,255,0.75)" }}>
                Join Squirrel Fund and start tracking smarter
              </Text>
            </Stack>

            <SignUp.Root>
              <SignUp.Step name="start">
                <Stack gap="md" mt="lg">
                    <Clerk.Field name="username">
                      <Clerk.Label asChild>
                        <Text size="sm" fw={600} component="label" c="white">
                          Username
                        </Text>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <CustomTextField placeholder="yourname" autoComplete="username" />
                      </Clerk.Input>
                      <Clerk.FieldError asChild>
                        <Text size="xs" c="red.6" mt={4}>
                          {" "}
                        </Text>
                      </Clerk.FieldError>
                    </Clerk.Field>

                    <Clerk.Field name="emailAddress">
                      <Clerk.Label asChild>
                        <Text size="sm" fw={600} component="label" c="white">
                          Email
                        </Text>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <CustomTextField placeholder="you@example.com" autoComplete="email" />
                      </Clerk.Input>
                      <Clerk.FieldError asChild>
                        <Text size="xs" c="red.6" mt={4}>
                          {" "}
                        </Text>
                      </Clerk.FieldError>
                    </Clerk.Field>

                    <Clerk.Field name="password">
                      <Clerk.Label asChild>
                        <Text size="sm" fw={600} component="label" c="white">
                          Password
                        </Text>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <CustomTextField type="password" placeholder="********" autoComplete="new-password" />
                      </Clerk.Input>
                      <Clerk.FieldError asChild>
                        <Text size="xs" c="red.6" mt={4}>
                          {" "}
                        </Text>
                      </Clerk.FieldError>
                    </Clerk.Field>

                    {/* UI-only confirm password, not submitted to Clerk */}
                    <div>
                      <Text size="sm" fw={600} component="label" c="white">
                        Confirm Password
                      </Text>
                      <CustomTextField type="password" placeholder="********" autoComplete="new-password" />
                    </div>

                    <SignUp.Action submit asChild>
                      <Button size="lg" className="gradient-button" fullWidth>
                        Create Account
                      </Button>
                    </SignUp.Action>
                  </Stack>

                <Group justify="center" mt="md">
                  <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Already have an account?{" "}
                    <Link href="/authentication/login" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                      Sign In
                    </Link>
                  </Text>
                </Group>
              </SignUp.Step>
            </SignUp.Root>
          </GlassmorphismCard>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default Register2;
