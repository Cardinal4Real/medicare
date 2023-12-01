import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ShopHome from './components/ShopHome';
import { useEffect, useState } from 'react';
import { MediCareContext } from './contexts/MediCareContext';
import axios from 'axios';
import Pop from './components/Pop';
import PopDisplay from './components/PopDisplay';
import CartDetails from './components/CartDetails';

function App() {
  const [stock, setStock] = useState([]);
  const [searchMatch,setsearchMatch]=useState([]);
  const [showPopUp,setShowPopUp]=useState(false);
  const [itemToPop,setItemToPop]=useState({});
  const [customer,setCustomer]=useState({});
  const [errorMsg,setErrorMsg]=useState("");
  const [orderedProductList,setOrderedProductList]=useState([]);
  const [displayCartDetails,setDisplayCartDetails]=useState(false);
  console.log(orderedProductList);
  console.log("item to pop is",itemToPop);
  useEffect(() => {
    axios.get("http://localhost:8080/products/findall")
      .then(result => {
        setStock(result.data);
      })
      .catch(error=>"Error retrieving request");
  }, []);
  
  let componentToRender=null;
  if(itemToPop!==undefined){
    //console.log("Not null");
    componentToRender=<PopDisplay show={itemToPop}/>;
  }
  if(displayCartDetails){
    componentToRender=<CartDetails/>;
  }

  return (
    <MediCareContext.Provider value={{ stock,searchMatch,setsearchMatch,
    showPopUp,setShowPopUp,setItemToPop,itemToPop,setOrderedProductList,
    orderedProductList,customer,setCustomer,setDisplayCartDetails,
    setErrorMsg }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/customershop' element={<ShopHome />} />
          <Route path='/logout' element={<Login />}/>
          <Route path='/shoppingCart' element={<CartDetails />}/>
        </Routes>
      <Pop>
        {componentToRender}
      </Pop>
      </div>
    </MediCareContext.Provider>
  );
}

export default App;
