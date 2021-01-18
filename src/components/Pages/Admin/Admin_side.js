import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './Admin_side_data';
import './Admin_side.css';
import { IconContext } from 'react-icons';
// import FaDollarSign from 'react-icons/fa';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

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
<h3>$19.0</h3>
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