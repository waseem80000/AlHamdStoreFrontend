import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ProductsReducer from './products.reducer';
import OrdersReducer from './orders.reducer';
import categoriesReducer from './categories.reducer';
import customersReducer from './customers.reducer';
import usersReducer from './users.reducer';
import vendorsReducer from './vendors.reducer';
import storeReducer from './storeReducer';
import loaderReducer from './loader.reducer';
import expensesReducer from './expenses.reducer';
import onlineReducer from './onlineReducer';

export default combineReducers({
  isLoading: loaderReducer,
  auth: AuthReducer,
  products: ProductsReducer,
  orders: OrdersReducer,
  categories: categoriesReducer,
  stores: storeReducer,
  customers: customersReducer,
  users: usersReducer,
  vendors: vendorsReducer,
  expenses: expensesReducer,
  onlineStatus: onlineReducer,

});
