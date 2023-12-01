import React, { useContext } from 'react'
import { MediCareContext } from '../contexts/MediCareContext'
import Header from '../layout/Header';
import Search from '../layout/Search';
import Display from './Display';
import Menu from '../layout/Menu';

export default function ShopHome() {
  const { stock,searchMatch,orderedProductList,customer } = useContext(MediCareContext);

  return (
    <div>
      <Header children={<Search></Search>} show={"logout"} user={customer} orders={orderedProductList}></Header>
      {/* {searchMatch!=undefined?<Display show={searchMatch}></Display>:<Display show={stock}></Display>} */}
      <Display show={searchMatch.length>0?searchMatch:stock}/>
    </div>
  )
}
