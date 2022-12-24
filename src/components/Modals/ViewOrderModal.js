import { Dialog } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '.';
import { currentCustomerAction } from '../../actions/customers.actions';
import { createOrderAction, updateOrderStatusAction } from '../../actions/order.actions';

const ViewOrdersModal = ({ isOpen, setIsOpen, orderDetails }) => {
  const dispatch = useDispatch();
  const { categories, vendors, order } = useSelector((state) => ({
    productsFilter: state.products.productsFilter,
    categories: state.categories,
    vendors: state.vendors,
    order: state.orders.order,
  }));
  const navigate = useNavigate();

  const OrderUpdateHandler = (data) => {
    dispatch(createOrderAction(data));
    dispatch(currentCustomerAction(order?.customer));
    dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    navigate('/', { state: { salesman: order.salesman_id } });
  };

  const getCategory = (id) => {
    const category = categories && categories.find((e) => e._id === id);

    return category ? category.name : 'N/A';
  };

  const getVendor = (id) => {
    const vendor = vendors && vendors.find((e) => e._id === id);

    return vendor ? vendor.name : 'N/A';
  };


  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Order Items
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Barcode</th>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails &&
                  orderDetails.map((e, index) => (
                    <tr key={e._id}>
                      <td></td>
                      <td>{index + 1}</td>
                      <td>{e.product.name}</td>
                      <td>{e.currentPrice}</td>
                      <td>{e.quantity}</td>
                      <td>{getCategory(e.category)}</td>
                      <td>{getVendor(e.vendor)}</td>
                      <td>{e.paidPrice}</td>
                      <td>
                        <button className='btn-sm-yellow ml-3' onClick={() => OrderUpdateHandler(e)}>
                          <PencilAltIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4 flex items-end h-auto'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
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

export default ViewOrdersModal;
