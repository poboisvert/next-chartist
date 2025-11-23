// Test file to verify TypeScript declarations
import React from 'react'
import NextChartist, {
  ChartType,
  ChartData,
  ChartistOptions,
  NextChartistProps,
  ResponsiveOption,
  ChartistListeners
} from './index'

// Test basic usage
const testChart: React.FC = () => {
  const data: ChartData = {
    labels: ['Mon', 'Tue', 'Wed'],
    series: [[5, 2, 4]]
  }

  const options: ChartistOptions = {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  }

  const type: ChartType = 'LineChart'

  return <NextChartist type={type} data={data} options={options} />
}

// Test with all props
const testAllProps: React.FC = () => {
  const data: ChartData = {
    labels: ['A', 'B', 'C'],
    series: [10, 20, 30]
  }

  const options: ChartistOptions = {
    low: 0,
    high: 100,
    fullWidth: true
  }

  const responsiveOptions: ResponsiveOption[] = [
    ['screen and (min-width: 640px)', { chartPadding: 30 }]
  ]

  const listener: ChartistListeners = {
    draw: (data) => {
      console.log('Draw event', data)
    }
  }

  return (
    <NextChartist
      type="BarChart"
      data={data}
      options={options}
      responsiveOptions={responsiveOptions}
      className="my-chart"
      style={{ minHeight: '400px' }}
      listener={listener}
      plugins={[]}
    >
      <div>Children content</div>
    </NextChartist>
  )
}

export { testChart, testAllProps }

