import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '.';
import { CreateUser, UpdateUser } from '../../actions/users.actions';

const AddUserModal = ({ isOpen, setIsOpen, userData }) => {
  const initState = {
    name: '',
    email: '',
    store: null,
    role: '',
    phone_no: '',
  };
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(initState);
  const stores = useSelector((state) => state.stores);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleUserFields = (e) => {
    const { name, value } = e.target;
    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
    }
  }, [userData]);

  const handleCreateUser = () => {
    if (userData) {
      const { id, name, email, role, password, store } = userDetails;
      dispatch(UpdateUser(id, { name, email, password, role, store })).then(() => {
        setIsOpen(false);
        setUserDetails(initState);
      });
    } else {
      dispatch(CreateUser(userDetails)).then(() => {
        setIsOpen(false);
        setUserDetails(initState);
      });
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            {userData ? 'Update' : 'Add'} User
          </Dialog.Title>
          <div className='mt-10'>
            {user?.role === 'superAdmin' && (
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Stores</label>
                <select className='input-select' name='store' onChange={handleUserFields} value={userDetails.store}>
                  <option value='' selected disabled>
                    Select user store
                  </option>
                  {stores &&
                    stores.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Name</label>
              <input
                className='input-field'
                type='text'
                name='name'
                onChange={handleUserFields}
                value={userDetails.name}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Email</label>
              <input
                className='input-field'
                name='email'
                type='email'
                onChange={handleUserFields}
                value={userDetails.email}
              />
            </div>
            {!userData && (
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Password</label>
                <input
                  className='input-field'
                  name='password'
                  type='password'
                  onChange={handleUserFields}
                  value={userDetails.password}
                />
              </div>
            )}
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Role</label>
              <select className='input-select' name='role' onChange={handleUserFields} value={userDetails.role}>
                <option value='' selected disabled>
                  Select user role
                </option>
                <option value='admin'>Admin</option>
                <option value='cashier'>Cashier</option>
                <option value='salesman'>Sales Man</option>
              </select>
            </div>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              onClick={handleCreateUser}
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

export default AddUserModal;
