import React, { useContext } from 'react'
import { MediCareContext } from '../contexts/MediCareContext'
import { Popup } from 'reactjs-popup'

export default function Pop({ children }) {
  const { setItemToPop, showPopUp, setShowPopUp, setDisplayCartDetails } = useContext(MediCareContext);
  const isOpen = true;
  console.log(showPopUp);
  //console.log(children);
  const overlayStyle = {
    background: 'rgba(0.4, 0.3, 0.7, 0.9)', // Replace with your desired background color
    color:'white',
  };
  return (
    <div>
      <Popup
        position="right center"
        open={showPopUp}
        onClose={() => {
          setShowPopUp(false);
          setDisplayCartDetails(false);
          setItemToPop({});
        }}
        overlayStyle={overlayStyle}
      >
        {children}
      </Popup>
    </div>
  )
}
