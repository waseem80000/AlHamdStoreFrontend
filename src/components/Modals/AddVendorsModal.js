import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '.';
import { CreateVendor, UpdateVendor } from '../../actions/vendors.action';

const AddVendorsModal = ({ isOpen, setIsOpen, vendorData }) => {
  const initState = {
    name: '',
    description: '',
  };
  const dispatch = useDispatch();
  const [vendorDetails, setVendorDetails] = useState(initState);

  const handleVendorFields = (e) => {
    const { name, value } = e.target;
    setVendorDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (vendorData) {
      setVendorDetails(vendorData);
    }
  }, [vendorData]);

  const handleCreateCustomer = () => {
    if (vendorData) {
      const { id, name, description } = vendorDetails;
      dispatch(UpdateVendor(id, { name, description })).then(() => {
        setIsOpen(false);
        setVendorDetails(initState);
      });
    } else {
      const { name, description } = vendorDetails;
      dispatch(CreateVendor({ name, description })).then(() => {
        setIsOpen(false);
        setVendorDetails(initState);
      });
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            {vendorData ? 'Update' : 'Add'} Vendor
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Name</label>
              <input
                className='input-field'
                type='text'
                name='name'
                onChange={handleVendorFields}
                value={vendorDetails.name}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Description</label>
              <textarea
                className='input-field'
                name='description'
                onChange={handleVendorFields}
                value={vendorDetails.description}
              />
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              onClick={handleCreateCustomer}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
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

export default AddVendorsModal;
