import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const RateView = ({ rateName, currentRate, changePercentage }) => {
  if (currentRate === '0') {
    return 'Загрузка'
  }

  const viewPercentage = Number(changePercentage).toFixed(2)

  return (
    <div className="rate-box">
      <p className="value">
        Текущий курс {rateName}: <b>{currentRate}</b>
      </p>
      <p
        className={classNames('percentage', {
          percentage__low: viewPercentage <= 0.01,
          percentage__high: viewPercentage >= 0.01,
          percentage__static: viewPercentage > -0.01 && viewPercentage < 0.01,
        })}
      >
        {viewPercentage}%
      </p>
    </div>
  )
}

RateView.propTypes = {
  rateName: PropTypes.string,
  currentRate: PropTypes.string,
  changePercentage: PropTypes.number,
}

export default RateView
