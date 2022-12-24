import { EyeIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentCustomerAction } from '../../actions/customers.actions';
import { createOrderAction, getOrderAction, GetOrders, updateOrderStatusAction } from '../../actions/order.actions';
import { filterProductsStatsAction, GetProductsStats } from '../../actions/products.actions';
import ViewOrdersModal from '../Modals/ViewOrderModal';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Transactions = () => {
  const dispatch = useDispatch();
  const {
    orders,
    users,
    productsStats,
    salesman,
    orderStatus,
    totalTransactions,
    totalProfit,
    totalSales,
    chartStats,
    stores,
  } = useSelector((state) => ({
    orders: state.orders,
    users: state.users,
    productsStats: state.products.productsStats,
    salesman: state.users.filter((e) => e.role === 'salesman'),
    orderStatus: state.orders.orderStatus,
    totalTransactions: state.orders.totalTransactions,
    totalSales: state.orders.totalSales,
    totalProfit: state.orders.totalProfit,
    chartStats: state.orders.chartStats,
    stores: state.stores,
  }));
  const initialFilters = {
    created_at_gteq: '',
    created_at_lteq: '',
    status_in: '',
    cashier_id_eq: '',
    salesman_id_eq: '',
    store: '',
    invoiceNo: '',
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const [ordersFilter, setOrdersFilter] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [ordersData, setOrdersData] = useState(null);
  const [ordersPagination, setOrdersPagination] = useState({ perPage: 10, page: 1, keyword: '' });
  useEffect(() => {
    dispatch(GetOrders({ query: ordersFilter }, ordersPagination));
  }, [dispatch, ordersFilter, ordersPagination]);

  useEffect(() => {
    dispatch(GetProductsStats(productsStats.statsFilter));
  }, [dispatch, productsStats.statsFilter]);

  const handleOrdersFilterChange = (e) => {
    const { name, value } = e.target;
    setOrdersFilter((pre) => ({
      ...pre,
      [name]: value,
    }));
    if (name === 'store') {
      const { statsFilter } = productsStats;
      dispatch(filterProductsStatsAction({ ...statsFilter, store: value }));
    }
  };

  const handlePageChange = (page) => {
    const { statsFilter } = productsStats;
    dispatch(filterProductsStatsAction({ ...statsFilter, page }));
  };

  const handleOrdersPageChange = (page) => {
    setOrdersPagination({ ...ordersPagination, page });
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

  const handleProductsSearch = (e) => {
    const { statsFilter } = productsStats;
    const { value } = e.target;
    dispatch(filterProductsStatsAction({ ...statsFilter, keyword: value }));
  };

  const handleOrdersSearch = (e) => {
    const { value } = e.target;
    setOrdersFilter({ ...ordersFilter, invoiceNo: value });
  };

  const optimizedSearch = debounce(handleProductsSearch);
  const optimizedInvoiceSearch = debounce(handleOrdersSearch);

  const handleProductsPerPageChange = (e) => {
    const { statsFilter } = productsStats;
    const { value } = e.target;
    dispatch(filterProductsStatsAction({ ...statsFilter, perPage: value }));
  };

  const handleOrdersView = (order) => {
    setOrdersData(order.orderItems);
    setIsOpen(true);
  };

  const manipulateProducts = (data) => {
    const result = data.map((e) => ({
      ...e.product,
      uuid: Math.random(),
      currentDiscount: e.currentDiscount,
      currentPrice: e.currentPrice,
      orderQuantity: e.quantity,
      previousQuantity: e.quantity,
      previousPaid: e.paidPrice,
    }));
    return result;
  };

  const OrderUpdateHandler = (data) => {
    dispatch(getOrderAction(data));
    dispatch(createOrderAction(orderStatus, manipulateProducts(data.orderItems)));
    dispatch(currentCustomerAction(data?.customer));
    dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    navigate('/', { state: { salesman: data?.salesman } });
  };

  const labels = chartStats.length > 0 && chartStats.map((e) => new Date(e._id).toDateString());
  const chartData = chartStats.length > 0 && chartStats.map((e) => e.totalSaleAmount);

  const state = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <div className={`grid xl:grid-cols-${user.role === 'superAdmin' ? 7 : 6} sm:grid-cols-2 gap-4 p-5 border-b`}>
        <h1 className='text-2xl text-gray-600 flex items-center'>Transactions</h1>
        {user.role === 'superAdmin' && (
          <div className='flex flex-col'>
            <label className='mb-1 text-gray-500 font-bold'>Store</label>
            <select className='input-select' name='store' onChange={handleOrdersFilterChange}>
              <option value='' selected>
                All
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
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Salesman</label>
          <select className='input-select' name='salesman_id_eq' onChange={handleOrdersFilterChange}>
            <option value=''>All</option>
            {salesman &&
              salesman.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Cashier</label>
          <select className='input-select' name='cashier_id_eq' onChange={handleOrdersFilterChange}>
            <option value='' selected>
              All
            </option>
            {users &&
              users.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Status</label>
          <select className='input-select' name='status_in' onChange={handleOrdersFilterChange}>
            <option value='' selected>
              All
            </option>
            <option value='paid'>Paid</option>
            <option value='onHold'>OnHold</option>
          </select>
        </div>
        <div className='flex flex-col col-span-2'>
          <label className='mb-1 text-gray-500 font-bold'>Date</label>
          <div className='flex border bg-white rounded-lg p-2 space-x-3 w-9/12'>
            <input type='date' className='' name='created_at_gteq' onChange={handleOrdersFilterChange} />
            <span className='text-gray-500 font-bold'>To</span>
            <input type='date' className='' name='created_at_lteq' onChange={handleOrdersFilterChange} />
          </div>
        </div>
      </div>

      <div className='my-5 grid xl:grid-cols-3 sm:grid-cols-1 gap-4'>
        <div className='border p-3'>
          <div className='flex justify-between mt-3'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Products</h1>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display</label>
              <select
                className='input-select'
                onChange={handleProductsPerPageChange}
                value={productsStats.statsFilter.perPage}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div>
              <input
                type='text'
                className='input-field w-40'
                placeholder='Search Products...'
                onChange={optimizedSearch}
              />
            </div>
          </div>
          <div className='h-60v overflow-y-auto my-6'>
            <div className='my-4 h-4/6'>
              <table className='whitespace-nowrap order-table w-full'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sold</th>
                    <th>Available</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {productsStats.stats &&
                    productsStats.stats.map((e) => (
                      <tr key={e._id}>
                        <td className=''>{e.product.name}</td>
                        <td className=''>{e.sold}</td>
                        <td className=''>{e.available}</td>
                        <td className=''>Rs {e.sales}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {productsStats.stats.length > 0 && (
            <div className='flex my-3 justify-center'>
              <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                  <li
                    className='page-item'
                    onClick={() => productsStats.currentPage !== 1 && handlePageChange(productsStats.currentPage - 1)}
                  >
                    <button className='page-link'>
                      <span aria-hidden='true'>&laquo;</span>
                    </button>
                  </li>
                  {Array(productsStats.totalPages)
                    .fill()
                    .map((e, i) => (
                      <li
                        key={i}
                        className={`page-item ${productsStats.currentPage === i + 1 && 'active'}`}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        <button className='page-link' href='.'>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  <li
                    className='page-item'
                    onClick={() =>
                      productsStats.currentPage < productsStats.totalPages &&
                      handlePageChange(productsStats.currentPage + 1)
                    }
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
        <div className='xl:col-span-2'>
          <div className='border-b pb-2 flex justify-between p-2'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Total</h1>
            <div>
              <input
                type='text'
                className='input-field'
                placeholder='Search with invoice#...'
                onChange={optimizedInvoiceSearch}
              />
            </div>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display records</label>
              <select
                className='input-select'
                value={ordersPagination.perPage}
                onChange={(e) => setOrdersPagination({ ...ordersPagination, perPage: e.target.value })}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className='grid xl:grid-cols-4 sm:grid-cols-1 mt-3'>
            <div className='space-y-3 text-sm font-medium sm:grid sm:grid-cols-2 xl:block my-3'>
              <div className='w-56 h-40 bg-green-100 rounded-md'>
                <div className='text-2xl text-green-900 flex flex-col h-full items-center justify-center'>
                  <h1>Sales</h1>
                  <h1>Rs {Math.round(totalSales)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-yellow-100 rounded-md'>
                <div className='text-2xl text-yellow-900 flex flex-col h-full items-center justify-center'>
                  <h1>Transactions</h1>
                  <h1>{totalTransactions}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-blue-100 rounded-md'>
                <div className='text-2xl text-blue-900 flex flex-col h-full items-center justify-center'>
                  <h1>Profit</h1>
                  <h1>Rs {Math.round(totalProfit)}</h1>
                </div>
              </div>
            </div>
            <div className='col-span-3 my-3'>
              <div className='h-60v overflow-y-auto border'>
                <div className='h-4/6'>
                  <table className='whitespace-nowrap order-table'>
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Change</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Cashier</th>
                        <th>Salesman</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.allOrders &&
                        orders.allOrders.map((e) => (
                          <tr key={e._id}>
                            <td className=''>{e?.invoiceNo || 'N/A'}</td>
                            <td>{e?.customer?.name || 'N/A'}</td>
                            <td className=''>{new Date(e.createdAt).toDateString()}</td>
                            <td className=''>Rs: {Math.round(e.total)}</td>
                            <td className=''> Rs: {Math.round(e?.paid) || Math.round(e.total)}</td>
                            <td>Rs: {e?.change ? e.change : 0}</td>
                            <td>Cash</td>
                            <td>
                              <p
                                className={`rounded-full text-sm font-medium px-3 py-2 ${
                                  e.status === 'paid' ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'
                                }`}
                              >
                                {e.status.toUpperCase()}
                              </p>
                            </td>
                            <td>{e.cashier?.name}</td>
                            <td>{e?.salesman?.name || 'N/A'}</td>
                            <td>
                              <button className='btn-sm-yellow ml-3' onClick={() => handleOrdersView(e)}>
                                <EyeIcon className='h-4' />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {productsStats.stats.length > 0 && (
                <div className='flex my-3 justify-center'>
                  <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                      <li
                        className='page-item'
                        onClick={() => orders.currentPage !== 1 && handleOrdersPageChange(orders.currentPage - 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&laquo;</span>
                        </button>
                      </li>
                      {Array(orders.totalPages)
                        .fill()
                        .map((e, i) => (
                          <li
                            key={i}
                            className={`page-item ${orders.currentPage === i + 1 && 'active'}`}
                            onClick={() => handleOrdersPageChange(i + 1)}
                          >
                            <button className='page-link' href='.'>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      <li
                        className='page-item'
                        onClick={() =>
                          orders.currentPage < orders.totalPages && handleOrdersPageChange(orders.currentPage + 1)
                        }
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
          </div>
        </div>
      </div>
      <h1 className='text-center text-4xl font-extrabold text-gray-600'>Total Sales Chart</h1>
      <div className='my-5 grid xl:grid-cols-2 sm:grid-cols-1 gap-2'>
        <div className='h-3/5 w-3/5'>
          <Doughnut
            data={state}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </div>
        <div className='border p-3'>
          <div className='h-60v overflow-y-auto my-6'>
            <div className='my-4 h-4/6'>
              <table className='whitespace-nowrap order-table w-full'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Sale</th>
                    <th>Total Transactions</th>
                  </tr>
                </thead>
                <tbody>
                  {chartStats &&
                    chartStats.map((e) => (
                      <tr key={e._id}>
                        <td className=''>{new Date(e._id).toDateString()}</td>
                        <td className=''>RS {e.totalSaleAmount}</td>
                        <td className=''>{e.count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ViewOrdersModal isOpen={isOpen} setIsOpen={setIsOpen} orderDetails={ordersData} />
    </div>
  );
};

export default Transactions;
