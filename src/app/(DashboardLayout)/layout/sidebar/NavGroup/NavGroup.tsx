import { Text, useMantineTheme } from "@mantine/core";

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
}

const NavGroup = ({ item }: ItemType) => {
  const theme = useMantineTheme();

  return (
    <Text
      size="xs"
      fw={700}
      c="dimmed"
      tt="uppercase"
      lts={0.5}
      mt="lg"
      mb="xs"
      px="sm"
    >
      {item.subheader}
    </Text>
  );
};

export default NavGroup;
