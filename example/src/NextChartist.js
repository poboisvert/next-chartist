import React, { useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

// Handle client-side only import for Next.js compatibility
let Chartist = null
if (typeof window !== 'undefined') {
  try {
    Chartist = require('chartist')
  } catch {
    // Chartist not available
  }
}

// Supported chart types in Chartist 1.5
const CHART_TYPES = ['LineChart', 'BarChart', 'PieChart']

const NextChartist = ({
  type,
  data,
  className,
  options = {},
  responsiveOptions = [],
  style,
  children,
  listener,
  plugins = []
}) => {
  const chartRef = useRef(null)
  const chartistInstanceRef = useRef(null)
  const previousTypeRef = useRef(null)
  const listenerRefsRef = useRef({})

  // Normalize options and responsiveOptions to handle all Chartist 1.5 parameters
  const normalizedOptions = useMemo(() => {
    if (!options || typeof options !== 'object') {
      return {}
    }
    return { ...options }
  }, [options])

  const normalizedResponsiveOptions = useMemo(() => {
    if (!Array.isArray(responsiveOptions)) {
      return []
    }
    return [...responsiveOptions]
  }, [responsiveOptions])

  // Normalize data to handle all Chartist data formats
  const normalizedData = useMemo(() => {
    if (!data || typeof data !== 'object') {
      return {}
    }
    return { ...data }
  }, [data])

  useEffect(() => {
    // Skip SSR - only run on client
    if (typeof window === 'undefined' || !chartRef.current) {
      return
    }

    // Lazy load Chartist on client side if not already loaded
    if (!Chartist) {
      try {
        Chartist = require('chartist')
      } catch (error) {
        console.warn(
          'Chartist is not available. Make sure chartist is installed.',
          error
        )
        return
      }
    }

    // Validate chart type
    if (!type || typeof type !== 'string') {
      console.error('NextChartist: type prop is required and must be a string')
      return
    }

    // Check if chart type exists in Chartist
    if (!Chartist || typeof Chartist[type] !== 'function') {
      console.error(
        `NextChartist: Chartist.${type} is not available. ` +
          `Supported types: ${CHART_TYPES.join(', ')}`
      )
      return
    }

    // If type changed, destroy old chart and create new one
    if (previousTypeRef.current !== null && previousTypeRef.current !== type) {
      if (chartistInstanceRef.current) {
        try {
          // Remove all listeners before detaching
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                chartistInstanceRef.current.off(
                  event,
                  listenerRefsRef.current[event]
                )
              } catch {
                // Ignore errors when removing listeners
              }
            })
            listenerRefsRef.current = {}
          }
          chartistInstanceRef.current.detach()
        } catch {
          // Ignore cleanup errors
        }
        chartistInstanceRef.current = null
      }
    }
    previousTypeRef.current = type

    // Update existing chart or create new one
    if (chartistInstanceRef.current) {
      try {
        // Try to update the chart if update method is available
        if (typeof chartistInstanceRef.current.update === 'function') {
          chartistInstanceRef.current.update(
            normalizedData,
            normalizedOptions,
            normalizedResponsiveOptions
          )
        } else {
          // If update is not supported, recreate the chart
          try {
            // Remove all listeners before detaching
            if (listenerRefsRef.current) {
              Object.keys(listenerRefsRef.current).forEach((event) => {
                try {
                  chartistInstanceRef.current.off(
                    event,
                    listenerRefsRef.current[event]
                  )
                } catch {
                  // Ignore errors
                }
              })
              listenerRefsRef.current = {}
            }
            chartistInstanceRef.current.detach()
          } catch {
            // Ignore detach errors
          }
          chartistInstanceRef.current = null
        }
      } catch (updateError) {
        // If update fails, recreate the chart
        console.warn('Chart update failed, recreating chart:', updateError)
        try {
          if (chartistInstanceRef.current) {
            // Remove all listeners before detaching
            if (listenerRefsRef.current) {
              Object.keys(listenerRefsRef.current).forEach((event) => {
                try {
                  chartistInstanceRef.current.off(
                    event,
                    listenerRefsRef.current[event]
                  )
                } catch {
                  // Ignore errors
                }
              })
              listenerRefsRef.current = {}
            }
            chartistInstanceRef.current.detach()
          }
        } catch {
          // Ignore detach errors
        }
        chartistInstanceRef.current = null
      }
    }

    // Create new chart if needed
    if (!chartistInstanceRef.current && chartRef.current) {
      try {
        // Create chart with all Chartist 1.5 parameters
        const chartOptions = {
          ...normalizedOptions
        }

        // Apply plugins if provided (Chartist 1.5 supports plugins)
        if (Array.isArray(plugins) && plugins.length > 0) {
          chartOptions.plugins = plugins
        }

        const newChartist = new Chartist[type](
          chartRef.current,
          normalizedData,
          chartOptions,
          normalizedResponsiveOptions
        )

        chartistInstanceRef.current = newChartist

        // Attach event listeners if provided (supports all Chartist events)
        if (listener && typeof listener === 'object') {
          // Remove previous listeners first
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                newChartist.off(event, listenerRefsRef.current[event])
              } catch {
                // Ignore errors
              }
            })
          }
          listenerRefsRef.current = {}

          // Add new listeners
          for (const event in listener) {
            if (
              Object.prototype.hasOwnProperty.call(listener, event) &&
              typeof listener[event] === 'function'
            ) {
              try {
                newChartist.on(event, listener[event])
                listenerRefsRef.current[event] = listener[event]
              } catch (listenerError) {
                console.warn(
                  `Failed to attach listener for event "${event}":`,
                  listenerError
                )
              }
            }
          }
        }
      } catch (err) {
        console.error('Error creating Chartist chart:', err)
      }
    }

    // Cleanup function
    return () => {
      if (chartistInstanceRef.current) {
        try {
          // Remove all listeners before detaching
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                chartistInstanceRef.current.off(
                  event,
                  listenerRefsRef.current[event]
                )
              } catch {
                // Ignore errors
              }
            })
            listenerRefsRef.current = {}
          }
          chartistInstanceRef.current.detach()
        } catch {
          // Ignore cleanup errors
        }
        chartistInstanceRef.current = null
      }
    }
  }, [
    type,
    normalizedData,
    normalizedOptions,
    normalizedResponsiveOptions,
    listener,
    plugins
  ])

  const childrenWithProps =
    children &&
    React.Children.map(children, (child) =>
      React.cloneElement(child, {
        type,
        data
      })
    )

  return (
    <div
      className={`ct-chart ${className || ''}`}
      ref={chartRef}
      style={{
        minHeight: '300px',
        minWidth: '300px',
        ...style
      }}
    >
      {childrenWithProps}
    </div>
  )
}

NextChartist.propTypes = {
  // Chart type - supports all Chartist 1.5 chart types
  type: PropTypes.string.isRequired,
  // Chart data - supports all Chartist data formats
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      labels: PropTypes.array,
      series: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(PropTypes.array)
      ])
    })
  ]).isRequired,
  // CSS class name for the chart container
  className: PropTypes.string,
  // Chart options - supports all Chartist 1.5 options
  options: PropTypes.object,
  // Responsive options - array of responsive breakpoints
  responsiveOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      )
    ])
  ),
  // Inline styles for the chart container
  style: PropTypes.object,
  // Event listeners - supports all Chartist events
  listener: PropTypes.objectOf(PropTypes.func),
  // React children
  children: PropTypes.node,
  // Chartist plugins array
  plugins: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  )
}

export default NextChartist
