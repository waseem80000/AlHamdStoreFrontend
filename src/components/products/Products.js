import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { createOrderAction } from '../../actions/order.actions';
import { filterProductsAction } from '../../actions/products.actions';

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    productsFilter,
    categories,
    currentPage,
    totalPages,
    currentOrder,
    orderStatus,
    onlineStatus,
    allProducts,
  } = useSelector((state) => ({
    products: state.products.products,
    productsFilter: state.products.productsFilter,
    categories: state.categories,
    currentPage: state.products.currentPage,
    totalPages: state.products.totalPages,
    currentOrder: state.orders.currentOrder,
    orderStatus: state.orders.orderStatus,
    onlineStatus: state.onlineStatus.onlineStatus,
    allProducts: state.products.allProducts,
  }));
  const [offlineFilters, setOfflineFilters] = useState({ category_id: null, name: '' });

  const handleCategoryChange = (e) => {
    const { value } = e.target;

    if (onlineStatus) {
      dispatch(filterProductsAction({ ...productsFilter, category_id: value }));
    } else {
      setOfflineFilters((pre) => ({ ...pre, category_id: value === '' ? null : Number(value) }));
    }
  };

  function debounce(func, timeout = 2000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, keyword: value }));

    if (onlineStatus) {
      dispatch(filterProductsAction({ ...productsFilter, keyword: value }));
    } else {
      setOfflineFilters((pre) => ({ ...pre, name: value }));
    }
  };

  const optimizedSearch = debounce(handleKeywordChange);

  const handlePageChange = (page) => {
    dispatch(filterProductsAction({ ...productsFilter, page }));
  };

  const handlePerPageChange = (e) => {
    const { value } = e.target;
    dispatch(filterProductsAction({ ...productsFilter, per_page: value }));
  };

  const handleCreateOrder = (product, type) => {
    const item = type === 'select' ? allProducts.find((e) => e._id === product?.value) : product;
    if (item) {
      const alreadyExists = currentOrder.filter((e) => e._id === item._id);
      if (alreadyExists.length > 0) {
        dispatch(
          createOrderAction(orderStatus, {
            ...item,
            orderQuantity:
              Number(alreadyExists[alreadyExists.length - 1].orderQuantity) < Number(item.quantity)
                ? alreadyExists[alreadyExists.length - 1].orderQuantity + 1
                : alreadyExists[alreadyExists.length - 1].orderQuantity,
          })
        );
      } else {
        dispatch(createOrderAction(orderStatus, { ...item, orderQuantity: 1 }));
      }
    }
  };

  const productsData = onlineStatus
    ? products
    : allProducts
        .filter((e) => e.name.toLowerCase().includes(offlineFilters.name.toLowerCase()))
        .filter((e) => (offlineFilters.category_id ? e.category_id === offlineFilters.category_id : true));

  const productsOptions = allProducts.map((e) => ({ label: e.name, value: e._id }));

  return (
    <div className='p-10 bg-white ml-4 mt-6 lg:col-span-2'>
      <div className='grid grid-cols-1'>
        <div className=''>
          <Select
            options={productsOptions}
            placeholder='Select Products...'
            className='sm:w-full xl:w-auto'
            isClearable
            onChange={(e) => handleCreateOrder(e, 'select')}
          />

        </div>
      </div>
      <div className='grid xl:grid-cols-5 sm:grid-cols-1'>
        {productsData &&
          productsData.map((e) => (
            <div
              key={e._id}
              className='flex flex-col justify-center border mt-6 p-4 w-full cursor-pointer shadow-md rounded-sm'
              onClick={() => handleCreateOrder(e, 'card')}
            >
              <div className='space-y-2 border-b p-2'>
                <img
                  src={e.imgUrl || 'https://mrcodpakistan.com/wp-content/uploads/2018/09/noImg_2.jpg'}
                  alt='product'
                  className='h-56 mx-auto object-contain'
                />
                <p className='text-center text-gray-400 font-bold'>{e.name}</p>
              </div>
              <div className='flex flex-col mt-3 h-full justify-end mx-auto'>
                <p className='text-center text-yellow-600 font-extrabold'>Available: {e.quantity}</p>
                <p className='text-center text-green-400 font-mono font-extrabold'>Rs {e.price}</p>
                {e.discount > 0 && (
                  <div className=''>
                    <p className='text-center text-purple-400 font-mono font-extrabold'>Discount {e.discount}%</p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {products.length > 0 && onlineStatus && (
        <div className='flex my-3 justify-center'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className='page-item' onClick={() => currentPage !== 1 && handlePageChange(productsFilter.page - 1)}>
                <button className='page-link'>
                  <span aria-hidden='true'>&laquo;</span>
                </button>
              </li>
              {Array(totalPages)
                .fill()
                .map((e, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 && 'active'}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    <button className='page-link' href='.'>
                      {i + 1}
                    </button>
                  </li>
                ))}
              <li
                className='page-item'
                onClick={() => currentPage < totalPages && handlePageChange(productsFilter.page + 1)}
              >
                <button className='page-link'>
                  <span aria-hidden='true'>&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;
