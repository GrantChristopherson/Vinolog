import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';



const ModalContext = React.createContext();


export function ModalProvider({ children }) {
  
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}



export function Modal({ onClose, children, className}) {

  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;


  return ReactDOM.createPortal(
    <div className='overlay'>
      <div id="modal">
        <div id="modal-background" onClick={onClose} />
        <div className={className}>
          {children}
        </div>
      </div>
    </div>,
    modalNode
  );
}



