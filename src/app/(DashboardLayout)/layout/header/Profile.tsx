import React, { useState } from "react";
import Link from "next/link";
import { Menu, Button, ActionIcon, Stack, Text } from "@mantine/core";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { SignOutButton, UserButton, OrganizationSwitcher } from "@clerk/nextjs";

const Profile = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      width={200}
      position="bottom-end"
      shadow="md"
    >
      <Menu.Target>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          aria-label="profile menu"
        >
          <UserButton />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser size={16} />}>
          <Text size="sm">My Profile</Text>
        </Menu.Item>
        <Menu.Item leftSection={<IconMail size={16} />}>
          <Text size="sm">My Account</Text>
        </Menu.Item>
        <Menu.Item leftSection={<IconListCheck size={16} />}>
          <Text size="sm">My Tasks</Text>
        </Menu.Item>

        <Menu.Divider />

        <Stack p="xs">
          <Button
            component={Link}
            href="/authentication/login"
            variant="outline"
            color="blue"
            fullWidth
            size="sm"
          >
            <SignOutButton />
          </Button>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
