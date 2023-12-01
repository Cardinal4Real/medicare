import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MediCareContext } from "../contexts/MediCareContext";
import PopDisplay from "./PopDisplay";

export default function Display({show}){
    const {setShowPopUp,setItemToPop}=useContext(MediCareContext);
    const [items, setItems]=useState({});
const addToCart=(item)=>{
    setShowPopUp(true);
    setItemToPop(item);    
}
        const dItems=show.map((item)=>{
            return(
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><img src={item.url} height="60px" width="100px"></img></td>
                    <td><button onClick={()=>addToCart(item)}>Add to cart</button></td>
                </tr>
            )
        });

    return(
<div className="container-fluid">
            <div className="row">
                <div className="col"></div>
                <div className="col-sm-12 col-lg-8">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>View</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dItems}
                        </tbody>
                    </table>

                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}