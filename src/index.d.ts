import React from 'react'
import {
  IChartOptions,
  IResponsiveOptionTuple,
  ILineChartOptions,
  IBarChartOptions,
  IPieChartOptions
} from 'chartist'

export interface NextChartistProps {
  type: string
  data: object
  className?: string
  options?: IChartOptions
  listener?: any
  responsiveOptions?: any
  style?: React.CSSProperties
}

export interface NextChartistLineProps extends NextChartistProps {
  type: 'Line'
  options?: ILineChartOptions
  responseOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>
}

export interface NextChartistPieProps extends NextChartistProps {
  type: 'Pie'
  options?: IPieChartOptions
  responseOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>
}

export interface NextChartistBarProps extends NextChartistProps {
  type: 'BarChart'
  options: IBarChartOptions
  responseOptions?: Array<IResponsiveOptionTuple<IBarChartOptions>>
}

export default class NextChartist extends React.Component<NextChartistProps> {}
