import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditTastingForm from "./EditTastingForm";
import './editTastingModal.css';




function EditTastingModal({ tasting }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='editIconBtn' onClick={() => setShowModal(true)}><i className="fa-solid fa-pen editPenIcon"></i></button>
      {showModal && (
        <Modal className={"editTastingModal"} onClose={() => setShowModal(false)}>
           <EditTastingForm tasting={tasting} setShowModal={setShowModal}/>
        </Modal>
      )};
    </>
  );
};



export default EditTastingModal;





