import React, { useContext } from 'react'
import { MediCareContext } from '../contexts/MediCareContext'
import Header from '../layout/Header';
import Search from '../layout/Search';
import Display from './Display';
import Menu from '../layout/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartDetails() {
    const { orderedProductList, setOrderedProductList,setShowPopUp, setErrorMsg,setVariant } = useContext(MediCareContext);
    const navigate = useNavigate();
    // let [totalItemsCost, setTotalItemsCost] = useState(0);
    if (orderedProductList.length == 0) {
        return <div>You do not have any items in your cart</div>
    }

    const totalItemsCost = orderedProductList.reduce((total, item) => {
        return total + (item.orderCost);
    }, 0);

    function removeOrder(item2delete) {
        let deleteItemIndex = orderedProductList.findIndex(orderedItem => orderedItem == item2delete);
        orderedProductList.splice(deleteItemIndex, 1);
        setOrderedProductList([...orderedProductList]);
    }
    function checkOut() {
        axios.post("http://localhost:8080/save_order", orderedProductList)
            .then(result => {  
                setOrderedProductList([]);
                setErrorMsg("Order successfully placed");
                setVariant("success");
                setTimeout(()=>{
                    setErrorMsg("");
                    setVariant("");
                },5000)
                navigate('/customershop');
                setShowPopUp(false);

                //localStorage.clear();
            })
            .catch(error => {
                setErrorMsg(error.response.data);
                setVariant("danger");
                setTimeout(()=>{
                    setErrorMsg("");
                    setVariant("");
                },5000)
                navigate('/customershop'); 
                setShowPopUp(false); 
            });
    }
    let CartInfo = orderedProductList.map(item => {
        //const cartItemFullDetails = fooditems.find(foodItem => foodItem.name === item.name);

        return (
            <tr key={item.product.id} style={{border: '1px solid #ddd'}}>
                <td>{item.product.name}</td>
                <td><img src={item.product.url} width="80px" height="80px" /></td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.orderCost}</td>
                <td><button onClick={() => { removeOrder(item) }}>Remove from cart</button></td>

            </tr>
        )
    })

    return (
        <div>
            <div className="fawesomehead">
                <i className="fa-solid fa-cart-plus fa-fade fa-8x" style={{ color: '#cd72cf' }}></i>
            </div>
            <table className="table-style">
                <thead>
                    <tr>
                        <th className="th-style">Name</th>
                        <th className="th-style">View</th>
                        <th className="th-style">Price</th>
                        <th className="th-style">Quantity</th>
                        <th className="th-style">Sub-Total</th>
                    </tr>
                </thead>
                <tbody>
                    {CartInfo}
                </tbody>
            </table>
            <br></br>
            <b>Total Orders</b> : GHs {totalItemsCost}
            <br /><br />
            <input className="checkout" type="button" value="CheckOut" onClick={() => checkOut()} />
        </div>
    )
}
