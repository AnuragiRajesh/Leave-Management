import React, { useState } from 'react';
import Modal from 'react-modal';
// import axios from 'axios';


const UpdateLeave = ({ isOpen, closeModal, editHandleYesClick,row}) => {
  const [reason, setReason] = useState(row.reason);
  const [start_date, setStart_date] = useState(row.start_date);
  const [end_date, setEnd_date] = useState(row.end_date);
  const handleInput1Change = (e) => {
    setStart_date(e.target.value);
  };

  const handleInput2Change = (e) => {
    setEnd_date(e.target.value);
  };

  const handleInput3Change = (e) => {
    
    setReason(e.target.value);
  };
  const handleYesClickWithInputs = () => {
    
    editHandleYesClick(start_date,end_date,reason,row.id);
    setStart_date('')
    setEnd_date('')
    setReason('')
    closeModal()
  };


  const customStyles = {
    content: {
      height: '300px',
      width: '600px', // Adjust the height value as per your requirements
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      // background: 'none',
      border: 'none',
      boxShadow: 'none',
      backgroundColor:"lightgreen"
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      // backdropFilter: 'blur(5px)'
      backdrop: false, // Disable the backdrop
    },
  };

  return (
    <Modal
    
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false} // Disable the warning related to app element
      // className="custom-modal"
      overlayClassName="custom-modal-overlay">
      <h3 style={{display: "flex", justifyContent: "center", margin: "auto" , marginBottom:"1rem", }}>Update Your Leave</h3>
     <div style={{display:"flex",width:"100%"
    ,flexDirection:"column",gap:"1rem",margin:"auto"}}>
      
     <div style={{display:"flex", gap:"1rem",justifyContent:"center" }}><label  style={{fontWeight:"bold"}}>Start Date </label> <input style={{width:"50%"}} type="date" value={start_date} onChange={handleInput1Change} /></div>
     <div style={{display:"flex", gap:"1rem",justifyContent:"center" }}><label  style={{fontWeight:"bold"}}>End Date </label> <input style={{width:"50%"}} type="date" value={end_date} onChange={handleInput2Change} /></div>
     <div style={{display:"flex", gap:"1rem",justifyContent:"center" }}><label  style={{fontWeight:"bold"}}>Reason </label> <input style={{width:"50%"}} type="text" value={reason} onChange={handleInput3Change} /></div>

     </div>
      <div style={{ display:"flex", gap:"2rem", justifyContent:"center",marginTop:"2rem"}}><button style={{width:"70px", borderRadius:"5px" ,}} onClick={handleYesClickWithInputs}>Update</button>
      <button style={{width:"70px", borderRadius:"5px" ,}} onClick={closeModal}>Cancel</button></div>
    </Modal>
  );
};

export default UpdateLeave;
