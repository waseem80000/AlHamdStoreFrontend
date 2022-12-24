import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { DeleteCustomer } from '../../actions/customers.actions';
import CustomerModal from './AddCustomerModal';
import { appConstants } from '../../constants/appConstants';

const CustomersModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => ({
    customers: state.customers.allCustomers,
  }));
  const initState = {
    id: null,
    name: '',
    email: '',
    phoneNo: '',
  };
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(initState);

  const handleUserDelete = (id) => {
    dispatch(DeleteCustomer(id));
  };

  const handleCustomerEdit = (data) => {
    const { _id, name, email, phoneNo } = data;
    setCustomerData({ _id, name, email, phoneNo });
    setIsOpen(false);
    setTimeout(() => {
      setOpenAddCustomer(true);
    }, appConstants.TIME_OUT);
  };
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Customers
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map((e) => (
                    <tr key={e._id}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phoneNo}</td>
                      <td>
                        {(user?.role === 'superAdmin' || user?.role === 'admin') && (
                          <>
                            <button className='btn-sm-red' onClick={() => handleUserDelete(e._id)}>
                              <TrashIcon className='h-4' />
                            </button>
                            <button className='btn-sm-yellow ml-3' onClick={() => handleCustomerEdit(e)}>
                              <PencilAltIcon className='h-4' />
                            </button>
                          </>
                        )}
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
      <CustomerModal isOpen={openAddCustomer} setIsOpen={setOpenAddCustomer} customerData={customerData} />
    </div>
  );
};

export default CustomersModal;
