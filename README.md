# ⚡React Blazing Fast SVG charts ⚡ (next-chartist)

A continuation of https://github.com/fraserxu/react-chartist. Feel free to push an update

> Made with create-react-library

[![NPM monthly downloads](https://img.shields.io/npm/dm/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)
[![NPM total downloads](https://img.shields.io/npm/dt/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)

## Install

```bash
npm install --save next-chartist
```

or in \_app or layout.tsx/jsx

```bash
<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" async />
```

## Usage

```
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
```

```jsx
import React, { Component } from 'react'

import NextChartist from 'next-chartist'

class Example extends Component {

    var type = "barChart"

    var dataChart = {
      labels: ["Speed"],
      series: [1000]
    }

    var options = {
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

  render() {
    return (
      <NextChartist
        className={'ct-octave'}
        data={dataChart}
        options={options}
        type={type}
      />
    )
  }
}
```

## License

MIT © [poboisvert](https://github.com/poboisvert)
