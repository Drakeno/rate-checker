import {
  RATE_LOADING,
  RATE_ERROR,
  RATE_SUCCESS,
  RATE_STORE,
} from './rate-actions'

const initialState = {
  rateName: '',
  currentRate: '0',
  oldRate: null,
  isLoading: false,
  isError: false,
}

const rateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RATE_LOADING: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }

    case RATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }

    case RATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentRate: action.data.price,
        rateName: action.data.symbol,
      }
    }

    case RATE_STORE: {
      return {
        ...state,
        oldRate: action.data,
      }
    }

    default:
      return state
  }
}

export default rateReducer
