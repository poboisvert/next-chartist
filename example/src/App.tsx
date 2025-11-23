import React, { useState } from 'react'
import { NextChartist, useChartist } from 'next-chartist'
import './App.css'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'line' | 'bar' | 'pie' | 'hook'>('line')

  // Example data for different chart types
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      [5, 2, 4, 2, 0, 3, 5],
      [2, 3, 3, 1, 4, 5, 3]
    ]
  }

  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }

  const pieChartData = {
    labels: ['Bananas', 'Apples', 'Grapes', 'Oranges'],
    series: [20, 15, 40, 25]
  }

  const lineChartOptions = {
    fullWidth: true,
    chartPadding: {
      right: 40
    },
    low: 0
  }

  const barChartOptions = {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value: number) {
        return (value / 1000) + 'k'
      }
    }
  }

  const pieChartOptions = {
    labelInterpolationFnc: function(value: number) {
      return value + '%'
    }
  }

  const responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: {
        right: 40
      }
    }]
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 NextChartist Examples</h1>
        <p>React Chartist component for Next.js with TypeScript support</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'line' ? 'active' : ''}
          onClick={() => setActiveTab('line')}
        >
          Line Chart
        </button>
        <button
          className={activeTab === 'bar' ? 'active' : ''}
          onClick={() => setActiveTab('bar')}
        >
          Bar Chart
        </button>
        <button
          className={activeTab === 'pie' ? 'active' : ''}
          onClick={() => setActiveTab('pie')}
        >
          Pie Chart
        </button>
        <button
          className={activeTab === 'hook' ? 'active' : ''}
          onClick={() => setActiveTab('hook')}
        >
          useChartist Hook
        </button>
      </nav>

      <main className="content">
        {activeTab === 'line' && (
          <div className="chart-section">
            <h2>Line Chart Example</h2>
            <p>Multi-series line chart with responsive options</p>
            <div className="chart-container">
              <NextChartist
                type="LineChart"
                data={lineChartData}
                options={lineChartOptions}
                responsiveOptions={responsiveOptions}
                className="ct-major-twelfth"
              />
            </div>
            <div className="code-block">
              <pre>{`<NextChartist
  type="LineChart"
  data={{
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      [5, 2, 4, 2, 0, 3, 5],
      [2, 3, 3, 1, 4, 5, 3]
    ]
  }}
  options={{
    fullWidth: true,
    chartPadding: { right: 40 },
    low: 0
  }}
/>`}</pre>
            </div>
          </div>
        )}

        {activeTab === 'bar' && (
          <div className="chart-section">
            <h2>Bar Chart Example</h2>
            <p>Stacked bar chart with custom axis formatting</p>
            <div className="chart-container">
              <NextChartist
                type="BarChart"
                data={barChartData}
                options={barChartOptions}
                className="ct-major-twelfth"
              />
            </div>
            <div className="code-block">
              <pre>{`<NextChartist
  type="BarChart"
  data={{
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }}
  options={{
    stackBars: true,
    axisY: {
      labelInterpolationFnc: (value) => (value / 1000) + 'k'
    }
  }}
/>`}</pre>
            </div>
          </div>
        )}

        {activeTab === 'pie' && (
          <div className="chart-section">
            <h2>Pie Chart Example</h2>
            <p>Pie chart with percentage labels</p>
            <div className="chart-container">
              <NextChartist
                type="PieChart"
                data={pieChartData}
                options={pieChartOptions}
                className="ct-major-twelfth"
              />
            </div>
            <div className="code-block">
              <pre>{`<NextChartist
  type="PieChart"
  data={{
    labels: ['Bananas', 'Apples', 'Grapes', 'Oranges'],
    series: [20, 15, 40, 25]
  }}
  options={{
    labelInterpolationFnc: (value) => value + '%'
  }}
/>`}</pre>
            </div>
          </div>
        )}

        {activeTab === 'hook' && (
          <HookExample />
        )}
      </main>
    </div>
  )
}

// Hook Example Component
const HookExample: React.FC = () => {
  const { ChartComponent, updateChart } = useChartist(
    'LineChart',
    {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      series: [[10, 15, 12, 17, 20]]
    },
    {
      fullWidth: true,
      low: 0
    }
  )

  const handleUpdate = () => {
    updateChart({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [[10, 15, 12, 17, 20, 25]]
    })
  }

  return (
    <div className="chart-section">
      <h2>useChartist Hook Example</h2>
      <p>Using the useChartist hook to manage chart state</p>
      <div className="chart-container">
        {ChartComponent}
      </div>
      <div className="button-group">
        <button onClick={handleUpdate} className="update-button">
          Update Chart Data
        </button>
      </div>
      <div className="code-block">
        <pre>{`const { ChartComponent, updateChart } = useChartist(
  'LineChart',
  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    series: [[10, 15, 12, 17, 20]]
  },
  {
    fullWidth: true,
    low: 0
  }
)

// Update chart
updateChart({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [[10, 15, 12, 17, 20, 25]]
})`}</pre>
      </div>
    </div>
  )
}

export default App

