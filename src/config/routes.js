import { PosPage, TransactionsPage } from '../pages';
import { TRANSACTIONS } from '../constants/pages';

const user = JSON.parse(localStorage.getItem('user'));

const routes =
  user?.role === 'admin'
    ? [
        {
          path: '/',
          exact: true,
          component: PosPage,
        },
        {
          path: TRANSACTIONS,
          component: TransactionsPage,
        },
      ]
    : user?.role === 'superAdmin'
    ? [
        {
          path: '/',
          exact: true,
          component: TransactionsPage,
        },
      ]
    : [
        {
          path: '/',
          exact: true,
          component: PosPage,
        },
      ];

export default routes;
