import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { DeleteProduct, GetAllProducts, GetProduct, GetProducts } from '../../actions/products.actions';
import { appConstants } from '../../constants/appConstants';
import AddProducts from './AddProductModal';
import Barcode from 'react-barcode';

const ProductsModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { productsFilter } = useSelector((state) => ({
    productsFilter: state.products.productsFilter,
  }));
  const user = JSON.parse(localStorage.getItem('user'));

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const { products } = useSelector((state) => ({
    products: state.products.allProducts,
  }));
  useEffect(() => {
    dispatch(GetProducts(productsFilter));
    dispatch(GetAllProducts());
  }, [dispatch, productsFilter]);

  const productDeleteHandler = (id) => {
    dispatch(DeleteProduct(id)).then(() => {
      dispatch(GetProducts(productsFilter));
      dispatch(GetAllProducts());
    });
  };

  const productUpdateHandler = (data) => {
    setCurrentProduct(data);
    setIsOpen(false);
    setTimeout(() => {
      setOpenAddProduct(true);
    }, appConstants.TIME_OUT);
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='xl:inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Products
          </Dialog.Title>
          <div className='mt-10 h-30v overflow-y-auto'>
            <table className='table-fixed product-table border-2'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th>Barcode</th>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  {(user?.role === 'superAdmin' || user?.role === 'admin') && <th className='h-full'>Action</th>}
                </tr>
              </thead>
              <tbody>
                {products.length > 0 &&
                  products.map((e, index) => (
                    <tr key={e._id}>
                      <td className=''>{e.barcode && <Barcode value={e.barcode} />}</td>
                      <td>{index + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.category?.name}</td>
                      <td>{e.vendor?.name}</td>
                      {(user?.role === 'superAdmin' || user?.role === 'admin') && (
                        <td>
                          <button className='btn-sm-red h-full' onClick={() => productDeleteHandler(e._id)}>
                            <TrashIcon className='h-4' />
                          </button>
                          <button className='btn-sm-yellow ml-3 h-full' onClick={() => productUpdateHandler(e)}>
                            <PencilAltIcon className='h-4' />
                          </button>
                        </td>
                      )}
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
      <AddProducts isOpen={openAddProduct} setIsOpen={setOpenAddProduct} productData={currentProduct} />
    </div>
  );
};

export default ProductsModal;
