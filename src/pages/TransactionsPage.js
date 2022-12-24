import React from 'react';
import Transactions from '../components/Transactions/Transactions';
import Header from '../components/Header/Header';
import TransactionsManagement from '../components/Transactions';

const TransactionsPage = () => {
  return (
    <div className='p-10'>
      <Header />
      <TransactionsManagement />
    </div>
  );
};

export default TransactionsPage;
