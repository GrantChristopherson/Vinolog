import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditTastingForm from "./EditTastingForm";
import './editTastingModal.css';




function EditTastingModal({ tasting, lovedTasting }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='editTastingButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal className={"editTastingModal"} onClose={() => setShowModal(false)}>
           <EditTastingForm tasting={tasting} lovedTasting={lovedTasting} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};



export default EditTastingModal;





