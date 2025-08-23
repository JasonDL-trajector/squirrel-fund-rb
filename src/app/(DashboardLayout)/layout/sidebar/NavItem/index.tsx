import React from "react";
import { NavLink, useMantineTheme } from "@mantine/core";
import Link from "next/link";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useMantineTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const isActive = pathDirect === item.href;

  return (
    <NavLink
      component={Link}
      href={item.href}
      label={item.title}
      leftSection={itemIcon}
      active={isActive}
      disabled={item.disabled}
      onClick={onClick}
      variant="filled"
      color={isActive ? "blue" : "gray"}
      mb="xs"
    />
  );
};

export default NavItem;
