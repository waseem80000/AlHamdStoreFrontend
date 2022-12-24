import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../config/routes';
import React, { useEffect } from 'react';
import LoginPage from './LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { BASE_URL } from '../constants/apiUrl';
import { actionTypes } from '../constants/actionTypes';
import { toast } from 'react-toastify';
import { ConfirmOrder, GetOnHold } from '../actions/order.actions';
import { GetAllProducts, GetProducts } from '../actions/products.actions';

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const { onlineStatus } = useSelector((state) => {
    return { onlineStatus: state.onlineStatus.onlineStatus };
  });
  const productsFilter = useSelector((state) => state.products.productsFilter);
  const dispatch = useDispatch();

  const onlinePollingInterval = 50000;

  const checkOnlineStatus = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!navigator.onLine) return navigator.onLine;

    try {
      await fetch(BASE_URL, {
        method: 'GET',
        signal,
      });
      return true;
    } catch (error) {
      console.error(error);

      controller.abort();
    }
    return false;
  };

  const setOnline = () => {
    dispatch({ type: actionTypes.setOnline });
    toast.success('Internet connection is active now');
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        dispatch(ConfirmOrder(orders[i])).then((res) => {
          if (res.status === 201) {
            if (i === orders.length - 1) {
              localStorage.removeItem('orders');
              dispatch(GetOnHold());
              dispatch(GetProducts(productsFilter));
              dispatch(GetAllProducts());
            }
          }
        });
      }
    }
  };

  const setOffline = () => {
    if (onlineStatus) {
      dispatch({ type: actionTypes.setOffline });
      toast.warning('You are currently in offline mode');
    }
  };

  const checkStatus = async () => {
    const online = await checkOnlineStatus();
    if (onlineStatus === false && online === true) {
      const e = new Event('online');
      window.dispatchEvent(e);
    } else if (onlineStatus === true && online === false) {
      const e = new Event('offline');
      window.dispatchEvent(e);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);
    const id = setInterval(checkStatus, onlinePollingInterval);

    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
      clearInterval(id);
    };
  }, [onlineStatus]);

  useEffect(() => {}, []);

  return (
    <Router>
      {isLoading && <Loader />}
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index} element={<route.component />} />
        ))}
        <Route path='/Login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
