import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '.';
import { DeleteVendor, GetVendors } from '../../actions/vendors.action';
import { appConstants } from '../../constants/appConstants';
import AddVendorsModal from './AddVendorsModal';

const VendorsModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => ({
    vendors: state.vendors,
  }));
  const [vendorData, setVendorData] = useState({ id: null, name: '', description: '', store: null });
  const [openAddVendor, setOpenAddVendor] = useState(false);

  useEffect(() => {
    dispatch(GetVendors());
  }, [dispatch]);

  const handleVenderDelete = (id) => {
    dispatch(DeleteVendor(id));
  };

  const handleVendorEdit = (data) => {
    const { _id, name, description, store } = data;
    setVendorData({ id: _id, name, description, store });
    setIsOpen(false);
    setTimeout(() => {
      setOpenAddVendor(true);
    }, appConstants.TIME_OUT);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Vendors
          </Dialog.Title>
          {vendors.length ? (
            <div className='mt-10 h-30v overflow-y-auto'>
              <table className='table-fixed product-table border-2'>
                <thead className='sticky top-0 z-10 bg-white'>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((e) => (
                    <tr key={e._id}>
                      <td>{e.name}</td>
                      <td>{e.description ? e.description : 'N/A'}</td>
                      <td>
                        {(user?.role === 'superAdmin' || user?.role === 'admin') && (
                          <>
                            <button className='btn-sm-red' onClick={() => handleVenderDelete(e._id)}>
                              <TrashIcon className='h-4' />
                            </button>
                            <button className='btn-sm-yellow ml-3' onClick={() => handleVendorEdit(e)}>
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
          ) : (
            <h1 className='p-4'>No Vendors available</h1>
          )}
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
      <AddVendorsModal isOpen={openAddVendor} setIsOpen={setOpenAddVendor} vendorData={vendorData} />
    </div>
  );
};

export default VendorsModal;
