import { combineReducers } from 'redux'
import rateReducer from './rate-reducer'

export default combineReducers({
  rate: rateReducer,
})
