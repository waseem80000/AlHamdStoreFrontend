import { Dialog } from '@headlessui/react';
import ModalTemplate from '.';
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';
import './style.scss';

const InvoiceModal = ({ isOpen, setIsOpen, invoiceData }) => {
  const invoiceRef = useRef();

  const printOrder = useReactToPrint({
    content: () => invoiceRef.current,
    copyStyles: true,
  });

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Invoice
          </Dialog.Title>
          <div className='h-50v overflow-y-auto main'>
            <div className='ticket bg-white border-2 border-dotted text-sm' ref={invoiceRef}>
              <h1 className='text-center font-extrabold text-3xl mt-2'>Konfor</h1>
              <div className='flex px-3 my-2'>
                <div>
                  <div>
                    <address className='text-sm'>
                      <span className='font-bold'> Order Date : </span>
                      {new Date().toLocaleDateString()}
                    </address>
                  </div>
                  <div>
                    <address className='text-sm'>
                      <span className='font-bold'> Invoice# : </span>
                      {invoiceData?.invoiceNo || 'N/A'}
                    </address>
                  </div>
                </div>
                <div>
                  <div>
                    <address className='text-sm'>
                      <span className='font-bold'>Customer Name : </span>
                      {invoiceData?.customer?.name ? invoiceData.customer.name : 'N/A'}
                    </address>
                  </div>
                  <div>
                    <address className='text-sm'>
                      <span className='font-bold'>Customer Phone : </span>
                      {invoiceData?.customer?.phone_no ? invoiceData.customer.phone_no : 'N/A'}
                    </address>
                  </div>
                </div>
              </div>
              <table className='mx-auto text-sm w-full invoice-table'>
                <thead>
                  <tr className=''>
                    <th className='py-1 text-left'>Name</th>
                    <th className='py-1 text-left'>Qty</th>
                    <th className='py-1 text-left'>$$</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.orderItems &&
                    invoiceData.orderItems.map((e, i) => (
                      <tr className='text-gray-600 invoice-data' key={e.id}>
                        <td className='py-1 text-left'>{e.name}</td>
                        <td className='py-1 text-left'>{e.orderQuantity}</td>
                        <td className='py-1 text-left'>
                          {Math.round((e.price - (e.price * e.discount) / 100) * e.orderQuantity)}
                        </td>
                      </tr>
                    ))}
                  <tr className='mx-auto invoice-total'>
                    <td></td>
                    <td>TOTAL</td>
                    <td>{Math.round(invoiceData.total)}</td>
                  </tr>
                </tbody>
              </table>
              <p className='text-center mb-20'>Thanks for your purchase!</p>
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              onClick={printOrder}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            >
              Print
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-3'
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

export default InvoiceModal;
