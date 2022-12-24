const initialState = {
  auth: {
    isSignedIn: false,
  },
  isLoading: false,
  online: { onlineStatus: navigator.onLine },
  products: {
    product: {},
    products: [],
    allProducts: [],
    productSizes: [],
    productColors: [],
    productsStats: {
      stats: [],
      totalPages: null,
      currentPage: 1,
      statsFilter: { page: 1, perPage: 10, keyword: '', store: '' },
    },
    productsFilter: { page: 1, per_page: 10, category_id: null, keyword: '' },
    currentPage: 1,
    totalPages: null,
  },
  expenses: {
    expenses: [],
    currentPage: 1,
    totalPages: null,
    noOfExpenses: 0,
    totalExpense: 0,
    expenseStats: [],
  },
  orders: {
    orderStatus: 'CREATE_ORDER',
    allOrders: [],
    order: {},
    onHold: [],
    currentOrder: [],
    currentPage: 1,
    totalPages: null,
    totalTransactions: 0,
    totalSales: 0,
    totalProfit: 0,
    chartStats: [],
  },
  categories: [],
  stores: [],
  vendors: [],
  users: [],
  customers: {
    allCustomers: [],
    currentCustomer: {},
  },
};

export default initialState;
