import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Login from '../containers/Login'
import { MediCareContext } from '../contexts/MediCareContext'
import CartDetails from '../components/CartDetails';

export default function Header({ children, show, user, orders }) {
  const { setShowPopUp, setDisplayCartDetails } = useContext(MediCareContext);
  let prop2Render = null;
  if (show === "logout") {
    prop2Render = <Link to="/logout">Logout</Link>;
  } else if (show === "signin") {
    prop2Render = <Link to="/signup">Sign Up</Link>;
  } else if (show === "signup") {
    prop2Render = <Link to="/login">Login</Link>;
  } else {
    prop2Render = <Link to="/login">Log In</Link> / <Link to="/signup">Sign Up</Link>;
  }
  const popCart = () => {
    setDisplayCartDetails(true);
    setShowPopUp(true);
    console.log("trying to pop");
  }

  return (
    <nav className='navbar bg-danger navbarAux'>
      <h1>
        <i className="fa-solid fa-bed-pulse"></i>
        MediCare
      </h1>
      {children}


      <div className='flexContainer'>
        {/* <div className='loginButton1'>{user && `Welcome ` + user.username}</div> */}
        <div className='loginButton'>{prop2Render}</div>
        <div className='shoppingCartLink'><a onClick={popCart}>{orders && `Shopping Bag : ` + orders?.length}</a></div>
      </div>


    </nav>

  )
}
