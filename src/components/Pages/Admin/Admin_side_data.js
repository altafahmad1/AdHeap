import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/Admin',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/Account',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Payments',
    path: '/Payment',
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
    path: '/Support',
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