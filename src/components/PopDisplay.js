import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MediCareContext } from "../contexts/MediCareContext";

export default function PopDisplay({ show }) {
    const [showItem, setShowItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { customer,setShowPopUp, orderedProductList, setOrderedProductList } = useContext(MediCareContext);
    //console.log("The value of show is",show);
    useEffect(() => {
        setShowItem(show);
    }, []);

    const decrement = () => {
        setQuantity(quantity > 1 ? quantity - 1 : quantity);
    }
    const increment = () => {
        let quantityRem = showItem.quantity;
        setQuantity(quantity < quantityRem ? quantity + 1 : quantity);
    }
    const orderCost=showItem.price * quantity;

    const addToOrderedList = () => {
        // setShowItem((prevShowItem) => {
        //     return { ...prevShowItem, "quantity": quantity };
        // });
    
        // setOrderedProductList((prevOrderedProductList) => {
        //     return [...prevOrderedProductList, showItem];
        // });
    
        // setShowPopUp(false);
        // console.log(orderedProductList);
        setOrderedProductList((orderedProductList)=>{
            return [...orderedProductList,{"product":showItem,"quantity":quantity,"orderCost":orderCost,"customer":customer}]
            });
            setShowPopUp(false);
            //setItemToCart({});  
    }
    console.log({orderedProductList});
    return (
        <div className="container-fluid">

            <div><img src={show?.url} width="160px" height="120px"></img></div>
            <span>{show?.name}</span><br />
            <span>GHs {show?.price}</span>
            <p>Product Description: </p>
            <input type="button" value="-" onClick={decrement} />
            <input type="text" value={quantity} readOnly />
            <input type="button" value="+" onClick={increment} />
            <input type="submit" value="Confirm Addition" onClick={() => { addToOrderedList() }} />
        </div>
    );
}