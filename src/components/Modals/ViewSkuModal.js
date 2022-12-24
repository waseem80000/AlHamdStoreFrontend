import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { createOrderAction } from '../../actions/order.actions';

const ViewSkuModal = ({ isOpen, setIsOpen, skuData }) => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => ({
    currentOrder: state.orders.currentOrder,
  }));

  const handleCreateOrder = (item) => {
    const alreadyExists = currentOrder.find((e) => e.skus.id === item.id);
    if (alreadyExists && alreadyExists.id) {
      dispatch(
        createOrderAction({
          ...skuData,
          skus: item,
          quantity:
            Number(alreadyExists.quantity) < Number(item.quantity)
              ? alreadyExists.quantity + 1
              : alreadyExists.quantity,
        })
      );
    } else {
      dispatch(createOrderAction({ ...skuData, skus: item, quantity: 1 }));
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Product Skus
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {skuData &&
                  skuData.skus?.map((e) => (
                    <tr key={e._id}>
                      <td>{e.product_color.name}</td>
                      <td>{e.product_size.name}</td>
                      <td>{e.price}</td>
                      <td>{e.quantity}</td>
                      <td>
                        <button className='btn-sm-yellow ml-3' onClick={() => handleCreateOrder(e)}>
                          <PlusIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4'>
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

export default ViewSkuModal;
