# ⚡ React Chartist for Next.js - Blazing Fast SVG Charts ⚡

**The best React Chartist component for Next.js** - Create beautiful, responsive charts with Chartist.js. Fully compatible with React, Next.js, and TypeScript.

> A modern continuation of [react-chartist](https://github.com/fraserxu/react-chartist) with Next.js support, TypeScript declarations, and enhanced features.

[![NPM Version](https://img.shields.io/npm/v/next-chartist?style=flat&color=blue)](https://www.npmjs.com/package/next-chartist)
[![NPM monthly downloads](https://img.shields.io/npm/dm/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)
[![NPM total downloads](https://img.shields.io/npm/dt/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)
[![Typescript](https://img.shields.io/badge/TypeScript-supported-blue?logo=typescript&style=flat)](https://typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat&logo=prettier)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/npm/l/next-chartist?style=flat)](https://github.com/poboisvert/next-chartist/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/poboisvert/next-chartist/test.yml?branch=main&style=flat)](https://github.com/poboisvert/next-chartist/actions)

> **React Chartist** | **Next.js Charts** | **React Chart Library** | **Chartist.js React Component**

The most popular React Chartist wrapper for Next.js. Perfect for building responsive charts in React and Next.js applications with full TypeScript support.

**🔍 Search terms:** `react chartist`, `chartist react`, `react chart`, `next chart`, `next.js chart`, `react charts`, `nextjs charts`, `chartist.js react`, `react-chartist`

**📦 NPM Package:** https://www.npmjs.com/package/next-chartist

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

## Why Choose next-chartist?

Looking for a **React Chartist** component? Need **Next.js charts**? This is the perfect solution:

- 🚀 **Best React Chartist Integration** - Seamlessly use Chartist.js in React and Next.js
- 📊 **Complete Chart Types** - Line charts, bar charts, and pie charts with full customization
- ⚡ **Next.js Optimized** - Built specifically for Next.js with SSR support
- 🔷 **TypeScript Ready** - Full TypeScript declarations included
- 📱 **Fully Responsive** - Mobile-first responsive chart configurations
- 🎨 **Highly Customizable** - All Chartist.js options and plugins supported
- 🎯 **Zero Configuration** - Works out of the box with minimal setup

## Features

- ✅ **React 16.8+ Compatible** - Uses hooks for modern React development
- ✅ **Next.js Compatible** - Server-side rendering support
- ✅ **Chartist 1.5 Support** - All chart types and features
- ✅ **TypeScript Ready** - Full type declarations and IntelliSense support
- ✅ **Responsive** - Built-in responsive options support
- ✅ **Event Handlers** - Full event listener support
- ✅ **Plugin Support** - Compatible with Chartist plugins
- ✅ **Performance Optimized** - Efficient updates and memory management

## Related Packages & Alternatives

If you're searching for:

- **react-chartist** - This is the modern Next.js-compatible version
- **chartist react** - You found it! This package provides React Chartist integration
- **react chart library** - A lightweight, performant chart library for React
- **next.js chart component** - Perfect for Next.js applications with SSR support
- **chartist.js react wrapper** - Complete React wrapper for Chartist.js

## Comparison

| Feature         | next-chartist | react-chartist | Other React Charts |
| --------------- | ------------- | -------------- | ------------------ |
| Next.js Support | ✅ Full SSR   | ❌ Limited     | ⚠️ Varies          |
| TypeScript      | ✅ Full Types | ❌ No Types    | ⚠️ Partial         |
| Chartist 1.5    | ✅ Latest     | ⚠️ Older       | N/A                |
| React Hooks     | ✅ Modern     | ⚠️ Class-based | ⚠️ Varies          |
| Maintenance     | ✅ Active     | ⚠️ Stale       | ⚠️ Varies          |

## Contributing

Contributions are welcome! This package aims to be the **best React Chartist solution** for Next.js developers.

## License

MIT © [poboisvert](https://github.com/poboisvert)

---

**Keywords for search:** react chartist, chartist react, react chart, next chart, next.js chart, react charts, nextjs charts, chartist.js react, react-chartist, react chart library, next.js chart component, chartist react component, react charting library, nextjs chart library, typescript charts react
