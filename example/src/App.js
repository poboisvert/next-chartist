import React, { useState } from 'react'
import NextChartist from './NextChartist'

const App = () => {
  const [activeTab, setActiveTab] = useState('line')

  // ===== LINE CHART EXAMPLES =====

  // Basic Line Chart
  const basicLineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [[5, 2, 4, 2, 0]]
  }

  // Multi-series Line Chart
  const multiSeriesLineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      [5, 2, 4, 2, 0, 3, 2],
      [2, 3, 5, 1, 3, 2, 4]
    ]
  }

  const lineChartOptions = {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  }

  // Line Chart with Area
  const areaLineData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    series: [[5, 9, 7, 8, 5, 3, 5, 4]]
  }

  const areaLineOptions = {
    low: 0,
    showArea: true
  }

  // Line Chart with Points
  const pointsLineData = {
    labels: ['1', '2', '3', '4'],
    series: [[100, 120, 180, 200]]
  }

  const pointsLineOptions = {
    showPoint: true,
    lineSmooth: false
  }

  // ===== BAR CHART EXAMPLES =====

  // Basic Bar Chart
  const basicBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [[800000, 1200000, 1400000, 1300000]]
  }

  const basicBarOptions = {
    seriesBarDistance: 10,
    axisX: {
      offset: 60
    },
    axisY: {
      offset: 80,
      labelInterpolationFnc: function (value) {
        return value + ' CHF'
      },
      scaleMinSpace: 15
    }
  }

  // Horizontal Bar Chart
  const horizontalBarData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    series: [[5, 4, 3, 7, 5, 10]]
  }

  const horizontalBarOptions = {
    seriesBarDistance: 10,
    reverseData: true,
    horizontalBars: true,
    axisY: {
      offset: 70
    }
  }

  // Multi-series Bar Chart
  const multiSeriesBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }

  // Stacked Bar Chart
  const stackedBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000]
    ]
  }

  const stackedBarOptions = {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function (value) {
        return value / 1000 + 'k'
      }
    }
  }

  // Bar Chart with Distribute Series
  const distributedBarData = {
    labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    series: [20, 60, 120, 200, 180, 20, 10]
  }

  const distributedBarOptions = {
    distributeSeries: true
  }

  // Bar Chart with Speed Example from README.md
  const speedBarData = {
    labels: ['Speed'],
    series: [1000]
  }

  const speedBarOptions = {
    high: 2500,
    low: 0,
    reverseData: true,
    distributeSeries: true,
    horizontalBars: true,
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

  // ===== PIE CHART EXAMPLES =====

  // Basic Pie Chart
  const basicPieData = {
    series: [20, 10, 30, 40]
  }

  const basicPieOptions = {
    labelInterpolationFnc: function (value) {
      return value + '%'
    }
  }

  // Pie Chart with Labels
  const labelsPieData = {
    labels: ['Bananas', 'Apples', 'Grapes', 'Berries'],
    series: [20, 10, 30, 40]
  }

  // Donut Chart
  const donutData = {
    series: [20, 10, 30, 40]
  }

  const donutOptions = {
    donut: true,
    donutWidth: 60,
    donutSolid: false,
    startAngle: 270,
    total: 200,
    showLabel: true
  }

  // Gauge Chart
  const gaugeData = {
    series: [20, 10, 30, 40]
  }

  const gaugeOptions = {
    donut: true,
    donutWidth: 60,
    startAngle: 270,
    total: 200,
    showLabel: false
  }

  // Responsive Options Example
  const responsiveOptions = [
    [
      'screen and (min-width: 640px)',
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value
        }
      }
    ],
    [
      'screen and (min-width: 1024px)',
      {
        labelOffset: 80,
        chartPadding: 20
      }
    ]
  ]

  // Event Listener Example
  const chartListener = {
    draw: function (data) {
      if (data.type === 'slice') {
        // Get the total path length in pixels
        const pathLength = data.element._node.getTotalLength()
        // Set the dasharray and dashoffset to animate the stroke
        data.element.attr({
          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
        })
      }
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        NextChartist Examples - Chartist.js 1.5
      </h1>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <button
          onClick={() => setActiveTab('line')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            background: activeTab === 'line' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'line' ? 'white' : 'black',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Line Charts
        </button>
        <button
          onClick={() => setActiveTab('bar')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            background: activeTab === 'bar' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'bar' ? 'white' : 'black',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Bar Charts
        </button>
        <button
          onClick={() => setActiveTab('pie')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'pie' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'pie' ? 'white' : 'black',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Pie Charts
        </button>
      </div>

      {/* LINE CHARTS SECTION */}
      {activeTab === 'line' && (
        <div>
          <h2>Line Chart Examples</h2>

          <div style={{ marginBottom: '40px' }}>
            <h3>1. Basic Line Chart</h3>
            <NextChartist
              type='LineChart'
              data={basicLineData}
              options={lineChartOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>2. Multi-series Line Chart</h3>
            <NextChartist
              type='LineChart'
              data={multiSeriesLineData}
              options={lineChartOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>3. Line Chart with Area</h3>
            <NextChartist
              type='LineChart'
              data={areaLineData}
              options={areaLineOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>4. Line Chart with Points</h3>
            <NextChartist
              type='LineChart'
              data={pointsLineData}
              options={pointsLineOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>5. Line Chart with Responsive Options</h3>
            <NextChartist
              type='LineChart'
              data={multiSeriesLineData}
              options={lineChartOptions}
              responsiveOptions={responsiveOptions}
              style={{ height: '300px' }}
            />
          </div>
        </div>
      )}

      {/* BAR CHARTS SECTION */}
      {activeTab === 'bar' && (
        <div>
          <h2>Bar Chart Examples</h2>

          {/* README.md Example - Featured First */}
          <div
            style={{
              marginBottom: '40px',
              padding: '20px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              border: '2px solid #2196f3'
            }}
          >
            <h3 style={{ color: '#1976d2', marginTop: '0' }}>
              📖 Example from README.md (Featured)
            </h3>
            <p
              style={{
                color: '#555',
                fontStyle: 'italic',
                marginBottom: '15px'
              }}
            >
              This is the exact example from the README.md file
            </p>
            <NextChartist
              className='ct-octave'
              type='BarChart'
              data={speedBarData}
              options={speedBarOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>1. Basic Bar Chart</h3>
            <NextChartist
              type='BarChart'
              data={basicBarData}
              options={basicBarOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>2. Horizontal Bar Chart</h3>
            <NextChartist
              type='BarChart'
              data={horizontalBarData}
              options={horizontalBarOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>3. Multi-series Bar Chart</h3>
            <NextChartist
              type='BarChart'
              data={multiSeriesBarData}
              options={basicBarOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>4. Stacked Bar Chart</h3>
            <NextChartist
              type='BarChart'
              data={stackedBarData}
              options={stackedBarOptions}
              style={{ height: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>5. Distributed Bar Chart</h3>
            <NextChartist
              type='BarChart'
              data={distributedBarData}
              options={distributedBarOptions}
              style={{ height: '300px' }}
            />
          </div>
        </div>
      )}

      {/* PIE CHARTS SECTION */}
      {activeTab === 'pie' && (
        <div>
          <h2>Pie Chart Examples</h2>

          <div style={{ marginBottom: '40px' }}>
            <h3>1. Basic Pie Chart</h3>
            <NextChartist
              type='PieChart'
              data={basicPieData}
              options={basicPieOptions}
              style={{ height: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>2. Pie Chart with Labels</h3>
            <NextChartist
              type='PieChart'
              data={labelsPieData}
              options={basicPieOptions}
              style={{ height: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>3. Donut Chart</h3>
            <NextChartist
              type='PieChart'
              data={donutData}
              options={donutOptions}
              style={{ height: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>4. Gauge Chart</h3>
            <NextChartist
              type='PieChart'
              data={gaugeData}
              options={gaugeOptions}
              style={{ height: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3>5. Pie Chart with Event Listeners (Animation)</h3>
            <NextChartist
              type='PieChart'
              data={labelsPieData}
              options={basicPieOptions}
              listener={chartListener}
              style={{ height: '400px' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
