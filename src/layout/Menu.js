import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    let [name,setName]=useState("");
    //useEffect(()=>setName(menuItemName),[]);
    //<li onClick={()=>setName("")}><Link className={name===""?"active":""} to="/customershop">Home</Link></li>
  return (
    <div className='menu'>
      <ul>
        <li onClick={()=>setName("AboutUs")}><Link className={name==="AboutUs"?"active":""} to="/">About Us</Link></li>
        <li onClick={()=>setName("Careers")}><Link className={name==="Careers"?"active":""} to="">Careers</Link></li>
        <li onClick={()=>setName("ContactUs")}><Link className={name==="ContactUs"?"active":""} to="">Contact Us</Link></li>
      </ul>
    </div>
  )
}
