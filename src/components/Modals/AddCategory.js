import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { CreateCategory, UpdateCategory } from '../../actions/categories.actions';

const AddCategory = ({ isOpen, setIsOpen, categoryData }) => {
  const initState = { name: '', description: '' };
  const [categoryDetails, setCategoryDetails] = useState(initState);
  const dispatch = useDispatch();

  const handleCategory = (e) => {
    const { name, value } = e.target;
    setCategoryDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (categoryData) {
      setCategoryDetails(categoryData);
    }
  }, [categoryData]);

  const submitCategory = () => {
    const { name, description } = categoryDetails;
    if (name.length) {
      if (categoryData) {
        const { _id } = categoryDetails;
        dispatch(UpdateCategory(_id, { name, description })).then(() => {
          setIsOpen(false);
          setCategoryDetails(initState);
        });
      } else {
        dispatch(CreateCategory(categoryDetails)).then(() => {
          setIsOpen(false);
          setCategoryDetails(initState);
        });
      }
    }
  };
  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
            {categoryData ? 'Update' : 'Add'} Category
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Name</label>
              <input className='input-field' name='name' onChange={handleCategory} value={categoryDetails.name} />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Description</label>
              <textarea
                className='input-field'
                type=''
                name='description'
                onChange={handleCategory}
                value={categoryDetails.description}
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={submitCategory}
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

export default AddCategory;
