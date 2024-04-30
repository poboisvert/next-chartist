import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

const NextChartist = ({
  type,
  data,
  className,
  options,
  responsiveOptions,
  style,
  children,
  listener
}) => {
  const chartRef = useRef(null)
  const [chartist, setChartist] = useState(null)

  useEffect(() => {
    updateChart()
    return () => {
      if (chartist) {
        try {
          chartist.detach()
        } catch (err) {
          throw new Error('Internal chartist error', err)
        }
      }
    }
  }, [chartist])

  useCallback(() => {
    updateChart()
  }, [type, data, options, responsiveOptions, listener])

  const updateChart = () => {
    const Chartist = require('chartist')
    let event

    if (chartist) {
      chartist.update(data, options, responsiveOptions)
    } else {
      const newChartist = new Chartist[type](
        chartRef.current,
        data,
        options,
        responsiveOptions
      )
      setChartist(newChartist)

      if (listener) {
        for (event in listener) {
          if (listener.hasOwnProperty(event)) {
            newChartist.on(event, listener[event])
          }
        }
      }
    }
  }

  const childrenWithProps =
    children &&
    React.Children.map(children, (child) =>
      React.cloneElement(child, {
        type,
        data
      })
    )

  return (
    <div className={`ct-chart ${className || ''}`} ref={chartRef} style={style}>
      {childrenWithProps}
    </div>
  )
}

NextChartist.propTypes = {
  type: PropTypes.oneOf(['Line', 'BarChart', 'Pie']).isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  options: PropTypes.object,
  responsiveOptions: PropTypes.array,
  style: PropTypes.object,
  listener: PropTypes.object
}

export default NextChartist
