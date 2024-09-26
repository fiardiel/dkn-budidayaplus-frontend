import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, ...rest }) => {
  if (!open) return null;

  return (
    <div {...rest} className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 max-w-lg w-full'>
        {children}
        <button onClick={onClose} className='mt-4'>Close</button>
      </div>
    </div>
  );
};

export  { Modal }
