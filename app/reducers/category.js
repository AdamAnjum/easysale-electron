const initialState = {
  loading: 0,
  categories: [],
  total: 0,
  filter: {},
  pagination: {
    pageNo: 1,
    pageSize: 25
  },
  newCategory: {
    loading: 0
  }
};

const boxes = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_CATEGORY_REQUEST':
    case 'GET_CATEGORY_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'DELETE_CATEGORY_FAILED':
    case 'DELETE_CATEGORY_SUCCESS':
    case 'GET_CATEGORY_FAILED':
    case 'GET_CATEGORY_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    case 'SET_PAGE_SIZE_FOR_CATEGORY':
    case 'SET_PAGE_NUMBER_FOR_CATEGORY': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    }
    case 'SET_FILTER_FOR_CATEGORY': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'UPDATE_CATEGORY_REQUEST':
    case 'SAVE_CATEGORY_REQUEST': {
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          loading: ++state.newCategory.loading
        }
      };
    }
    case 'UPDATE_CATEGORY_FAILED':
    case 'UPDATE_CATEGORY_SUCCESS':
    case 'SAVE_CATEGORY_FAILED':
    case 'SAVE_CATEGORY_SUCCESS': {
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          loading: --state.newCategory.loading
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default boxes;
