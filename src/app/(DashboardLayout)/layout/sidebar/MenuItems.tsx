import {
  IconLayoutDashboard,
  IconCoins,
  IconCornerRightDownDouble,
} from "@tabler/icons-react";
import { useId } from "@mantine/hooks";

const useMenuItems = () => {
  const id = useId();
  const prefix = `${id}-`;

  const Menuitems = [
    {
      navlabel: true,
      subheader: "Menu",
    },

    {
      id: `${prefix}dashboard`,
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      id: `${prefix}deposit`,
      title: "Deposit",
      icon: IconCoins,
      href: "/deposit",
    },
    {
      id: `${prefix}withdraw`,
      title: "Withdraw",
      icon: IconCornerRightDownDouble,
      href: "/withdraw",
    },
  ];

  return Menuitems;
};

export default useMenuItems;
