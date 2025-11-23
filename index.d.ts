import * as React from 'react'

/**
 * Supported chart types in Chartist
 */
export type ChartType = 'LineChart' | 'BarChart' | 'PieChart'

/**
 * Chart data series - can be a simple array or array of arrays for multiple series
 */
export type ChartSeries = number[] | number[][]

/**
 * Chart data structure
 */
export interface ChartData {
  labels?: string[]
  series: ChartSeries
}

/**
 * Chartist plugin type - can be a function or an object
 */
export type ChartistPlugin = ((chart: any) => void) | Record<string, any>

/**
 * Chartist event listener function
 */
export type ChartistEventListener = (data: any) => void

/**
 * Event listeners object - maps event names to listener functions
 */
export interface ChartistListeners {
  [eventName: string]: ChartistEventListener
}

/**
 * Responsive option entry - can be a string (media query) or array with media query and options
 */
export type ResponsiveOption =
  | string
  | [string, ChartistOptions | ChartistOptions[]]

/**
 * Chartist chart options
 * Supports all Chartist 1.5 options
 */
export interface ChartistOptions {
  // Common options
  width?: number | string
  height?: number | string
  low?: number
  high?: number
  fullWidth?: boolean
  chartPadding?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  classNames?: {
    [key: string]: string
  }
  // Line/Bar chart specific
  showLine?: boolean
  showPoint?: boolean
  showArea?: boolean
  areaBase?: number
  lineSmooth?: boolean | ((chart: any) => void)
  lowLine?: boolean
  showGridBackground?: boolean
  axisX?: {
    offset?: number
    position?: string
    labelOffset?: {
      x?: number
      y?: number
    }
    showLabel?: boolean
    showGrid?: boolean
    labelInterpolationFnc?: (value: any, index: number) => string
    onlyInteger?: boolean
    [key: string]: any
  }
  axisY?: {
    offset?: number
    position?: string
    labelOffset?: {
      x?: number
      y?: number
    }
    showLabel?: boolean
    showGrid?: boolean
    labelInterpolationFnc?: (value: any, index: number) => string
    onlyInteger?: boolean
    scaleMinSpace?: number
    [key: string]: any
  }
  // Bar chart specific
  horizontalBars?: boolean
  distributeSeries?: boolean
  reverseData?: boolean
  stackBars?: boolean
  // Pie chart specific
  donut?: boolean
  donutWidth?: number
  startAngle?: number
  total?: number
  labelDirection?: 'neutral' | 'explode' | 'implode'
  labelOffset?: number
  labelInterpolationFnc?: (value: any, index: number) => string
  // Plugins
  plugins?: ChartistPlugin[]
  // Allow any other Chartist options
  [key: string]: any
}

/**
 * Props for the NextChartist component
 */
export interface NextChartistProps {
  /**
   * Chart type - supports all Chartist 1.5 chart types
   * @required
   */
  type: ChartType

  /**
   * Chart data - supports all Chartist data formats
   * @required
   */
  data: ChartData

  /**
   * CSS class name for the chart container
   */
  className?: string

  /**
   * Chart options - supports all Chartist 1.5 options
   */
  options?: ChartistOptions

  /**
   * Responsive options - array of responsive breakpoints
   */
  responsiveOptions?: ResponsiveOption[]

  /**
   * Inline styles for the chart container
   */
  style?: React.CSSProperties

  /**
   * Event listeners - supports all Chartist events
   */
  listener?: ChartistListeners

  /**
   * React children
   */
  children?: React.ReactNode

  /**
   * Chartist plugins array
   */
  plugins?: ChartistPlugin[]
}

/**
 * NextChartist - A React component for creating responsive charts with Chartist.js
 *
 * @example
 * ```tsx
 * import NextChartist from 'next-chartist'
 *
 * const MyChart = () => {
 *   const data = {
 *     labels: ['Mon', 'Tue', 'Wed'],
 *     series: [[5, 2, 4]]
 *   }
 *
 *   return <NextChartist type="LineChart" data={data} />
 * }
 * ```
 */
declare const NextChartist: React.FC<NextChartistProps>

export default NextChartist
