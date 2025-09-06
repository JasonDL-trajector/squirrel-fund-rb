"use client";

import { Stack, Button, useMantineTheme, Title } from "@mantine/core";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import { IconBrandGoogle } from "@tabler/icons-react";

const Login2 = () => {
  const theme = useMantineTheme();

  return (
    <PageContainer title="Login" description="this is Login page">
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
        <Stack
          justify="center"
          align="center"
          style={{ minHeight: "100vh", padding: theme.spacing.lg }}
        >
          <GlassmorphismCard maxWidth={520} className="glass-medium">
            <Stack gap="sm">
              <Title order={2} ta="center" c={"white"}>
                Squirrel Fund
              </Title>
            </Stack>

            <SignIn.Root>
              <SignIn.Step name="start">
                <Stack gap="md" mt="lg">
                  {/* Google OAuth */}
                  <Clerk.Connection name="google" asChild>
                    <Button
                      size="md"
                      variant="default"
                      leftSection={<IconBrandGoogle size={20} />}
                      fullWidth
                    >
                      Continue with Google
                    </Button>
                  </Clerk.Connection>
                </Stack>
              </SignIn.Step>
            </SignIn.Root>
          </GlassmorphismCard>
        </Stack>
      </div>
    </PageContainer>
  );
};

export default Login2;
