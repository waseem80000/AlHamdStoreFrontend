import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '.';
import { DeleteStore, GetStores } from '../../actions/stores.actions';
import { appConstants } from '../../constants/appConstants';
import AddStore from './AddStore';

const StoresModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => ({
    stores: state.stores,
  }));
  const [storeData, setStoreData] = useState({ id: null, name: '', address: '' });
  const [openAddStore, setOpenAddStore] = useState(false);

  useEffect(() => {
    dispatch(GetStores());
  }, [dispatch]);

  const handleStoreDelete = (id) => {
    dispatch(DeleteStore(id));
  };

  const handleStoreEdit = (data) => {
    const { _id, name, address } = data;
    setStoreData({ _id, name, address });
    setIsOpen(false);
    setTimeout(() => {
      setOpenAddStore(true);
    }, appConstants.TIME_OUT);
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Stores
          </Dialog.Title>
          {stores.length ? (
            <div className='mt-10 h-30v overflow-y-auto'>
              <table className='table-fixed product-table border-2'>
                <thead className='sticky top-0 z-10 bg-white'>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((e) => (
                    <tr key={e._id}>
                      <td>{e.name}</td>
                      <td>{e.address ? e.address : 'N/A'}</td>
                      <td>
                        <button className='btn-sm-red' onClick={() => handleStoreDelete(e._id)}>
                          <TrashIcon className='h-4' />
                        </button>
                        <button className='btn-sm-yellow ml-3' onClick={() => handleStoreEdit(e)}>
                          <PencilAltIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className='p-4'>No Stores available</h1>
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
      <AddStore isOpen={openAddStore} setIsOpen={setOpenAddStore} storeData={storeData} />
    </div>
  );
};

export default StoresModal;
