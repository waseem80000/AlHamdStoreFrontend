import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.orders, action) => {
  switch (action.type) {
    case actionTypes.getOrders: {
      const { orders, currentPage, totalPages, totalTransactions, totalSales, totalProfit, chartStats } =
        action.payload;

      return {
        ...state,
        allOrders: orders,
        currentPage,
        totalPages,
        totalTransactions,
        totalSales,
        totalProfit,
        chartStats,
      };
    }
    case actionTypes.confirmOrder: {
      return { ...state, allOrders: state.allOrders.concat(action.payload) };
    }
    case actionTypes.getOrder: {
      return { ...state, order: action.payload };
    }
    case actionTypes.getOnHold: {
      return { ...state, onHold: action.payload };
    }
    case actionTypes.editOnHold: {
      return { ...state, currentOrder: action.payload };
    }
    case actionTypes.updatePrice: {
      const { id, value } = action.payload;
      const updatedOrder = state.currentOrder.map((e) => (e._id === id ? { ...e, price: value } : e));
      return { ...state, currentOrder: updatedOrder };
    }
    case actionTypes.createOrder: {
      let alreadyExists;
      let createNew;
      let updateItem;
      if (action.status === 'CREATE_ORDER') {
        alreadyExists = state.currentOrder.find((e) => e._id === action.payload._id);
        if (alreadyExists) {
          updateItem =
            alreadyExists &&
            state.currentOrder.map((e) =>
              e._id === action.payload._id ? { ...e, orderQuantity: action.payload.orderQuantity } : e
            );
        } else {
          createNew = !alreadyExists && state.currentOrder.concat(action.payload);
        }
      } else {
        alreadyExists = state.currentOrder.filter((e) => e._id === action.payload._id);
        if (alreadyExists.length > 0) {
          if (alreadyExists.length === 1) {
            const previousDiscountedPrice =
              (Number(alreadyExists[0].currentPrice) * Number(alreadyExists[0].currentDiscount)) / 100;
            const currentDiscountedPrice = (Number(action.payload.price) * Number(action.payload.discount)) / 100;
            if (
              alreadyExists[0].currentPrice &&
              alreadyExists[0].currentDiscount &&
              previousDiscountedPrice !== currentDiscountedPrice
            ) {
              createNew = state.currentOrder.concat({
                ...action.payload,
                uuid: Math.random(),
                orderQuantity:
                  action.payload.orderQuantity > alreadyExists[0].previousQuantity
                    ? action.payload.orderQuantity - alreadyExists[0].previousQuantity
                    : alreadyExists[0].previousQuantity - action.payload.orderQuantity,
              });
            } else {
              updateItem = state.currentOrder.map((e) =>
                e._id === action.payload._id ? { ...e, orderQuantity: action.payload.orderQuantity } : e
              );
            }
          } else {
            updateItem = state.currentOrder.map((e) =>
              e.uuid === alreadyExists[alreadyExists.length - 1].uuid
                ? { ...e, orderQuantity: action.payload.orderQuantity, delete: undefined }
                : e
            );
          }
        } else {
          createNew = state.currentOrder.concat({ ...action.payload, uuid: Math.random() });
        }
      }

      return { ...state, currentOrder: updateItem ? updateItem : createNew };
    }
    case actionTypes.deleteOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.map((e) =>
          e._id === action.payload._id && e.uuid === action.payload.uuid ? { ...e, delete: true } : e
        ),
      };
    }
    case actionTypes.deleteCurrentOrderItem: {
      return {
        ...state,
        currentOrder: state.currentOrder.filter((e) => e.uuid !== action.payload.uuid || e._id !== action.payload._id),
      };
    }
    case actionTypes.deleteAllOrderItems: {
      return { ...state, currentOrder: [] };
    }
    case actionTypes.updateOrder: {
      return { ...state, allOrders: state.allOrders.map((e) => (e._id === action.payload._id ? action.payload : e)) };
    }
    case actionTypes.updateOrderStatus: {
      return { ...state, orderStatus: action.payload };
    }
    default:
      return state;
  }
};
