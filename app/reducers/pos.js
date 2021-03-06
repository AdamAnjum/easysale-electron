const initialState = {
  loading: 0,
  customers: [],
  products: []
};

const pos = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT_FOR_POS_REQUEST':
    case 'GET_PRODUCTS_BY_NAME_FOR_POS_REQUEST':
    case 'GET_CUSTOMERS_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'CHECKOUT_FOR_POS_FAILED':
    case 'CHECKOUT_FOR_POS_SUCCESS':
    case 'GET_PRODUCTS_BY_NAME_FOR_POS_FAILED':
    case 'GET_PRODUCTS_BY_NAME_FOR_POS_SUCCESS':
    case 'GET_CUSTOMERS_FAILED':
    case 'GET_CUSTOMERS_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default pos;
