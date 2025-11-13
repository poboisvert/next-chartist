# ⚡React Blazing Fast SVG charts ⚡ (next-chartist)

A continuation of https://github.com/fraserxu/react-chartist. Feel free to push an update

> Made with create-react-library

[![NPM monthly downloads](https://img.shields.io/npm/dm/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)
[![NPM total downloads](https://img.shields.io/npm/dt/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)

NPM Package: https://www.npmjs.com/package/next-chartist

## Install

```bash
npm install --save next-chartist
```

or in \_app or layout.tsx/jsx

```bash
<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" async />
```

## Usage

First, make sure to include the Chartist CSS in your project:

```html
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
/>
```

### Basic Example

```jsx
import React from 'react'
import NextChartist from 'next-chartist'

const MyChart = () => {
  const dataChart = {
    labels: ['Speed'],
    series: [1000]
  }

  const options = {
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

  return (
    <NextChartist
      className='ct-octave'
      data={dataChart}
      options={options}
      type='BarChart'
    />
  )
}

export default MyChart
```

### Line Chart Example

```jsx
import React from 'react'
import NextChartist from 'next-chartist'

const LineChartExample = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [[5, 2, 4, 2, 0]]
  }

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  }

  return <NextChartist type='LineChart' data={data} options={options} />
}
```

### Pie Chart Example

```jsx
import React from 'react'
import NextChartist from 'next-chartist'

const PieChartExample = () => {
  const data = {
    labels: ['Bananas', 'Apples', 'Grapes', 'Berries'],
    series: [20, 10, 30, 40]
  }

  const options = {
    labelInterpolationFnc: function (value) {
      return value + '%'
    }
  }

  return <NextChartist type='PieChart' data={data} options={options} />
}
```

### With Event Listeners

```jsx
import React from 'react'
import NextChartist from 'next-chartist'

const ChartWithEvents = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [[5, 2, 4, 2, 0]]
  }

  const listener = {
    draw: function (data) {
      if (data.type === 'bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: 'easeOutQuart'
          }
        })
      }
    }
  }

  return <NextChartist type='BarChart' data={data} listener={listener} />
}
```

### With Responsive Options

```jsx
import React from 'react'
import NextChartist from 'next-chartist'

const ResponsiveChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [[5, 2, 4, 2, 0, 3, 2]]
  }

  const options = {
    fullWidth: true
  }

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

  return (
    <NextChartist
      type='LineChart'
      data={data}
      options={options}
      responsiveOptions={responsiveOptions}
    />
  )
}
```

## Examples

This package includes a comprehensive example application in the `example/` folder demonstrating all chart types and configurations.

### Running the Examples

To run the examples locally:

```bash
# Navigate to the example folder
cd example

# Install dependencies
npm install

# Start the development server
npm start
```

The example application includes:

- **Line Charts**: Basic, multi-series, with area, with points, responsive
- **Bar Charts**: Vertical, horizontal, multi-series, stacked, distributed
- **Pie Charts**: Basic, with labels, donut, gauge charts
- **Event Listeners**: Chart animations and interactions
- **Responsive Options**: Breakpoint-based chart configurations

All examples are organized in tabs for easy navigation and showcase the full capabilities of NextChartist with Chartist.js 1.5.

## Props

| Prop                | Type     | Required | Description                                              |
| ------------------- | -------- | -------- | -------------------------------------------------------- |
| `type`              | `string` | Yes      | Chart type: `'LineChart'`, `'BarChart'`, or `'PieChart'` |
| `data`              | `object` | Yes      | Chart data with `labels` and `series`                    |
| `options`           | `object` | No       | Chart options (supports all Chartist 1.5 options)        |
| `responsiveOptions` | `array`  | No       | Responsive breakpoint configurations                     |
| `className`         | `string` | No       | CSS class name for the chart container                   |
| `style`             | `object` | No       | Inline styles for the chart container                    |
| `listener`          | `object` | No       | Event listeners object (supports all Chartist events)    |
| `plugins`           | `array`  | No       | Chartist plugins array                                   |
| `children`          | `node`   | No       | React children                                           |

## Features

- ✅ **React 16.8+ Compatible** - Uses hooks for modern React development
- ✅ **Next.js Compatible** - Server-side rendering support
- ✅ **Chartist 1.5 Support** - All chart types and features
- ✅ **TypeScript Ready** - Full PropTypes validation
- ✅ **Responsive** - Built-in responsive options support
- ✅ **Event Handlers** - Full event listener support
- ✅ **Plugin Support** - Compatible with Chartist plugins
- ✅ **Performance Optimized** - Efficient updates and memory management

## License

MIT © [poboisvert](https://github.com/poboisvert)
