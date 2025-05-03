import React from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../../hooks';
import "../../styles";
import logo from "../../assets/images/logo.png";


const Header = () => {

  const { isAuthenticated } = useAuth();

  const navs = [
    {
      path: "/",
      name: "Home",
      isProtected: isAuthenticated,
      className: "",
    },
    {
      path: "/contact",
      name: "Contact",
      isProtected: isAuthenticated,
      className: "",

    },
    {
      path: "/login",
      name: "Login",
      isProtected: isAuthenticated,
      className: "chime-btn-primary",
    },
    {
      path: "/register",
      name: "Register",
      isProtected: isAuthenticated,
      className: "chime-btn-ternary",

    },
    {
      path: "/chats",
      name: "Chats",
      isProtected: !isAuthenticated,
      className: "",

    }
  ]
  return (
    <header className='chime-header'>
      <nav className='chime-header-navbar'>
        <ul className='chime-header-navbar-logos'>
          <li className='chime-header-navbar-logo'>
            <img src={logo} alt="logo" className='chime-header-navbar-logo-image' />
          </li>
        </ul>
        <ul className='chime-header-navbar-navs'>
          {
            navs.map((currentNav,) => currentNav.isProtected === false ? <li key={currentNav.name} className={`chime-header-navbar-navs-nav ${currentNav.className}`}>
              <NavLink to={currentNav.path} className={`chime-header-navbar-navs-nav-link`}>{currentNav.name}</NavLink>
            </li> : null
            )
          }
        </ul>
      </nav>
    </header>
  )
}

export default React.memo(Header)