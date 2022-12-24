import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import ModalTemplate from '.';

const PaymentModal = ({ isOpen, setIsOpen, totalPrice, confirmOrder }) => {
  const [payment, setPayment] = useState('');
  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Payment
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Total</label>
              <input className='input-field' type='text' disabled value={Math.round(totalPrice)} />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Payment</label>
              <input className='input-field' type='text' onChange={(e) => setPayment(e.target.value)} value={payment} />
            </div>
            {Number(payment) > Math.round(totalPrice) && (
              <div className='w-full p-2 text-center text-2xl text-green-900 bg-green-100 rounded mt-10'>
                Change Rs {Math.round(totalPrice - Number(payment))}
              </div>
            )}
          </div>
          <div className='mt-4 space-x-2 flex items-end h-auto'>
            {Number(payment) >= Math.round(totalPrice) && (
              <button
                type='button'
                onClick={() => {
                  confirmOrder(Math.round(totalPrice - Number(payment)), Number(payment));
                  setPayment('');
                }}
                className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              >
                Confirm Order
              </button>
            )}
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default PaymentModal;
