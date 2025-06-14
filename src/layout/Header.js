import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Login from '../containers/Login'
import { MediCareContext } from '../contexts/MediCareContext'
import CartDetails from '../components/CartDetails';

export default function Header({ children, show, user, orders }) {
  const { setShowPopUp, setDisplayCartDetails } = useContext(MediCareContext);
  let prop2Render = null;
  switch (show) {
    case "logout":
      prop2Render = <Link to="/logout">Logout</Link>;
      break;
    case "signin":
      prop2Render = <Link to="/signup">Sign Up</Link>;
      break;
    case "signup":
      prop2Render = <Link to="/login">Login</Link>;
      break;
    default:
      prop2Render = <Link to="/signup">Sign Up</Link>;
      break;
  }

  const popCart = () => {
    setDisplayCartDetails(true);
    setShowPopUp(true);
  }

  return (
    <div className='bg-danger navbarAux'>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-4">
            <h1>
              <i className="fa-solid fa-bed-pulse"></i>
              MediCare
            </h1>
          </div>
          <div className="col-6">
            {children}
          </div>
          <div className="col-2">
                <div className='loginButton'>{prop2Render}</div>
                <div className='shoppingCartLink'><a onClick={popCart}>{orders && `Shopping Bag : ` + orders?.length}</a></div>
          </div>
        </div>




      </div>
    </div>

  )
}
