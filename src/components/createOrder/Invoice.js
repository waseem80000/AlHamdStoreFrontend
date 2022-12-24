import React from 'react';

const OrderInvoice = React.forwardRef(({ invoiceData }, ref) => {
  return (
    <div className='h-50v overflow-y-auto main'>
      <div className='ticket bg-white border-2 border-dotted text-sm' ref={ref}>
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
  );
});

export default OrderInvoice;
