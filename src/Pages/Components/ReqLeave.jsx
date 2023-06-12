import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// import axios from 'axios';


const RequestLeave = ({ isOpen, closeModal, handleYesClick }) => {
  console.log("kiii")
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [reason, setReason] = useState('');
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
    
    handleYesClick(start_date,end_date,reason);
    setStart_date('')
    setEnd_date('')
    setReason('')
  };


  const customStyles = {
    content: {
      height: '400px', // Adjust the height value as per your requirements
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
      <h2>Confirmation</h2>
      <p>Are you sure you want to perform this action?</p>
      <input type="date" value={start_date} onChange={handleInput1Change} />
      <input type="date" value={end_date} onChange={handleInput2Change} />
      <input type="text" value={reason} onChange={handleInput3Change} />
      <button onClick={handleYesClickWithInputs}>Yes</button>
      <button onClick={closeModal}>No</button>
    </Modal>
  );
};

export default RequestLeave;
