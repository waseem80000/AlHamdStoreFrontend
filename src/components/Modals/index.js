import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import './style.scss';

const ModalTemplate = ({ isOpen, setIsOpen, children }) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as='div'
        className={`fixed inset-0 z-10  ${isOpen && 'w-screen h-screen bg-black bg-opacity-40'} `}
        onClose={() => setIsOpen(false)}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <span className='xl:inline-block inline h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalTemplate;
