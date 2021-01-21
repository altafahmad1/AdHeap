import React, { useContext, useState } from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Admin_side.css';
import { IconContext } from 'react-icons';
import UserContext from "./../../../context/UserContext";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const {userData} = useContext(UserContext);

  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Account',
      path: '/user/' + userData.user.id_user + '/Account',
      icon: <FaIcons.FaUser />,
      cName: 'nav-text'
    },
    {
      title: 'Payments',
      path: '/user/' +  userData.user.id_user + '/payment',
      icon: <FaIcons.FaMoneyBill />,
      cName: 'nav-text'
    },
    {
      title: 'Settings',
      path: '/user/' + userData.user.id_user +  '/settings',
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

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#ffff' }}>
        <div className='sidebar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="balance-display">
            <div className="balance-icon">
              <FaIcons.FaWallet/>
            </div>
            <div className="balance-amount">
              <h3>${userData.user.balance}</h3>
            </div>
          </div>
        </div>
        <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
          <ul className='side-menu-items' onClick={showSidebar}>
            <li className='sidebar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineArrowLeft/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;