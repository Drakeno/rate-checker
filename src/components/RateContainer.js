import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getCurrentRate,
  storeNewRate,
  storeOldRate,
  getFallback,
} from '../redux/rate-actions'
import RateView from './RateView'

const RateContainer = () => {
  const dispatch = useDispatch()
  const rateData = useSelector((store) => store.rate)

  const calclulateChange = (newVal, oldVal) =>
    newVal - oldVal === 0 ? (100 * (newVal - oldVal)) / oldVal : 0

  useEffect(() => {
    const N = 1000

    if (rateData.currentRate === 0 && !rateData.isLoading) {
      dispatch(getCurrentRate()).then((result) => {
        dispatch(storeNewRate(result))
      })
    }

    const startUpdateRate = () => {
      const start = new Date().getTime()
      if (!rateData.isLoading && !document.hidden) {
        dispatch(getCurrentRate()).then((result) => {
          const end = new Date().getTime()

          if (result && end - start < N) {
            dispatch(storeOldRate(rateData.currentRate))
            dispatch(storeNewRate(result))
          } else {
            dispatch(getFallback())
          }
        })
      }
    }

    const interval = setInterval(() => startUpdateRate(), N)
    return () => clearInterval(interval)
  }, [dispatch, rateData.currentRate, rateData.isLoading])

  return (
    <RateView
      rateName={rateData.rateName}
      currentRate={rateData.currentRate}
      changePercentage={calclulateChange(
        rateData.currentRate,
        rateData.oldRate,
      )}
    />
  )
}

export default RateContainer
