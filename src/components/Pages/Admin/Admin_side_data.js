import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/Acoount',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Payments',
    path: '/products',
    icon: <FaIcons.FaMoneyBill />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/Settings',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelp />,
    cName: 'nav-text'
  },
  {
    title: 'Signout',
    path: '/Signout',
    icon: <IoIcons.IoMdLogOut />,
    cName: 'nav-text'
  }
];