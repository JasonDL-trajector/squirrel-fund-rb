import React from "react";
import { Text, Button, Stack, Group, Checkbox, Anchor } from "@mantine/core";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => (
  <>
    {title ? (
      <Text size="2xl" fw={700} mb="xs">
        {title}
      </Text>
    ) : null}

    {subtext}

    <Stack gap="md">
      <div>
        <Text size="sm" fw={600} component="label" htmlFor="username" mb="xs">
          Username
        </Text>
        <CustomTextField />
      </div>
      <div>
        <Text size="sm" fw={600} component="label" htmlFor="password" mb="xs">
          Password
        </Text>
        <CustomTextField type="password" />
      </div>
      <Group justify="flex-end" align="center" my="md">
        <Anchor
          component={Link}
          href="/"
          fw={500}
          c="blue"
          style={{ textDecoration: "none" }}
        >
          Forgot Password?
        </Anchor>
      </Group>
    </Stack>
    <div>
      <Button
        color="blue"
        variant="filled"
        size="lg"
        fullWidth
        component={Link}
        href="/"
        type="submit"
      >
        Sign In
      </Button>
    </div>
    {subtitle}
  </>
);

export default AuthLogin;
