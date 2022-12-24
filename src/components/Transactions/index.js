import React, { useState } from 'react';
import Expenses from './Expenses';
import Transactions from './Transactions';

const TransactionsManagement = () => {
  const [active, setActive] = useState('transactions');
  return (
    <div className='bg-white mt-4'>
      <div className='flex justify-center '>
        <button
          className={`${
            active === 'transactions' ? 'text-green-500 border-green-500 font-bold' : 'text-gray-500 font-medium '
          } text-lg px-4 py-2 border-b-2 transition-all ease-in-out`}
          onClick={() => setActive('transactions')}
        >
          Transactions
        </button>
        <button
          className={`${
            active === 'expenses' ? 'text-green-500 border-b-2 border-green-500 font-bold' : 'text-gray-500 font-medium'
          } text-lg px-4 py-2 border-b-2 transition-all ease-in-out`}
          onClick={() => setActive('expenses')}
        >
          Expenses
        </button>
      </div>
      {active === 'transactions' ? <Transactions /> : <Expenses />}
    </div>
  );
};

export default TransactionsManagement;
