import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

const updateProductsQuantity = (payload, products) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === payload._id) {
      products[i] = { ...products[i], quantity: products[i].quantity - payload.orderQuantity };
    }
  }

  return products;
};

export default (state = initialState.products, action) => {
  switch (action.type) {
    case actionTypes.getProducts: {
      const { currentPage, products, totalPages } = action.payload;
      return { ...state, products: products, currentPage, totalPages };
    }
    case actionTypes.getAllProduct: {
      return { ...state, allProducts: action.payload };
    }
    case actionTypes.getProduct: {
      return { ...state, product: action.payload };
    }
    case actionTypes.getProductsStats: {
      const { stats, currentPage, totalPages } = action.payload;
      return {
        ...state,
        productsStats: {
          ...state.productsStats,
          stats: stats,
          currentPage: currentPage,
          totalPages: totalPages,
        },
      };
    }
    case actionTypes.filterProducts: {
      return { ...state, productsFilter: action.payload };
    }
    case actionTypes.filterStats: {
      return { ...state, productsStats: { ...state.productsStats, statsFilter: action.payload } };
    }
    case actionTypes.createProduct: {
      return { ...state, products: state.products.concat(action.payload) };
    }
    case actionTypes.editProduct: {
      return {
        ...state,
        products: state.products.map((e) => (e._id === action.payload._id ? action.payload : e)),
      };
    }
    case actionTypes.updateProductsQuantity: {
      for (let items of action.payload) {
        updateProductsQuantity(items, state.allProducts);
      }
      return { ...state, allProducts: state.allProducts };
    }
    case actionTypes.createSize: {
      return { ...state, productSizes: state.productSizes.concat(action.payload) };
    }
    case actionTypes.getSizes: {
      return { ...state, productSizes: action.payload.product_sizes };
    }
    case actionTypes.createColor: {
      return { ...state, productColors: state.productColors.concat(action.payload) };
    }
    case actionTypes.getColors: {
      return { ...state, productColors: action.payload.product_colors };
    }
    default:
      return state;
  }
};
