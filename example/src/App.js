import React from 'react'
import NextChartist from './NextChartist'

var dataChart = {
  labels: ['Speed'],
  series: [1000]
}

var options = {
  high: 2500,
  low: 0,
  reverseData: true,
  distributeSeries: true,
  horizontalBars: false,
  chartPadding: {
    right: 50
  },
  axisY: {
    offset: 125,
    onlyInteger: true
  },
  axisX: {
    onlyInteger: true
  }
}

const App = () => {
  return (
    <NextChartist
      className={'ct-octave'}
      data={dataChart}
      options={options}
      type={'BarChart'}
    />
  )
}

export default App
