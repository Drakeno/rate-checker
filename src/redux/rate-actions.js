export const RATE_LOADING = 'RATE_LOADING'
export const RATE_ERROR = 'RATE_ERROR'
export const RATE_SUCCESS = 'RATE_SUCCESS'
export const RATE_STORE = 'RATE_STORE'

const CURRENT_RATE_URL =
  'https://api.binance.com/api/v3/ticker/price?symbol=ETHBTC'

export const getFallback = () => async (dispatch) => {
  dispatch({
    type: RATE_ERROR,
  })
}

export const getCurrentRate = () => async (dispatch) => {
  dispatch({
    type: RATE_LOADING,
  })

  return fetch(CURRENT_RATE_URL)
    .then((response) => response.json())
    .catch((error) => {
      console.log(`Ошибка: ${error}`)
      getFallback()
    })
}
export const storeNewRate = (newRate) => async (dispatch) => {
  dispatch({
    type: RATE_SUCCESS,
    data: newRate,
  })
}

export const storeOldRate = (oldRate) => async (dispatch) => {
  dispatch({
    type: RATE_STORE,
    data: oldRate,
  })
}
