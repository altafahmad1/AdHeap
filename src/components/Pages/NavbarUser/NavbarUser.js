import React, { useState, useEffect } from "react";
import { Button } from "./../../Button";
import { Link } from "react-router-dom";
import "../NavbarUser/NavbarUser.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function NavbarUser() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return {};
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container ">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              {/* <MdFingerprint className='navbar-icon' /> */}
              <img
                src="images/logo-nav_1.png"
                alt="Logo"
                className="home__hero-img"
              />
              ADHeap
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/ContactUs"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Link to="/" className="btn-link">
                    <Button buttonStyle="btn--outline">Sign Out</Button>
                  </Link>
                ) : (
                  <Link to="/SignUp_In" className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onClick={closeMobileMenu}
                    >
                      Sign Out
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarUser;
