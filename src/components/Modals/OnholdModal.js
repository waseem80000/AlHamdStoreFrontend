import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '.';
import { currentCustomerAction } from '../../actions/customers.actions';
import {
  DeleteOrder,
  editOnHoldAction,
  GetOnHold,
  getOrderAction,
  updateOrderStatusAction,
} from '../../actions/order.actions';

const OnHoldOrdersModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    vendors: state.vendors,
    orders: state.orders.onHold,
  }));
  const navigate = useNavigate();

  const manipulateProducts = (data) => {
    const result = data.map((e) => ({
      ...e.product,
      uuid: Math.random(),
      currentDiscount: e.currentDiscount,
      currentPrice: e.currentPrice,
      orderQuantity: e.quantity,
      previousQuantity: e.quantity,
      previousPaid: e.paidPrice,
    }));
    return result;
  };
  const OrderUpdateHandler = (data) => {
    dispatch(getOrderAction(data));
    dispatch(editOnHoldAction(manipulateProducts(data.orderItems)));
    dispatch(currentCustomerAction(data?.customer));
    dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    if (data?.salesman) {
      navigate('/', { state: { salesman: data?.salesman?._id } });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(GetOnHold());
  }, [dispatch]);

  const orderDeleteHandler = (id) => {
    dispatch(DeleteOrder(id)).then(() => {
      dispatch(GetOnHold());
    });
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            OnHold Orders
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Item</th>
                  <th>Customer Name</th>
                  <th>Total</th>
                  <th>Cashier</th>
                  <th>Salesman</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((e, index) => (
                    <tr key={e._id}>
                      <td>{index + 1}</td>
                      <td>{e?.customer?.name || 'N/A'}</td>
                      <td>{e.total}</td>
                      <td>{e.cashier?.name ? e.cashier?.name : 'N/A'}</td>
                      <td>{e.salesman?.name ? e.salesman.name : 'N/A'}</td>
                      <td className='flex justify-center items-center'>
                        <button className='btn-sm-red' onClick={() => orderDeleteHandler(e._id)}>
                          <TrashIcon className='h-4' />
                        </button>
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

export default OnHoldOrdersModal;
