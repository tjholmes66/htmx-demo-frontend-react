import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
    Contacts as ContactsIcon
} from '@mui/icons-material';

import type {IMenuItem} from '../types';
import { ROUTES } from './routes';

export const MENU_LIST: IMenuItem[] = [
  {
    route: ROUTES.main,
    literal: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    route: ROUTES.contacts,
    literal: 'Contacts',
    Icon: ContactsIcon,
  },
  {
    route: ROUTES.orders,
    literal: 'Orders',
    Icon: ShoppingCartIcon,
  },
  {
    route: ROUTES.customers,
    literal: 'Customers',
    Icon: PeopleIcon,
  },
  {
    route: ROUTES.inventory,
    literal: 'Inventory',
    Icon: AttachMoneyIcon,
  },
];
