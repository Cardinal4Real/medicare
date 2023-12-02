import React, { useContext } from 'react'
import { MediCareContext } from '../contexts/MediCareContext'
import Header from '../layout/Header';
import Search from '../layout/Search';
import Display from './Display';
import Menu from '../layout/Menu';
import AlertC from './AlertC';

export default function ShopHome() {
  const { stock,searchMatch,orderedProductList,customer,errorMsg,variant } = useContext(MediCareContext);

  return (
    <div>
      <Header children={<Search></Search>} show={"logout"} user={customer} orders={orderedProductList}></Header>
      {errorMsg&&<AlertC variant={variant} msg={errorMsg}></AlertC>}
      <Display show={searchMatch.length>0?searchMatch:stock}/>
    </div>
  )
}
