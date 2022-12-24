import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '.';
import { DeleteCategory, GetCategories } from '../../actions/categories.actions';
import { appConstants } from '../../constants/appConstants';
import AddCategory from './AddCategory';

const CategoriesModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => ({
    categories: state.categories,
  }));
  const [categoryData, setCategoryData] = useState({ id: null, name: '', description: '' });
  const [openAddCategory, setOpenAddCategory] = useState(false);

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  const handleVenderDelete = (id) => {
    dispatch(DeleteCategory(id));
  };

  const handleVendorEdit = (data) => {
    const { _id, name, description } = data;
    setCategoryData({ _id, name, description });
    setIsOpen(false);
    setTimeout(() => {
      setOpenAddCategory(true);
    }, appConstants.TIME_OUT);
  };
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Categories
          </Dialog.Title>
          {categories.length > 0 ? (
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
                  {categories.map((e) => (
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
            <h1 className='p-4'>No Categories available</h1>
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
      <AddCategory isOpen={openAddCategory} setIsOpen={setOpenAddCategory} categoryData={categoryData} />
    </div>
  );
};

export default CategoriesModal;
