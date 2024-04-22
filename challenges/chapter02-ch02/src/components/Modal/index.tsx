import { Component, ReactNode, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

interface modalProps {
  isOpen: boolean,
  setIsOpen: () => void,
  children: ReactNode,
}

function Modal({ isOpen, setIsOpen, children }: modalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen)

  const prevProps = useRef<boolean>();
  useEffect(() => {
    prevProps.current = isOpen;
  })
  const prevPropsValue = prevProps.current ?? isOpen;

  useEffect(() => {
    if (prevPropsValue !== isOpen) {
      setModalStatus(isOpen)
    }
  }, [isOpen, prevPropsValue])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
