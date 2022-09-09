import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import TastingForm from '../TastingForm/TastingForm';
import { Modal } from '../../context/Modal';
import './home.css'



const Home = () => {

  const user = useSelector(state => state?.session?.user)

  // const [showModal, setShowModal] = useState(false);
  
  return (
    <div className='homeContainer'>
      <div className='userContainer'>
        <Sidebar />
        {/* {showModal && (
        <Modal className={"createPostModal"} onClose={() => setShowModal(false)}>
          <TastingForm setShowModal={setShowModal} />
        </Modal>
        )} */}
      </div>
    </div>
  );
};


export default Home;







