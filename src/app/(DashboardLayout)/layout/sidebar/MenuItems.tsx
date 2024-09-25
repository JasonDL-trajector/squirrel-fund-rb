import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconCoins,
  IconCornerRightDownDouble,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Menu',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Deposit',
    icon: IconCoins,
    href: '/deposit',
  },
  {
    id: uniqueId(),
    title: 'Withdraw',
    icon: IconCornerRightDownDouble,
    href: '/withdraw',
  },
];

export default Menuitems;
