import React from "react";
import { Text, Button, Stack } from "@mantine/core";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
  <>
    {title ? (
      <Text size="2xl" fw={700} mb="xs">
        {title}
      </Text>
    ) : null}

    {subtext}

    <div>
      <Stack gap="md">
        <div>
          <Text size="sm" fw={600} component="label" htmlFor="name" mb="xs">
            Name
          </Text>
          <CustomTextField id="name" />
        </div>
        <div>
          <Text size="sm" fw={600} component="label" htmlFor="email" mb="xs">
            Email Address
          </Text>
          <CustomTextField id="email" />
        </div>
        <div>
          <Text size="sm" fw={600} component="label" htmlFor="password" mb="xs">
            Password
          </Text>
          <CustomTextField type="password" id="password" />
        </div>
      </Stack>
      <Button
        color="blue"
        variant="filled"
        size="lg"
        fullWidth
        mt="lg"
        component={Link}
        href="/authentication/login"
      >
        Sign Up
      </Button>
    </div>
    {subtitle}
  </>
);

export default AuthRegister;
