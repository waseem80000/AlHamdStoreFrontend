import { Dialog } from '@headlessui/react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { CreateProduct, EditProduct, GetAllProducts } from '../../actions/products.actions';
import { GetCategories } from '../../actions/categories.actions';

const AddProducts = ({ isOpen, setIsOpen, productData }) => {
  const initState = {
    imgUrl: null,
    category: null,
    barcode: '',
    store: '',
    vendor: null,
    discount: null,
    name: '',
    size: '',
    color: '',
    price: '',
    retailPrice: '',
  };
  const [productDetails, setProductDetails] = useState(initState);

  const user = JSON.parse(localStorage.getItem('user'));

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, vendors, stores } = useSelector((state) => ({
    categories: state.categories,
    vendors: state.vendors,
    stores: state.stores,
  }));

  useEffect(() => {
    if (productData && productData._id) {
      const { imgUrl, name, category, vendor, discount, store, size, color, price, quantity, retailPrice, barcode } =
        productData;

      setProductDetails({
        ...initState,
        imgUrl,
        name,
        category,
        vendor,
        store: store?._id ? store._id : '',
        discount,
        size,
        color,
        quantity,
        retailPrice,
        barcode,
        price,
      });
    }
  }, [productData]);

  const handleAddProduct = (e) => {
    const { name, value } = e.target;
    if (['price', 'quantity', 'discount'].includes(name)) {
      setProductDetails((preState) => ({
        ...preState,
        [name]: parseInt(value),
      }));
    } else {
      setProductDetails((preState) => ({ ...preState, [name]: value }));
    }
  };

  const handleProductImage = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProductDetails((pre) => ({ ...pre, imgUrl: reader.result }));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  const createProductHandler = () => {
    if (productData?._id) {
      dispatch(EditProduct(productData._id, productDetails)).then(() => {
        setIsOpen(false);
        setProductDetails(initState);
        dispatch(GetAllProducts());
      });
    } else {
      dispatch(CreateProduct(productDetails)).then((res) => {
        setIsOpen(false);
        setProductDetails(initState);
        dispatch(GetAllProducts());
      });
    }
  };

  const btnStyle = (color) => {
    return `inline-flex justify-center px-4 py-2 text-sm font-medium text-${color}-900 bg-${color}-100 border border-transparent rounded-md hover:bg-${color}-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${color}-500 ml-3`;
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            {productData ? 'Update' : 'Add'} Product
          </Dialog.Title>
          <div className='mt-10 h-70v overflow-y-auto productsAdd'>
            {user?.role === 'superAdmin' && (
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Stores</label>
                <select className='input-select' name='store' onChange={handleAddProduct} value={productDetails.store}>
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
            <div
              className='w-32 h-32 border-2 rounded-full flex text-center items-center mx-auto cursor-pointer'
              onClick={() => fileInputRef.current.click()}
            >
              <input type='file' className='hidden' accept='image/*' ref={fileInputRef} onChange={handleProductImage} />
              {productDetails.imgUrl ? (
                <img src={productDetails.imgUrl} alt='product' className='w-full h-full object-cover rounded-full' />
              ) : (
                <p className='p-2 text-sm text-gray-500'>Select Product Image</p>
              )}
            </div>
            <div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Category</label>
                <select
                  className='input-select w-full'
                  name='category'
                  onChange={handleAddProduct}
                  value={productDetails.category}
                >
                  <option value='' selected disabled>
                    Select Category
                  </option>
                  {categories.length > 0 &&
                    categories.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Vendors</label>
                <select
                  className='input-select w-full'
                  name='vendor'
                  onChange={handleAddProduct}
                  value={productDetails.vendor}
                >
                  <option value='' selected disabled>
                    Select Vendor
                  </option>
                  {vendors &&
                    vendors.map((e) => (
                      <option key={e._id} data-value={e._id} value={e._id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Product Name</label>
                <input
                  className='input-field'
                  type='text'
                  name='name'
                  value={productDetails.name}
                  onChange={handleAddProduct}
                />
              </div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Barcode</label>
                <input
                  className='input-field'
                  type='text'
                  name='barcode'
                  value={productDetails.barcode}
                  onChange={handleAddProduct}
                />
              </div>
              <div className='flex flex-col my-2'>
                <label className='mb-1 text-gray-500 font-bold'>Discount</label>
                <input
                  className='input-field'
                  name='discount'
                  type='number'
                  value={productDetails.discount}
                  onChange={handleAddProduct}
                />
              </div>
            </div>
            <hr></hr>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Price</label>
              <input
                className='input-field'
                name='price'
                type='number'
                value={productDetails.price}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Retail Price</label>
              <input
                className='input-field'
                name='retailPrice'
                type='number'
                value={productDetails.retailPrice}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Quantity</label>
              <input
                className='input-field'
                name='quantity'
                type='number'
                value={productDetails.quantity}
                onChange={handleAddProduct}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Size</label>
              <input className='input-field' name='size' value={productDetails.size} onChange={handleAddProduct} />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Color</label>
              <input className='input-field' name='color' value={productDetails.color} onChange={handleAddProduct} />
            </div>
          </div>
          <div className='mt-4'>
            <button type='button' className={btnStyle('blue')} onClick={createProductHandler}>
              Submit
            </button>
            <button type='button' className={btnStyle('red')} onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default AddProducts;
