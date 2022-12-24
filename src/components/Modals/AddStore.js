import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { CreateStore, UpdateStore } from '../../actions/stores.actions';

const AddStore = ({ isOpen, setIsOpen, storeData }) => {
  const initState = { name: '', address: '' };
  const [storeDetails, setStoreDetails] = useState(initState);
  const dispatch = useDispatch();

  const handleStore = (e) => {
    const { name, value } = e.target;
    setStoreDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (storeData) {
      setStoreDetails(storeData);
    }
  }, [storeData]);

  const submitStore = () => {
    const { name, address } = storeDetails;
    if (name.length) {
      if (storeData) {
        const { _id } = storeDetails;
        dispatch(UpdateStore(_id, { name, address })).then(() => {
          setIsOpen(false);
          setStoreDetails(initState);
        });
      } else {
        dispatch(CreateStore(storeDetails)).then(() => {
          setIsOpen(false);
          setStoreDetails(initState);
        });
      }
    }
  };
  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
            {storeData ? 'Update' : 'Add'} Store
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Name</label>
              <input className='input-field' name='name' onChange={handleStore} value={storeDetails.name} />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Address</label>
              <textarea
                className='input-field'
                type=''
                name='address'
                onChange={handleStore}
                value={storeDetails.address}
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={submitStore}
            >
              Submit
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

export default AddStore;
