import React, { useState } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose?:  () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <div className='h-screen w-full bg-opacity-25 z-[100000] backdrop-blur-sm fixed mx-auto flex justify-center items-center'>
          <div className='flex items-center justify-center relative w-fit overflow-x-hidden overflow-y-scroll'>
            <button className='absolute top-0 text-[0.75rem] rounded-full bg-gray-800 w-fit h-fit px-2 py-[2px] right-0 z-[9999999]'
           onClick={() =>  onClose && onClose() } >✕</button>
            <iframe
              src="https://youtube.com/embed/AAE5VZktooM"
              className='object-contain "responsive-iframe'
              allowFullScreen
              height={400}
              width={600}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
